import { Check, Clock3, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageIntro } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { getZones } from '@/lib/data/site'
import { formatClockTime, formatUsd } from '@/lib/format'
import type { DeliveryZone } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Delivery areas and fees',
  description:
    'Where ShipEast delivers in Jamaica, the delivery fee for each parish and same-day cut-off times.',
}

const speedLabel: Record<DeliveryZone['speed'], string> = {
  same_day: 'Same day',
  next_day: 'Next day',
  scheduled: 'Scheduled runs',
}

export default async function DeliveryPage() {
  const zones = await getZones()
  const active = zones.filter((z) => z.active)
  const soon = zones.filter((z) => !z.active)

  return (
    <>
      <PageIntro title="Delivery areas and fees">
        We deliver in {active.map((z) => z.parish).join(' and ')} today. Fees are per order, not per
        item.
      </PageIntro>

      <Container className="py-12 sm:py-16">
        {active.length === 0 ? (
          <Alert tone="warn" title="We are not taking deliveries right now">
            Check back soon, or WhatsApp us to ask when your area opens.
          </Alert>
        ) : (
          <>
            {/* Phones: one card per parish, so the fee is never hidden off-screen */}
            <ul className="grid gap-3 sm:hidden">
              {active.map((z) => (
                <li key={z.id} className="rounded-lg border border-line bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-lg font-bold text-ink">
                      <MapPin className="size-5 text-crimson" aria-hidden />
                      {z.parish}
                    </p>
                    <p className="text-lg font-bold text-ink tabular-nums">
                      {formatUsd(z.feeCents)}
                    </p>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-ink-muted">{speedLabel[z.speed]} if paid by</dt>
                      <dd className="font-semibold text-ink">{formatClockTime(z.cutoffTime)}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Minimum order</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        {formatUsd(z.minOrderCents)}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto rounded-lg border border-line bg-white sm:block">
              <table className="w-full text-left">
                <caption className="sr-only">Delivery fees and cut-off times by parish</caption>
                <thead className="border-b border-line bg-blush-100 text-sm text-ink-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Parish
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Delivery
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Same day if paid by
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Minimum order
                    </th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">
                      Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {active.map((z) => (
                    <tr key={z.id}>
                      <th scope="row" className="px-5 py-4 font-bold text-ink">
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <MapPin className="size-4 text-crimson" aria-hidden />
                          {z.parish}
                        </span>
                      </th>
                      <td className="px-5 py-4 whitespace-nowrap text-ink">
                        {speedLabel[z.speed]}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-ink">
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="size-4 text-crimson" aria-hidden />
                          {formatClockTime(z.cutoffTime)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink tabular-nums">
                        {formatUsd(z.minOrderCents)}
                      </td>
                      <td className="px-5 py-4 text-right text-lg font-bold text-ink tabular-nums">
                        {formatUsd(z.feeCents)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="rules-h">
            <h2 id="rules-h" className="text-2xl font-extrabold tracking-tight text-ink">
              Good to know
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                'Bank transfer orders are scheduled once the money arrives.',
                'Give a nearby landmark and a phone number the driver can call.',
                'If nobody is home, the driver calls and waits, then we contact you to arrange another try.',
                'Every delivery ends with a photo at the door and the name of who received it.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-ink">
                  <Check className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/legal/delivery"
              className="mt-4 inline-block font-semibold text-crimson hover:underline"
            >
              Read the delivery policy
            </Link>
          </section>

          {soon.length > 0 && (
            <section aria-labelledby="soon-h">
              <h2 id="soon-h" className="text-2xl font-extrabold tracking-tight text-ink">
                Coming later
              </h2>
              <p className="mt-2 text-ink-muted">
                We are adding parishes as we add drivers. Message us if you need one of these.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {soon.map((z) => (
                  <li
                    key={z.id}
                    className="rounded-full border border-line bg-blush-100 px-3 py-1.5 text-sm text-ink"
                  >
                    {z.parish}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
    </>
  )
}
