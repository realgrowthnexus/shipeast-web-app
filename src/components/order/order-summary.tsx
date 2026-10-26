import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'

/** Item lines and totals, shared by checkout, payment and confirmation pages. */
export function OrderSummary({
  lines,
  subtotalCents,
  discountCents,
  deliveryCents,
  totalCents,
  jmdPerUsd,
  parish,
  footer,
  className,
}: {
  lines: { key: string; name: string; quantity: number; totalCents: number }[]
  subtotalCents: number
  discountCents: number
  deliveryCents: number
  totalCents: number
  jmdPerUsd: number
  parish: string
  footer?: ReactNode
  className?: string
}) {
  const row = 'flex justify-between gap-4'
  return (
    <section
      aria-labelledby="order-summary"
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg',
        className,
      )}
    >
      <h2 id="order-summary" className="text-h3 text-ink">
        Order summary
      </h2>
      <ul className="flex flex-col gap-2 text-small text-ink">
        {lines.map((l) => (
          <li key={l.key} className={row}>
            <span>
              {l.name} <span className="text-ink-muted">× {l.quantity}</span>
            </span>
            <span className="tabular-nums">{formatUsd(l.totalCents)}</span>
          </li>
        ))}
      </ul>
      <dl className="flex flex-col gap-2 border-t border-line pt-4 text-ink">
        <div className={row}>
          <dt>Items</dt>
          <dd className="tabular-nums">{formatUsd(subtotalCents)}</dd>
        </div>
        {discountCents > 0 && (
          <div className={cn(row, 'text-ok')}>
            <dt>Promo discount</dt>
            <dd className="tabular-nums">-{formatUsd(discountCents)}</dd>
          </div>
        )}
        <div className={row}>
          <dt>Delivery to {parish}</dt>
          <dd className="tabular-nums">{formatUsd(deliveryCents)}</dd>
        </div>
        <div className={cn(row, 'items-baseline border-t border-line pt-3')}>
          <dt className="text-h3">Total</dt>
          <dd className="text-right leading-tight">
            <span className="block text-h2 tabular-nums">{formatUsd(totalCents)}</span>
            <span className="block text-small text-ink-muted tabular-nums">
              about {formatJmd(usdCentsToJmd(totalCents, jmdPerUsd))}
            </span>
          </dd>
        </div>
      </dl>
      {footer}
    </section>
  )
}
