import { ArrowLeft, CalendarDays, Gift, MapPin, ReceiptText, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ReorderButton } from '@/components/account/reorder-button'
import { ItemOutcome } from '@/components/order/item-outcome'
import { OrderSummary } from '@/components/order/order-summary'
import { ProofSlot } from '@/components/order/proof-slot'
import { TrackingTimeline } from '@/components/order/tracking-timeline'
import { Alert } from '@/components/ui/alert'
import { StatusPill } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { accountOrder } from '@/lib/account/order'
import { isActive } from '@/lib/account/types'
import { param } from '@/lib/auth/redirect'
import { formatDate, formatDateTime } from '@/lib/format'
import { ORDER_STATUS } from '@/lib/order-status'
import { stageTimes, trackingPath } from '@/lib/orders/page-order'

export async function generateMetadata({
  params,
}: PageProps<'/account/orders/[orderRef]'>): Promise<Metadata> {
  return { title: `Order ${(await params).orderRef}` }
}

export default function AccountOrderPage(props: PageProps<'/account/orders/[orderRef]'>) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/account/orders"
        className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-crimson underline-offset-2 hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All orders
      </Link>
      <Suspense fallback={<Skeleton className="h-[40rem]" />}>
        <OrderDetail {...props} />
      </Suspense>
    </div>
  )
}

async function OrderDetail({ params, searchParams }: PageProps<'/account/orders/[orderRef]'>) {
  const [{ orderRef }, sp] = await Promise.all([params, searchParams])
  const { order } = await accountOrder(orderRef, `/account/orders/${orderRef}`)
  const info = ORDER_STATUS[order.status]
  const live = isActive(order.status)
  const paid = order.paymentStatus !== 'pending' && order.paymentStatus !== 'failed'

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-h1 text-ink">Order {order.orderNo}</h1>
          <StatusPill status={order.status} />
        </div>
        <ul className="flex flex-col gap-x-6 gap-y-1.5 text-ink-body sm:flex-row sm:flex-wrap">
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
            <span>
              For {order.recipientName}, {order.community},{' '}
              <span className="whitespace-nowrap">{order.parish}</span>
            </span>
          </li>
          <li className="flex gap-2">
            <CalendarDays className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
            {order.deliveredAt
              ? `Delivered ${formatDateTime(order.deliveredAt)}`
              : `Delivery day ${formatDate(`${order.deliveryDate}T17:00:00Z`)}`}
          </li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <ReorderButton orderNo={order.orderNo} />
          {live && (
            <ButtonLink href={trackingPath(order)} variant="outline">
              <Truck aria-hidden />
              Track live
            </ButtonLink>
          )}
          {paid && (
            <ButtonLink href={`/account/orders/${order.orderNo}/receipt`} variant="ghost">
              <ReceiptText aria-hidden />
              Receipt
            </ButtonLink>
          )}
        </div>
      </header>

      {param(sp.reorder) === 'empty' && (
        <Alert tone="warn" title="These items aren’t in the shop any more">
          Nothing was added to your basket. Have a look at what’s in the shop today.
        </Alert>
      )}
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

      <div className="grid gap-8 xl:grid-cols-[18rem_1fr] xl:gap-12">
        <section aria-labelledby="progress" className="flex flex-col gap-4">
          <h2 id="progress" className="text-h3 text-ink">
            Progress
          </h2>
          <TrackingTimeline status={order.status} times={stageTimes(order.events)} />
        </section>

        <div className="flex flex-col gap-8">
          <section aria-labelledby="proof" className="flex flex-col gap-4">
            <h2 id="proof" className="text-h3 text-ink">
              Proof photos
            </h2>
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
                <p className="mt-1">{order.giftMessage}</p>
              </div>
            </section>
          )}

          <OrderSummary
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
      </div>
    </div>
  )
}
