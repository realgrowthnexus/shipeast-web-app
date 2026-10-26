import { CircleAlert } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Container } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { getSettings } from '@/lib/data/site'
import { formatUsd } from '@/lib/format'
import { orderForPage } from '@/lib/orders/page-order'
import { availablePaymentMethods } from '@/lib/orders/payment-methods'
import { confirmedPath, payPath } from '@/lib/orders/payments'
import { changePaymentMethodAction } from '../../../checkout/pay/[orderRef]/actions'

export const metadata: Metadata = {
  title: 'Payment didn’t go through',
  robots: { index: false },
}

/** PayPal issue codes, in plain words. Anything else gets the general message. */
const REASONS: Record<string, string> = {
  INSTRUMENT_DECLINED: 'Your card or PayPal account declined the payment.',
  PAYER_ACTION_REQUIRED: 'Your bank asked for an extra check that wasn’t finished.',
  TRANSACTION_REFUSED: 'The payment was refused by your bank or PayPal.',
  PAYER_CANNOT_PAY: 'PayPal couldn’t take payment from this account.',
}

export default function PaymentFailedPage(props: PageProps<'/order/[orderRef]/payment-failed'>) {
  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Failed {...props} />
      </Suspense>
    </Container>
  )
}

async function Failed({ params, searchParams }: PageProps<'/order/[orderRef]/payment-failed'>) {
  const [{ orderRef }, query] = await Promise.all([params, searchParams])
  const [order, settings] = await Promise.all([orderForPage(orderRef, query.t), getSettings()])
  if (order.status !== 'payment_failed' && order.status !== 'awaiting_payment') {
    redirect(confirmedPath(order))
  }
  const reason = typeof query.reason === 'string' ? REASONS[query.reason] : undefined
  const methods = availablePaymentMethods(settings).filter((m) => m !== order.paymentMethod)
  const label = {
    paypal: 'Pay with PayPal',
    card: 'Pay by card',
    bank_transfer: 'Pay by bank transfer',
  }

  return (
    <div className="flex flex-col gap-6">
      <span className="grid size-14 place-items-center rounded-full bg-danger-tint text-danger">
        <CircleAlert className="size-7" aria-hidden />
      </span>
      <h1 className="text-4xl font-black tracking-tight text-balance text-ink">
        Your payment didn’t go through
      </h1>
      <p className="text-lg text-ink">
        {reason ?? 'The payment wasn’t completed.'} Nothing was charged. Order{' '}
        <strong>{order.orderNo}</strong> is saved, so you can try again without filling anything in.
      </p>

      <div className="flex flex-col gap-3 rounded-lg border border-line bg-blush-100 p-5">
        <ButtonLink href={payPath(order)} size="lg" block>
          Try again, {formatUsd(order.totalCents)}
        </ButtonLink>
        {methods.length > 0 && (
          <form action={changePaymentMethodAction} className="flex flex-col gap-2">
            <input type="hidden" name="token" value={order.token} />
            {methods.map((m) => (
              <button
                key={m}
                type="submit"
                name="method"
                value={m}
                className="min-h-12 rounded-md border-2 border-crimson font-semibold text-crimson hover:bg-blush-200"
              >
                {label[m]} instead
              </button>
            ))}
          </form>
        )}
      </div>
      <p className="text-sm text-ink-muted">
        Still stuck?{' '}
        <Link href="/contact" className="font-semibold text-crimson underline underline-offset-2">
          Message us
        </Link>{' '}
        with your order number and we’ll help.
      </p>
    </div>
  )
}
