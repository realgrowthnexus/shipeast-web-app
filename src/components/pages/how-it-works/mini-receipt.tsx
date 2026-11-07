import { cn } from '@/lib/cn'
import { formatJmd } from '@/lib/format'
import type { Receipt } from '@/lib/home'

/**
 * A small flat copy of the home hero's drawn till receipt, for a receipt that sits inside a
 * card: a line border instead of a shadow, no tilt and no print animation.
 */
export function MiniReceipt({
  receipt,
  lines = 3,
  className,
}: {
  receipt: Receipt
  lines?: number
  className?: string
}) {
  const total = formatJmd(receipt.totalJmd)
  const shown = receipt.lines.slice(0, lines)
  const more = receipt.lines.length - shown.length + receipt.more
  return (
    <div
      role="img"
      aria-label={`Example receipt for the ${receipt.basketName}, total ${total}`}
      className={cn(
        'border border-line bg-surface px-4 pt-4 pb-6 text-ink receipt-edge',
        className,
      )}
    >
      <div aria-hidden>
        <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">
          Example receipt
        </span>
        <ul className="mt-3 border-t border-dashed border-line-strong pt-2 text-small tabular-nums">
          {shown.map((line) => (
            <li key={line.name} className="flex justify-between gap-3">
              <span className="truncate">
                {line.qty > 1 && `${line.qty} x `}
                {line.name}
              </span>
              <span className="shrink-0">{formatJmd(line.jmd)}</span>
            </li>
          ))}
          {more > 0 && (
            <li className="text-ink-muted">
              and {more} more {more === 1 ? 'item' : 'items'}
            </li>
          )}
        </ul>
        <p className="mt-2 flex justify-between gap-3 border-t border-dashed border-line-strong pt-2 text-small font-bold tabular-nums">
          <span>Total</span>
          <span>{total}</span>
        </p>
      </div>
    </div>
  )
}
