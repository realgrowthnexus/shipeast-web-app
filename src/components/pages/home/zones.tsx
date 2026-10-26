import { Clock3, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatClockTime, formatUsd } from '@/lib/format'
import type { DeliveryZone } from '@/lib/types'

/** Where we deliver, on oxblood: a photo of Kingston and one card per active zone. */
export function HomeZones({ zones }: { zones: DeliveryZone[] }) {
  return (
    <Section tone="oxblood" wide aria-labelledby="zone-h">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5" y={0}>
          <StockPhoto
            name="kingston"
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 100vw"
            className="aspect-4/3 rounded-2xl bg-crimson-950"
          />
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHeader
            onDark
            id="zone-h"
            eyebrow="Coverage"
            title="Where we deliver"
            lead="Our team is based in St. Thomas. Pay before the cut-off and it arrives the same day. More parishes are coming as we add drivers."
          />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {zones.map((z) => (
              <StaggerItem key={z.id} className="rounded-xl bg-crimson-800 p-card">
                <p className="flex items-center gap-2 text-h3">
                  <MapPin className="size-5 text-blush" aria-hidden />
                  {z.parish}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-small">
                  <div>
                    <dt className="text-on-crimson-muted">Delivery fee</dt>
                    <dd className="mt-0.5 text-body font-bold">{formatUsd(z.feeCents)}</dd>
                  </div>
                  <div>
                    <dt className="text-on-crimson-muted">Same-day cut-off</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-body font-bold">
                      <Clock3 className="size-4 text-blush" aria-hidden />
                      {formatClockTime(z.cutoffTime)}
                    </dd>
                  </div>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
          <Link
            href="/delivery"
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-blush hover:underline"
          >
            Delivery areas and fees
          </Link>
        </div>
      </div>
    </Section>
  )
}
