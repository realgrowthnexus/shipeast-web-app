import { Clock3, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'
import { formatClockTime, formatUsd } from '@/lib/format'
import type { DeliveryZone, Faq } from '@/lib/types'

/** What a first-time sender asks before paying, matched on the question text. */
const firstTimeQuestions = [
  /arrived/i,
  /cancel/i,
  /out of stock/i,
  /how do i pay/i,
  /install/i,
  /shipped/i,
]

/** Up to six questions, the first-time ones first, filled from the rest in their usual order. */
export function pickHomeFaqs(faqs: Faq[], count = 6) {
  const picked = firstTimeQuestions
    .map((re) => faqs.find((f) => re.test(f.question)))
    .filter((f): f is Faq => Boolean(f))
  const rest = faqs.filter((f) => !picked.includes(f))
  return [...picked, ...rest].slice(0, count)
}

/**
 * The closing questions block: where we deliver (fee and cut-off per zone) beside the six
 * questions a first-time sender asks. Zones sit above the questions on phones.
 */
export function DeliveryAndQuestions({ zones, faqs }: { zones: DeliveryZone[]; faqs: Faq[] }) {
  return (
    <section aria-labelledby="zone-h" className="py-8 sm:py-10">
      <div className="mx-auto grid w-full max-w-wide gap-10 gutter lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="zone-h" className="text-title text-balance text-ink">
            Where we deliver
          </h2>
          <p className="mt-1 text-small text-ink-muted">
            Same day in {zones.map((z) => z.parish).join(' and ')}, from our team in St. Thomas.
          </p>
          <ul className="mt-5 grid gap-3">
            {zones.map((z) => (
              <li key={z.id} className="rounded-lg border border-line bg-surface p-4 sm:p-5">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <MapPin className="size-4 text-crimson" aria-hidden />
                  {z.parish}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-small">
                  <div>
                    <dt className="text-ink-muted">Delivery fee</dt>
                    <dd className="mt-0.5 text-body font-bold text-ink">{formatUsd(z.feeCents)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Same-day cut-off</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-body font-bold text-ink">
                      <Clock3 className="size-4 text-ink-muted" aria-hidden />
                      {formatClockTime(z.cutoffTime)}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <Link
            href="/delivery"
            className="mt-3 inline-flex min-h-11 items-center text-small font-semibold text-crimson hover:underline"
          >
            Delivery areas and fees
          </Link>
        </div>
        <div className="lg:col-span-7">
          <h2 id="faq-h" className="text-title text-balance text-ink">
            Before you order
          </h2>
          <div className="mt-5">
            <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
          </div>
          <Link
            href="/faq"
            className="mt-3 inline-flex min-h-11 items-center text-small font-semibold text-crimson hover:underline"
          >
            All questions and answers
          </Link>
        </div>
      </div>
    </section>
  )
}
