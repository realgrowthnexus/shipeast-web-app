import { LockKeyhole } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { OrderSummary } from '@/components/order/order-summary'
import { Container } from '@/components/site/page-intro'
import { Skeleton } from '@/components/ui/card'
import { listAddresses } from '@/lib/account/store'
import { getAccount } from '@/lib/auth/session'
import { readBasket } from '@/lib/basket/cookie'
import { priceBasket } from '@/lib/basket/pricing'
import { getCatalogue } from '@/lib/data/catalogue'
import { getSettings } from '@/lib/data/site'
import { formatUsd } from '@/lib/format'
import { deliveryOptions } from '@/lib/orders/delivery'
import { availablePaymentMethods } from '@/lib/orders/payment-methods'
import { CheckoutForm } from './checkout-form'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false },
}

export default function CheckoutPage() {
  return (
    <Container className="section-sm">
      <h1 className="mb-8 text-h1 text-ink">Checkout</h1>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutView />
      </Suspense>
    </Container>
  )
}

async function CheckoutView() {
  // Pricing and delivery days read the clock, so this part always renders per request.
  await connection()
  const [basket, catalogue, settings, account] = await Promise.all([
    readBasket(),
    getCatalogue(),
    getSettings(),
    getAccount(),
  ])
  const priced = priceBasket(basket, catalogue)
  if (!priced.canCheckout || !priced.zone) redirect('/basket')
  const saved = account ? await listAddresses(account) : []
  const parish = priced.zone.parish

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-12">
      <CheckoutForm
        parish={priced.zone.parish}
        deliveryDays={deliveryOptions(priced.zone, new Date())}
        paymentMethods={availablePaymentMethods(settings)}
        totalLabel={formatUsd(priced.totalCents)}
        sender={
          account && { fullName: account.fullName, email: account.email, phone: account.phone }
        }
        addresses={saved.filter((a) => a.parish === parish)}
        otherParishAddresses={saved.filter((a) => a.parish !== parish).length}
      />
      <div className="flex flex-col gap-4 self-start lg:sticky lg:top-24">
        <OrderSummary
          lines={priced.lines.map((l) => ({
            key: `${l.kind}-${l.id}`,
            name: l.name,
            quantity: l.quantity,
            totalCents: l.totalCents,
          }))}
          subtotalCents={priced.subtotalCents}
          discountCents={priced.discountCents}
          deliveryCents={priced.deliveryCents ?? 0}
          totalCents={priced.totalCents}
          jmdPerUsd={settings.jmdPerUsd}
          parish={priced.zone.parish}
          footer={
            <Link
              href="/basket"
              className="text-small font-semibold text-crimson underline-offset-2 hover:underline"
            >
              Change your basket
            </Link>
          }
        />
        <p className="flex gap-2 text-small text-ink-muted">
          <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden />
          Payments are handled by PayPal or your bank. We never see or store your card details.
        </p>
      </div>
    </div>
  )
}

function CheckoutSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]" aria-hidden>
      <Skeleton className="h-[40rem]" />
      <Skeleton className="h-80" />
    </div>
  )
}
