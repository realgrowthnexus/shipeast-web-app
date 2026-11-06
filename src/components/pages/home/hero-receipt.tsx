import { Camera } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatJmd } from '@/lib/format'
import type { Receipt } from '@/lib/home'

/**
 * The page's one bold element: a drawn till receipt for a real basket, priced in J$ at the live
 * rate. It prints once on load (the inner paper animates; the tilt sits on the figure so it
 * does not animate). Always labelled as an example: no store, no date, no time on it.
 */
export function HeroReceipt({ receipt, className }: { receipt: Receipt; className?: string }) {
  const total = formatJmd(receipt.totalJmd)
  return (
    <figure className={cn('-rotate-3', className)}>
      <div
        role="img"
        aria-label={`Example receipt for the ${receipt.basketName}, total ${total}`}
        className="animate-print"
      >
        <div className="rounded-t-sm bg-surface px-4 pt-4 pb-7 text-ink shadow-float receipt-edge">
          <div aria-hidden>
            <div className="text-center">
              <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">
                Example receipt
              </span>
              <p className="mt-2 text-small font-bold">{receipt.basketName}</p>
              <p className="text-xs text-ink-muted">Kingston, Jamaica</p>
            </div>
            <ul className="mt-3 border-t border-dashed border-line-strong pt-2 text-small tabular-nums">
              {receipt.lines.map((line) => (
                <li key={line.name} className="flex justify-between gap-3">
                  <span className="truncate">
                    {line.qty > 1 && `${line.qty} x `}
                    {line.name}
                  </span>
                  <span className="shrink-0">{formatJmd(line.jmd)}</span>
                </li>
              ))}
              {receipt.more > 0 && (
                <li className="text-ink-muted">
                  and {receipt.more} more {receipt.more === 1 ? 'item' : 'items'}
                </li>
              )}
            </ul>
            <p className="mt-2 flex justify-between gap-3 border-t border-dashed border-line-strong pt-2 text-small font-bold tabular-nums">
              <span>Total</span>
              <span>{total}</span>
            </p>
          </div>
        </div>
      </div>
      <figcaption className="relative left-1/2 mt-3 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-crimson-deep px-3 py-1.5 text-small text-on-crimson-muted">
        <Camera className="size-icon shrink-0 text-blush" aria-hidden />
        You get a photo of the real one
      </figcaption>
    </figure>
  )
}
