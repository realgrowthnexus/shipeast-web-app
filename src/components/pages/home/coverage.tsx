import { MapPin, Zap } from 'lucide-react'
import Link from 'next/link'
import { overlayLink } from '@/components/site/links'
import { CutoffNote } from '@/components/site/cutoff-note'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { formatClockTime, formatUsd } from '@/lib/format'
import { SPEED_LABEL } from '@/lib/home'
import type { DeliveryZone } from '@/lib/types'

/**
 * S7: Kingston and its hills behind the live fees and cut-offs. The only photo with a flat
 * overlay on the site (oxblood at 80%, docs/PHOTOGRAPHY.md): only on-dark text sits on it;
 * everything else is inside the white cards.
 */
export function HomeCoverage({
  zones,
  parishList,
  earliestCutoff,
}: {
  zones: DeliveryZone[]
  parishList: string
  earliestCutoff: string | null
}) {
  const n = zones.length
  return (
    <section
      id="coverage"
      aria-labelledby="coverage-title"
      className="relative isolate scroll-mt-header overflow-hidden section text-on-dark on-dark-focus lg:flex lg:min-h-[640px] lg:items-center"
    >
      <StockPhoto
        name="jmKingstonHills"
        alt=""
        position="center 60%"
        sizes="100vw"
        className="absolute inset-0 -z-10 rounded-none"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim" />

      <div className="relative mx-auto w-full max-w-page gutter">
        <div className="max-w-2xl">
          <h2 id="coverage-title" className="text-h2 text-balance text-on-dark">
            Delivering in {parishList || 'Jamaica'}
          </h2>
          <p className="mt-4 text-lead text-on-dark">
            Same-day delivery when you order before the cut-off. More parishes are coming.
          </p>
        </div>

        {n > 0 ? (
          <ul
            className={cn(
              'mt-8 grid gap-4 md:gap-6 lg:mt-12',
              n === 1 ? 'max-w-md' : 'md:grid-cols-2 lg:max-w-4xl',
              n >= 3 && 'lg:max-w-none lg:grid-cols-3',
            )}
          >
            {zones.map((z) => (
              <li key={z.id}>
                <article
                  aria-labelledby={`zone-${z.id}`}
                  className="rounded-xl bg-surface p-card text-ink shadow-float"
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
                      z.speed === 'same_day'
                        ? 'bg-ok-tint text-ok'
                        : 'bg-surface-muted text-ink-muted',
                    )}
                  >
                    {z.speed === 'same_day' && <Zap className="size-icon-sm" aria-hidden />}
                    {SPEED_LABEL[z.speed]}
                  </span>
                  <h3 id={`zone-${z.id}`} className="mt-3 text-h3 text-ink">
                    {z.parish}
                  </h3>
                  <dl className="mt-3">
                    {[
                      ['Delivery fee', formatUsd(z.feeCents)],
                      ['Same-day cut-off', `${formatClockTime(z.cutoffTime)} Jamaica time`],
                      ['Minimum order', formatUsd(z.minOrderCents)],
                    ].map(([term, value]) => (
                      <div
                        key={term}
                        className="flex justify-between gap-4 border-b border-line py-2 last:border-0"
                      >
                        <dt className="text-small text-ink-muted">{term}</dt>
                        <dd className="text-right text-body font-semibold text-ink tabular-nums">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 max-w-md rounded-xl bg-surface p-card text-ink shadow-float lg:mt-12">
            <MapPin className="size-icon-lg text-crimson" aria-hidden />
            <h3 className="mt-3 text-h3 text-ink">We&apos;re not taking orders right now</h3>
            <p className="mt-2 text-body text-ink-body">
              Leave your email on the contact page and we&apos;ll tell you when we deliver to your
              family&apos;s parish.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex min-h-control items-center font-semibold text-crimson underline-offset-4 hover:underline focus-visible:outline-signal"
            >
              Contact us
            </Link>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2">
          {earliestCutoff && <CutoffNote cutoff={earliestCutoff} tone="onPhoto" />}
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-x-8">
            <Link href="/delivery" className={overlayLink}>
              Delivery areas and fees
            </Link>
            <Link href="/contact" className={overlayLink}>
              Family somewhere else in Jamaica? Tell us where
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
