import { ArrowRight, CalendarDays, Gift, MapPin, Repeat, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProofSlot } from '@/components/order/proof-slot'
import { ItemOutcome } from '@/components/order/item-outcome'
import { TrackingTimeline } from '@/components/order/tracking-timeline'
import { Container } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { StatusPill } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/card'
import { formatDate, formatDateTime, formatUsd } from '@/lib/format'
import { ORDER_STATUS } from '@/lib/order-status'
import { stageTimes } from '@/lib/orders/page-order'
import { getSenderOrder } from '@/lib/orders/store'
import type { SenderOrder } from '@/lib/orders/types'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import { AutoRefresh } from './auto-refresh'

export const metadata: Metadata = {
  title: 'Order tracking',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

const FINAL: SenderOrder['status'][] = ['delivered', 'closed', 'cancelled', 'refunded']

export default function TrackOrderPage({ params }: PageProps<'/track/[token]'>) {
  return (
    <Container className="section-sm">
      <Suspense fallback={<Skeleton className="h-[40rem]" />}>
        <Tracking params={params} />
      </Suspense>
    </Container>
  )
}

async function Tracking({ params }: { params: PageProps<'/track/[token]'>['params'] }) {
  const { token } = await params
  const order = await getSenderOrder(token)
  if (!order) notFound()

  const info = ORDER_STATUS[order.status]
  const rule = SUBSTITUTION_RULES.find((r) => r.value === order.substitutionRule)
  const refunds = order.items.reduce((n, i) => n + i.refundCents, 0)
  const outcomeShown = order.items.some((i) => i.outcome !== 'pending')

  return (
    <div className="flex flex-col gap-8">
      {!FINAL.includes(order.status) && <AutoRefresh />}

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-h1 text-ink">Order {order.orderNo}</h1>
          <StatusPill status={order.status} />
        </div>
        <ul className="flex flex-col gap-x-6 gap-y-1.5 text-lead text-ink-body sm:flex-row sm:flex-wrap">
          <li className="flex gap-2">
            <MapPin className="mt-1 size-5 shrink-0 text-crimson" aria-hidden />
            <span>
              For {order.recipientName}, {order.community},{' '}
              <span className="whitespace-nowrap">{order.parish}</span>
            </span>
          </li>
          <li className="flex gap-2">
            <CalendarDays className="mt-1 size-5 shrink-0 text-crimson" aria-hidden />
            {order.deliveredAt
              ? `Delivered ${formatDateTime(order.deliveredAt)}`
              : `Delivery day ${formatDate(`${order.deliveryDate}T17:00:00Z`)}`}
          </li>
        </ul>
      </header>

      {order.preview && (
        <Alert tone="info" title="Preview only">
          This is a sample order on the preview site, with made-up details.
        </Alert>
      )}
      {info.stage === null && (
        <Alert tone={info.tone === 'danger' ? 'danger' : 'warn'} title={info.label}>
          {info.senderText}
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
        <section aria-labelledby="progress" className="flex flex-col gap-4">
          <h2 id="progress" className="text-h3 text-ink">
            Progress
          </h2>
          <TrackingTimeline status={order.status} times={stageTimes(order.events)} />
          {order.driverFirstName && !FINAL.includes(order.status) && (
            <p className="flex items-center gap-2 rounded-md bg-surface p-3 text-small text-ink">
              <Truck className="size-4 text-crimson" aria-hidden />
              Your driver is {order.driverFirstName}.
            </p>
          )}
        </section>

        <div className="flex flex-col gap-8">
          <section aria-labelledby="proof" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="proof" className="text-h3 text-ink">
                Proof photos
              </h2>
              {(order.photos.receipt || order.photos.door) && (
                <Link
                  href={`/track/${order.token}/photos`}
                  className="flex items-center gap-1 text-small font-semibold text-crimson"
                >
                  Full size <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
            </div>
            <div className="grid max-w-xl grid-cols-2 gap-3 sm:gap-5">
              <ProofSlot
                kind="receipt"
                photo={order.photos.receipt}
                alt={`Store receipt for order ${order.orderNo}`}
              />
              <ProofSlot
                kind="door"
                photo={order.photos.door}
                alt={`Delivery to ${order.recipientName}`}
              />
            </div>
            {order.receiverName && (
              <p className="text-small text-ink">
                Received by <strong>{order.receiverName}</strong>
                {order.deliveredAt && ` at ${formatDateTime(order.deliveredAt)}`}.
              </p>
            )}
          </section>

          <section aria-labelledby="items" className="flex flex-col gap-3">
            <h2 id="items" className="text-h3 text-ink">
              Items
            </h2>
            <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {order.items.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 p-3"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="font-semibold text-ink">
                      {item.name}{' '}
                      <span className="font-normal text-ink-muted">× {item.quantity}</span>
                    </span>
                    <span className="text-small text-ink-muted">{item.size}</span>
                    {item.substituteNote && (
                      <span className="text-small text-ink">Swapped: {item.substituteNote}</span>
                    )}
                  </div>
                  <ItemOutcome item={item} />
                </li>
              ))}
            </ul>
            {refunds > 0 && (
              <p className="text-small text-ink">
                {formatUsd(refunds)} is being refunded for items the store didn’t have.
              </p>
            )}
            {!outcomeShown && rule && (
              <p className="flex gap-2 text-small text-ink-muted">
                <Repeat className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
                If something is out of stock: {rule.title.toLowerCase()}. {rule.body}
              </p>
            )}
          </section>

          {order.giftMessage && (
            <section
              aria-labelledby="gift"
              className="flex gap-3 rounded-xl bg-crimson p-card text-white"
            >
              <Gift className="mt-0.5 size-5 shrink-0 text-blush" aria-hidden />
              <div>
                <h2 id="gift" className="font-bold">
                  Gift message
                </h2>
                <p className="mt-1 text-white">{order.giftMessage}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
