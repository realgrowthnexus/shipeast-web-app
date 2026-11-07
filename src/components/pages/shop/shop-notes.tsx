import { CircleDollarSign, Clock, ReceiptText } from 'lucide-react'
import { CutoffCountdown } from '@/components/site/cutoff-countdown'
import { formatClockTime, formatJmd, formatUsd } from '@/lib/format'

/**
 * "Good to know": the three doubts that stop a first order (will it arrive today, what is it in
 * J$, are these prices current), answered before the first tap. Flat white card on crimson.
 */
export function ShopNotes({
  parishList,
  cutoff,
  jmdPerUsd,
  priceCheck,
}: {
  parishList: string
  cutoff: string | null
  jmdPerUsd: number
  /** From `priceCheckLine`, or null when no date is known. */
  priceCheck: string | null
}) {
  const strong = 'font-bold text-ink tabular-nums'
  return (
    <aside
      aria-labelledby="shop-notes-title"
      className="rounded-xl bg-surface p-card text-ink lg:p-card-lg"
    >
      <h2 id="shop-notes-title" className="text-h3 text-ink">
        Good to know
      </h2>
      <ul className="mt-4 divide-y divide-line md:grid md:grid-cols-3 md:gap-6 md:divide-y-0 lg:block lg:divide-y">
        <li className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-0 lg:py-4">
          <Clock className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
          <p className="text-small text-ink-body">
            {cutoff && parishList ? (
              <>
                Same-day delivery in <strong className="font-bold text-ink">{parishList}</strong>{' '}
                when you order by <strong className={strong}>{formatClockTime(cutoff)}</strong>{' '}
                Jamaica time.
                <CutoffCountdown cutoff={cutoff} />
              </>
            ) : (
              'Delivery is paused for now. Check back soon.'
            )}
          </p>
        </li>
        <li className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-0 lg:py-4">
          <CircleDollarSign className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
          <p className="text-small text-ink-body">
            You pay in US dollars. We show the J$ amount too, at{' '}
            <strong className={strong}>{formatJmd(jmdPerUsd)}</strong> to{' '}
            <strong className={strong}>{formatUsd(100)}</strong>.
          </p>
        </li>
        <li className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-0 lg:py-4">
          <ReceiptText className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
          <p className="text-small text-ink-body">
            {priceCheck && `${priceCheck} `}You get a photo of the till receipt for your order.
          </p>
        </li>
      </ul>
    </aside>
  )
}
