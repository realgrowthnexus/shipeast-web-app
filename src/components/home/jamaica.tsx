import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatClockTime, formatUsd } from '@/lib/format'
import { SPEED_LABEL } from '@/lib/home'
import type { DeliveryZone } from '@/lib/types'

/**
 * Where we deliver (PLAN §3, row 9): the one green band on the page, because this is the part
 * that happens in Jamaica. Fees, cut-offs and minimums come straight from the zones.
 */
export function HomeJamaica({ zones, parishList }: { zones: DeliveryZone[]; parishList: string }) {
  if (!zones.length) return null
  return (
    <section aria-labelledby="home-jamaica" className="bg-leaf text-on-dark on-dark-focus">
      <div className="mx-auto grid max-w-wide items-center gap-10 gutter py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 id="home-jamaica" className="font-display text-shout text-balance">
            Delivering in {parishList}.
          </h2>
          <p className="mt-5 max-w-md text-lead text-on-leaf-muted">
            More parishes are coming. If your family lives somewhere else in Jamaica, tell us where
            and we will let you know when we reach them.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {zones.map((z) => (
              <li key={z.id} className="rounded-3xl bg-leaf-deep p-6">
                <p className="font-display text-title">{z.parish}</p>
                <dl className="mt-4 space-y-3 text-small">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-on-leaf-muted">Delivery fee</dt>
                    <dd className="font-display text-h3 text-mango tabular-nums">
                      {formatUsd(z.feeCents)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-on-leaf-muted">{SPEED_LABEL[z.speed]}, order by</dt>
                    <dd className="font-bold tabular-nums">{formatClockTime(z.cutoffTime)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-on-leaf-muted">Minimum order</dt>
                    <dd className="font-bold tabular-nums">{formatUsd(z.minOrderCents)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <Link
            href="/delivery"
            className="mt-8 inline-flex min-h-control items-center gap-2 font-bold text-on-dark underline decoration-mango decoration-2 underline-offset-4 hover:decoration-on-dark"
          >
            Delivery areas and fees
            <ArrowRight className="size-icon" aria-hidden />
          </Link>
        </div>
        <div className="relative">
          <StockPhoto
            name="kingstonStreet"
            sizes="(min-width: 1024px) 600px, 92vw"
            className="aspect-[4/3] rounded-3xl lg:aspect-[5/4]"
          />
          <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-mango px-4 py-2 text-small font-bold text-ink">
            <MapPin className="size-icon" aria-hidden />
            Downtown Kingston
          </p>
        </div>
      </div>
    </section>
  )
}
