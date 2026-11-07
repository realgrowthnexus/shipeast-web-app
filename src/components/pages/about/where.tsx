import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { CutoffNote } from '@/components/site/cutoff-note'
import { lightLink } from '@/components/site/links'
import { StockPhoto } from '@/components/site/stock-photo'
import { SPEED_LABEL } from '@/lib/home'
import type { DeliveryZone } from '@/lib/types'

/**
 * S4: roots shown as a place. A Jamaican country road under the flat oxblood overlay (only
 * on-dark text sits on it), and one white card that lists the live delivery zones, so the page
 * can never overstate coverage.
 */
export function AboutWhere({
  zones,
  parishList,
  earliestCutoff,
}: {
  zones: DeliveryZone[]
  parishList: string
  earliestCutoff: string | null
}) {
  return (
    <section
      aria-labelledby="where-title"
      className="relative isolate scroll-mt-header overflow-hidden section text-on-dark on-dark-focus lg:flex lg:min-h-[560px] lg:items-center"
    >
      <StockPhoto
        name="companyCountryRoad"
        alt=""
        position="center 55%"
        sizes="100vw"
        className="absolute inset-0 -z-10 rounded-none"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim" />

      <div className="relative mx-auto w-full max-w-page gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="max-w-2xl lg:col-span-6">
          <h2 id="where-title" className="text-h2 text-balance text-on-dark">
            Based in St. Thomas.{parishList && ` Delivering in ${parishList}.`}
          </h2>
          <p className="mt-4 text-lead text-on-dark">
            We deliver where we already run errands, so our driver knows the roads, the stores and
            how to find a gate from a landmark. More parishes will come when we can serve them
            properly.
          </p>
        </div>

        <div className="mt-8 max-w-md rounded-xl bg-surface p-card text-ink shadow-float lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none">
          {zones.length > 0 ? (
            <>
              <h3 className="text-h3 text-ink">Where we deliver today</h3>
              <ul className="mt-3">
                {zones.map((z) => (
                  <li
                    key={z.id}
                    className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0"
                  >
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      <MapPin className="size-icon text-crimson" aria-hidden />
                      {z.parish}
                    </span>
                    <span className="text-small text-ink-muted">{SPEED_LABEL[z.speed]}</span>
                  </li>
                ))}
              </ul>
              {earliestCutoff && <CutoffNote cutoff={earliestCutoff} className="mt-4" />}
              <div className="mt-2 flex flex-col">
                <Link href="/delivery" className={lightLink}>
                  Delivery areas and fees
                </Link>
                <Link href="/contact" className={lightLink}>
                  Family somewhere else in Jamaica? Tell us where
                </Link>
              </div>
            </>
          ) : (
            <>
              <MapPin className="size-icon-lg text-crimson" aria-hidden />
              <h3 className="mt-3 text-h3 text-ink">We&apos;re not taking orders right now</h3>
              <p className="mt-2 text-body text-ink-body">
                Leave your email on the contact page and we&apos;ll tell you when we deliver to your
                family&apos;s parish.
              </p>
              <Link href="/contact" className={lightLink}>
                Contact us
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
