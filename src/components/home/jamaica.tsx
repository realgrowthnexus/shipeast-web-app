import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Parallax } from '@/components/motion/parallax'
import { Reveal } from '@/components/motion/reveal'
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
      <div className="mx-auto grid max-w-wide items-center gap-10 gutter section-sm lg:grid-cols-2 lg:gap-14">
        <Reveal y={0}>
          <h2 id="home-jamaica" className="font-display text-h2 font-semibold text-balance">
            Delivering in {parishList.replace(/St\. /g, 'St.\u00a0')}.
          </h2>
          <p className="mt-5 max-w-md text-body text-on-dark">
            ShipEast Couriers &amp; Bearer Service Ltd is a courier company based in St. Thomas. Our
            own drivers do the shopping and the delivery.
          </p>
          <p className="mt-3 max-w-md text-small text-on-leaf-muted">
            Delivery times are estimates: traffic, weather and what the store has in stock can
            change them. More parishes are coming.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {zones.map((z) => (
              <li key={z.id} className="rounded-xl bg-surface p-5 text-ink">
                <p className="font-display text-lead font-semibold">{z.parish}</p>
                <dl className="mt-4 space-y-3 text-small">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-muted">Delivery fee</dt>
                    <dd className="text-body font-semibold text-crimson tabular-nums">
                      {formatUsd(z.feeCents)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-muted">
                      {z.speed === 'same_day' ? 'Same-day aim' : SPEED_LABEL[z.speed]}, order by
                    </dt>
                    <dd className="font-semibold tabular-nums">{formatClockTime(z.cutoffTime)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-muted">Minimum order</dt>
                    <dd className="font-semibold tabular-nums">{formatUsd(z.minOrderCents)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              href="/delivery"
              className="inline-flex min-h-control items-center gap-2 font-semibold text-on-dark underline decoration-mango decoration-2 underline-offset-4 hover:decoration-on-dark"
            >
              Delivery areas and fees
              <ArrowRight className="size-icon" aria-hidden />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-on-leaf-muted decoration-2 underline-offset-4 hover:decoration-on-dark"
            >
              About ShipEast
            </Link>
          </div>
        </Reveal>
        <div className="relative">
          <Parallax className="aspect-[4/3] rounded-xl">
            <StockPhoto
              name="kingstonStreet"
              sizes="(min-width: 1024px) 600px, 92vw"
              className="h-full w-full rounded-none"
            />
          </Parallax>
          <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-mango px-4 py-2 text-small font-semibold text-ink">
            <MapPin className="size-icon" aria-hidden />
            Downtown Kingston
          </p>
        </div>
      </div>
    </section>
  )
}
