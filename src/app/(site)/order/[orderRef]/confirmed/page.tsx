import { CircleCheck, Hourglass, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { OrderSummary } from '@/components/order/order-summary'
import { Container } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import { formatDate } from '@/lib/format'
import { orderForPage, trackingPath } from '@/lib/orders/page-order'
import { bankPath, failedPath } from '@/lib/orders/payments'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
}

export default function ConfirmedPage(props: PageProps<'/order/[orderRef]/confirmed'>) {
  return (
    <Container className="max-w-4xl section-sm">
      <Suspense fallback={<Skeleton className="h-[34rem]" />}>
        <Confirmed {...props} />
      </Suspense>
    </Container>
  )
}

async function Confirmed({ params, searchParams }: PageProps<'/order/[orderRef]/confirmed'>) {
  const [{ orderRef }, { t }] = await Promise.all([params, searchParams])
  const order = await orderForPage(orderRef, t)
  if (order.status === 'payment_failed') redirect(failedPath(order))
  if (order.status === 'awaiting_payment' && order.paymentMethod === 'bank_transfer') {
    redirect(bankPath(order))
  }
  const processing = order.status === 'awaiting_payment'
  const trackUrl = `${site.url}${trackingPath(order)}`
  const shareText = `Your groceries from ShipEast are on the way. Follow the order here: ${trackUrl}`
  const day = formatDate(`${order.deliveryDate}T17:00:00Z`)

  const steps = [
    ['We check your order', 'and line up a driver in ' + order.parish + '.'],
    ['The driver shops', 'and sends a photo of the store receipt.'],
    [
      'Delivered on ' + day,
      `to ${order.recipientName}, with a photo at the door. They get a text before the driver arrives.`,
    ],
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-ok-tint text-ok">
          {processing ? (
            <Hourglass className="size-7" aria-hidden />
          ) : (
            <CircleCheck className="size-7" aria-hidden />
          )}
        </span>
        <h1 className="text-h1 text-balance text-ink">
          {processing ? 'Your payment is being processed' : 'Thank you, your order is in'}
        </h1>
        <p className="text-lead text-ink-body">
          Order <strong className="text-ink">{order.orderNo}</strong>
          {processing
            ? '. PayPal is still confirming the payment. We start as soon as it clears, usually within minutes.'
            : ` is paid. We’ll take it from here.`}
        </p>
      </div>

      {order.preview && (
        <Alert tone="info" title="Preview only">
          This is a sample order on the preview site. Nothing was charged and nothing will be
          delivered.
        </Alert>
      )}

      <section aria-labelledby="next" className="rounded-xl bg-crimson p-card text-white sm:p-8">
        <h2 id="next" className="text-h3">
          What happens next
        </h2>
        <ol className="mt-5 grid gap-5 sm:grid-cols-3">
          {steps.map(([title, body], i) => (
            <li key={title} className="flex flex-col gap-1">
              <span className="text-h2 font-black text-blush">{i + 1}</span>
              <span className="font-bold">{title}</span>
              <span className="text-on-crimson-muted">{body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="share"
        className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg"
      >
        <h2 id="share" className="flex items-center gap-2 text-h3 text-ink">
          <Share2 className="size-5 text-crimson" aria-hidden />
          Share the tracking link
        </h2>
        <p className="text-ink">
          Anyone with this link can follow the order and see the photos. No account needed.
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-md border-[1.5px] border-line-strong bg-surface p-2 pl-4">
          <span className="min-w-0 flex-1 truncate text-small text-ink-muted">{trackUrl}</span>
          <CopyButton value={trackUrl} label="tracking link" />
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={trackingPath(order)}>Track this order</ButtonLink>
          <ButtonLink
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            variant="outline"
          >
            Send on WhatsApp
          </ButtonLink>
        </div>
      </section>

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
  )
}
