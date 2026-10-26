import { Clock, Landmark } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { OrderSummary } from '@/components/order/order-summary'
import { Container } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import { getSettings } from '@/lib/data/site'
import { formatDateTime, formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { orderForPage, trackingPath } from '@/lib/orders/page-order'
import { bankTransferConfigured } from '@/lib/orders/payment-methods'

export const metadata: Metadata = {
  title: 'Pay by bank transfer',
  robots: { index: false },
}

export default function BankTransferPage(props: PageProps<'/checkout/bank-transfer/[orderRef]'>) {
  return (
    <Container className="max-w-4xl section-sm">
      <Suspense fallback={<Skeleton className="h-[36rem]" />}>
        <BankTransfer {...props} />
      </Suspense>
    </Container>
  )
}

async function BankTransfer({
  params,
  searchParams,
}: PageProps<'/checkout/bank-transfer/[orderRef]'>) {
  const [{ orderRef }, { t }] = await Promise.all([params, searchParams])
  const [order, settings] = await Promise.all([orderForPage(orderRef, t), getSettings()])
  const bank = settings.bankTransfer
  const ready = bankTransferConfigured(settings)
  const deadline = new Date(
    new Date(order.createdAt).getTime() + settings.bankTransferHoursToPay * 60 * 60 * 1000,
  )
  const paid = order.status !== 'awaiting_payment'

  const rows: [string, string, boolean][] = [
    ['Amount', formatUsd(order.totalCents), true],
    ['Reference', order.orderNo, true],
    ['Bank', bank.bankName, false],
    ['Account name', bank.accountName, false],
    ['Account number', bank.accountNumber, true],
    ['Branch', bank.branch, false],
    ['Account type', bank.accountType, false],
    ['Currency', bank.currency, false],
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-crimson">Order {order.orderNo} is saved</p>
        <h1 className="text-h1 text-balance text-ink">
          {paid ? 'Your transfer has arrived' : 'Now send the bank transfer'}
        </h1>
        <p className="max-w-2xl text-lead text-ink-body">
          {paid
            ? 'Thank you. We’re getting your order ready.'
            : 'We start shopping as soon as the money lands in our account. Use your order number as the reference so we can match it.'}
        </p>
      </div>

      {order.preview && (
        <Alert tone="info" title="Preview only">
          This is a sample order on the preview site. Don’t send any money.
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section
          aria-labelledby="bank-details"
          className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-card-lg"
        >
          <h2 id="bank-details" className="flex items-center gap-2 text-h3 text-ink">
            <Landmark className="size-5 text-crimson" aria-hidden />
            Transfer details
          </h2>
          {ready ? (
            <dl className="divide-y divide-line">
              {rows
                .filter(([, value]) => value)
                .map(([label, value, copy]) => (
                  <div
                    key={label}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3"
                  >
                    <dt className="text-small text-ink-muted">{label}</dt>
                    <dd className="flex items-center gap-2 font-bold text-ink tabular-nums">
                      {value}
                      {copy && <CopyButton value={value} label={label} />}
                    </dd>
                  </div>
                ))}
            </dl>
          ) : (
            <Alert tone="warn" title="Bank details aren’t set up yet">
              ShipEast will add its account here before launch. Until then, nothing needs to be
              sent.
            </Alert>
          )}
          {bank.notes && <p className="text-small text-ink">{bank.notes}</p>}
          <p className="text-small text-ink-muted">
            That is about {formatJmd(usdCentsToJmd(order.totalCents, order.jmdPerUsd))}. Send the
            exact US dollar amount; bank fees on your side are yours to cover.
          </p>
        </section>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 rounded-xl bg-crimson p-card text-white">
            <Clock className="mt-0.5 size-5 shrink-0 text-blush" aria-hidden />
            <p>
              Please pay by <strong>{formatDateTime(deadline)}</strong>, Jamaica time. After that
              the order is cancelled and nothing is owed.
            </p>
          </div>
          <p className="text-small text-ink-muted">
            Keep your order number, {order.orderNo}. The tracking page shows when your transfer has
            arrived.
          </p>
          <ButtonLink href={trackingPath(order)} variant="outline" block>
            Track this order
          </ButtonLink>
        </div>
      </div>

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
