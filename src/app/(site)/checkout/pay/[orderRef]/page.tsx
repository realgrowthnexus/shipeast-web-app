import { CreditCard, LockKeyhole, Wallet } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { OrderSummary } from '@/components/order/order-summary'
import { Container } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { getSettings } from '@/lib/data/site'
import { isDemoMode } from '@/lib/env'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { orderForPage } from '@/lib/orders/page-order'
import { availablePaymentMethods } from '@/lib/orders/payment-methods'
import { bankPath, confirmedPath } from '@/lib/orders/payments'
import { changePaymentMethodAction, simulatePaymentAction } from './actions'
import { PayPalButtons } from './paypal-buttons'

export const metadata: Metadata = {
  title: 'Pay for your order',
  robots: { index: false },
}

export default function PayPage(props: PageProps<'/checkout/pay/[orderRef]'>) {
  return (
    <Container className="max-w-4xl section-sm">
      <Suspense fallback={<Skeleton className="h-[30rem]" />}>
        <Pay {...props} />
      </Suspense>
    </Container>
  )
}

async function Pay({ params, searchParams }: PageProps<'/checkout/pay/[orderRef]'>) {
  const [{ orderRef }, { t }] = await Promise.all([params, searchParams])
  const [order, settings] = await Promise.all([orderForPage(orderRef, t), getSettings()])
  if (order.status !== 'awaiting_payment' && order.status !== 'payment_failed') {
    redirect(confirmedPath(order))
  }
  if (order.paymentMethod === 'bank_transfer') redirect(bankPath(order))

  const method = order.paymentMethod === 'card' ? 'card' : 'paypal'
  const other = method === 'card' ? 'paypal' : 'card'
  const methods = availablePaymentMethods(settings)
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-crimson">Order {order.orderNo} is saved</p>
          <h1 className="text-h1 text-balance text-ink">Pay {formatUsd(order.totalCents)}</h1>
          <p className="text-lead text-ink-body">
            About {formatJmd(usdCentsToJmd(order.totalCents, order.jmdPerUsd))}. We start shopping
            as soon as payment is confirmed.
          </p>
        </div>

        {order.status === 'payment_failed' && (
          <Alert tone="warn" title="Your last payment didn’t go through">
            Nothing was charged. Try again below, or choose another way to pay.
          </Alert>
        )}

        <section
          aria-labelledby="pay-with"
          className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg"
        >
          <h2 id="pay-with" className="flex items-center gap-2 text-h3 text-ink">
            {method === 'card' ? (
              <CreditCard className="size-5 text-crimson" aria-hidden />
            ) : (
              <Wallet className="size-5 text-crimson" aria-hidden />
            )}
            {method === 'card' ? 'Pay by debit or credit card' : 'Pay with PayPal'}
          </h2>

          {isDemoMode() ? (
            <div className="flex flex-col gap-3">
              <Alert tone="info" title="Preview only">
                The live site shows PayPal’s secure {method === 'card' ? 'card form' : 'button'}{' '}
                here. On the preview you can try both outcomes.
              </Alert>
              <form action={simulatePaymentAction} className="flex flex-wrap gap-3">
                <input type="hidden" name="token" value={order.token} />
                <Button type="submit" name="outcome" value="paid" size="lg">
                  Simulate a successful payment
                </Button>
                <Button type="submit" name="outcome" value="failed" size="lg" variant="outline">
                  Simulate a declined card
                </Button>
              </form>
            </div>
          ) : clientId ? (
            <PayPalButtons clientId={clientId} token={order.token} method={method} />
          ) : (
            <Alert tone="warn" title="Card and PayPal payments aren’t switched on yet">
              Please pay by bank transfer instead.
            </Alert>
          )}

          <p className="flex gap-2 text-small text-ink-muted">
            <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden />
            PayPal processes the payment. We never see or store your card details.
          </p>
        </section>

        <form
          action={changePaymentMethodAction}
          className="flex flex-col items-start gap-x-5 text-small sm:flex-row sm:flex-wrap sm:items-center"
        >
          <input type="hidden" name="token" value={order.token} />
          <span className="mb-1 text-ink-muted sm:mb-0">Prefer another way?</span>
          {methods.includes(other) && (
            <button
              type="submit"
              name="method"
              value={other}
              className="min-h-11 font-semibold text-crimson underline underline-offset-2"
            >
              {other === 'card' ? 'Pay by card instead' : 'Pay with PayPal instead'}
            </button>
          )}
          {methods.includes('bank_transfer') && (
            <button
              type="submit"
              name="method"
              value="bank_transfer"
              className="min-h-11 font-semibold text-crimson underline underline-offset-2"
            >
              Pay by bank transfer instead
            </button>
          )}
        </form>
      </div>

      <OrderSummary
        className="self-start"
        lines={order.items.map((i, n) => ({
          key: String(n),
          name: i.name,
          quantity: i.quantity,
          totalCents: i.unitPriceCents * i.quantity,
        }))}
        subtotalCents={order.subtotalCents}
        discountCents={order.discountCents}
        deliveryCents={order.deliveryFeeCents}
        totalCents={order.totalCents}
        jmdPerUsd={order.jmdPerUsd}
        parish={order.parish}
      />
    </div>
  )
}
