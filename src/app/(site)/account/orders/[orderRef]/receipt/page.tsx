import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Wordmark } from '@/components/site/wordmark'
import { Skeleton } from '@/components/ui/card'
import { PrintButton } from '@/components/ui/print-button'
import { accountOrder } from '@/lib/account/order'
import { formatDate, formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { site } from '@/lib/site'
import type { PaymentMethod } from '@/lib/types'

export async function generateMetadata({
  params,
}: PageProps<'/account/orders/[orderRef]/receipt'>): Promise<Metadata> {
  return { title: `Receipt for ${(await params).orderRef}` }
}

const PAID_WITH: Record<PaymentMethod, string> = {
  paypal: 'PayPal',
  card: 'Debit or credit card (through PayPal)',
  bank_transfer: 'Bank transfer',
}

export default function ReceiptPage(props: PageProps<'/account/orders/[orderRef]/receipt'>) {
  return (
    <Suspense fallback={<Skeleton className="h-[40rem]" />}>
      <Receipt {...props} />
    </Suspense>
  )
}

async function Receipt({ params }: PageProps<'/account/orders/[orderRef]/receipt'>) {
  const { orderRef } = await params
  const { account, order } = await accountOrder(orderRef, `/account/orders/${orderRef}/receipt`)
  // Only paid orders have a receipt; before that it would be a bill, not proof of payment.
  if (order.paymentStatus === 'pending' || order.paymentStatus === 'failed') notFound()

  const refunds = order.items.reduce((n, i) => n + i.refundCents, 0)
  const row = 'flex justify-between gap-4'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href={`/account/orders/${order.orderNo}`}
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-crimson underline-offset-2 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to order
        </Link>
        <PrintButton />
      </div>

      <article className="flex flex-col gap-8 rounded-lg border border-line bg-surface p-card-lg sm:p-10 print:border-0 print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6">
          <div className="flex flex-col gap-2">
            <Wordmark />
            <p className="text-small text-ink-muted">
              {site.company}
              <br />
              {site.email} · shipeastja.com
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-h2 text-ink">Receipt</h1>
            <p className="text-ink-body">Order {order.orderNo}</p>
            {order.paidAt && <p className="text-ink-body">Paid {formatDate(order.paidAt)}</p>}
          </div>
        </header>

        {order.preview && (
          <p className="rounded-md bg-surface-tint p-3 text-small text-ink">
            Sample receipt on the preview site. No payment was taken.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-1 eyebrow text-crimson">Paid by</h2>
            <p className="text-ink">
              {account.fullName}
              <br />
              {order.senderEmail}
              <br />
              <span className="text-ink-muted">{account.publicId}</span>
            </p>
          </div>
          <div>
            <h2 className="mb-1 eyebrow text-crimson">Delivered to</h2>
            <p className="text-ink">
              {order.recipientName}
              <br />
              {order.community}, {order.parish}
              <br />
              <span className="text-ink-muted">
                {order.deliveredAt
                  ? formatDate(order.deliveredAt)
                  : `Due ${formatDate(`${order.deliveryDate}T17:00:00Z`)}`}
              </span>
            </p>
          </div>
        </div>

        <table className="w-full text-left">
          <caption className="sr-only">Items</caption>
          <thead>
            <tr className="border-b border-line text-small text-ink-muted">
              <th scope="col" className="py-2 font-semibold">
                Item
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Qty
              </th>
              <th scope="col" className="hidden py-2 text-right font-semibold sm:table-cell">
                Each
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink">
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="py-2.5 pr-2">
                  {item.name}
                  <span className="block text-small text-ink-muted">{item.size}</span>
                </td>
                <td className="py-2.5 text-right tabular-nums">{item.quantity}</td>
                <td className="hidden py-2.5 text-right tabular-nums sm:table-cell">
                  {formatUsd(item.unitPriceCents)}
                </td>
                <td className="py-2.5 text-right tabular-nums">
                  {formatUsd(item.unitPriceCents * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="ml-auto flex w-full max-w-sm flex-col gap-2 text-ink">
          <div className={row}>
            <dt>Items</dt>
            <dd className="tabular-nums">{formatUsd(order.subtotalCents)}</dd>
          </div>
          {order.discountCents > 0 && (
            <div className={row}>
              <dt>Discount</dt>
              <dd className="tabular-nums">−{formatUsd(order.discountCents)}</dd>
            </div>
          )}
          <div className={row}>
            <dt>Delivery to {order.parish}</dt>
            <dd className="tabular-nums">{formatUsd(order.deliveryFeeCents)}</dd>
          </div>
          <div className={`${row} border-t border-line pt-2 text-lead font-bold`}>
            <dt>Total paid</dt>
            <dd className="tabular-nums">{formatUsd(order.totalCents)}</dd>
          </div>
          <div className={`${row} text-small text-ink-muted`}>
            <dt>About</dt>
            <dd className="tabular-nums">
              {formatJmd(usdCentsToJmd(order.totalCents, order.jmdPerUsd))}
            </dd>
          </div>
          {refunds > 0 && (
            <div className={`${row} text-small`}>
              <dt>Refunded for items not in stock</dt>
              <dd className="tabular-nums">−{formatUsd(refunds)}</dd>
            </div>
          )}
        </dl>

        <footer className="flex flex-col gap-1 border-t border-line pt-6 text-small text-ink-muted">
          <p>Paid with {PAID_WITH[order.paymentMethod]}. Amounts are in US dollars.</p>
          <p>
            The Jamaican dollar figure uses the rate shown at checkout, {formatJmd(order.jmdPerUsd)}{' '}
            to USD$1, and is a guide only.
          </p>
        </footer>
      </article>
    </div>
  )
}
