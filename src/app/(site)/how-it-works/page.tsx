import { MessageSquareText } from 'lucide-react'
import type { Metadata } from 'next'
import { ProofPair } from '@/components/order/proof-pair'
import { Container, PageIntro } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { getActiveZones } from '@/lib/data/site'
import { formatClockTime } from '@/lib/format'
import { TRACKER_STAGES } from '@/lib/order-status'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Follow one order from a laptop in Brooklyn to a door in Morant Bay: what you pay, what our driver does, and the proof you get.',
}

const stageText: Record<(typeof TRACKER_STAGES)[number]['key'], string> = {
  paid: 'Your payment is in. You get a receipt by email and a tracking link to share with family.',
  confirmed: 'We check the order and give it to a driver who knows the area.',
  shopping: 'The driver is in the store, ticking items off your list one by one.',
  shopped: 'Everything is bought. You get a photo of the store receipt.',
  out_for_delivery: 'The driver is on the way. Your family gets a text so they are ready.',
  delivered: 'Handed over at the door. You get a photo and the name of who received it.',
  closed: 'Any refund for missing items is sent and the order is finished.',
}

const substitutionRules = [
  {
    title: 'Allow similar',
    body: 'The driver picks the closest match at the same price or less. If it costs less, you get the difference back.',
  },
  {
    title: 'Ask me first',
    body: 'We message you before swapping anything. No answer in time means we leave it out and refund it.',
  },
  {
    title: 'Leave it out',
    body: 'We skip the item and refund what you paid for it.',
  },
]

export default async function HowItWorksPage() {
  const zones = await getActiveZones()
  const cutoff = formatClockTime(zones[0]?.cutoffTime ?? '13:00')

  return (
    <>
      <PageIntro title="How it works" tone="crimson">
        One order, from a laptop in Brooklyn to a door in Morant Bay. Nothing is shipped: you pay
        online and we buy everything in Jamaica.
      </PageIntro>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-20">
        <section aria-labelledby="stages-h">
          <h2 id="stages-h" className="text-3xl font-extrabold tracking-tight text-ink">
            The seven steps you can follow
          </h2>
          <p className="mt-2 text-ink-muted">
            Your tracking page shows each step with the time it happened.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {TRACKER_STAGES.map((stage, i) => (
              <li key={stage.key} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-crimson font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{stage.label}</h3>
                  <p className="text-ink-muted">{stageText[stage.key]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="flex flex-col gap-8 lg:pt-16">
          <div className="rounded-lg bg-blush-200 p-6 sm:p-8">
            <ProofPair
              tilt
              receipt={{
                store: 'PRICESMART',
                lines: [
                  { name: 'Baby Diapers, Size 3', cents: 4290 },
                  { name: 'Baby Wipes', cents: 2390 },
                  { name: 'Infant Formula', cents: 4590 },
                ],
                totalCents: 11270,
                at: '2026-10-25T16:10:00Z',
              }}
              door={{
                recipient: 'Paulette Brown',
                place: 'Yallahs, St. Thomas',
                at: '2026-10-25T18:20:00Z',
              }}
            />
          </div>
          <p className="text-ink-muted">
            Every order ends with these two photos: the receipt from the store, and the order at the
            door.
          </p>
        </aside>
      </Container>

      <section aria-labelledby="subs-h" className="border-t border-line py-16 sm:py-20">
        <Container>
          <h2 id="subs-h" className="text-3xl font-extrabold tracking-tight text-ink">
            If something is out of stock
          </h2>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Shelves run out. At checkout you choose what the driver does, and the tracking page
            shows every item as found, swapped or missing.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {substitutionRules.map((r) => (
              <li key={r.title} className="rounded-lg border border-line bg-blush-100 p-6">
                <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-1 text-ink-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="family-h" className="border-t border-line py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="family-h" className="text-3xl font-extrabold tracking-tight text-ink">
              What your family receives
            </h2>
            <p className="mt-3 text-ink-muted">
              Nothing to install and no account. Just two text messages, one when the driver sets
              off and one when the order is delivered.
            </p>
            <p className="mt-6 text-ink">
              Orders paid before <strong>{cutoff}</strong> are delivered the same day. Later orders
              arrive the next day.
            </p>
          </div>
          <div className="flex flex-col gap-3" aria-label="Example text messages">
            {[
              'ShipEast: Hi Marcia, Andre’s groceries are on the way with Kemar. He will call 1-876-555-0142 when he arrives.',
              'ShipEast: Your order from Andre has been delivered. Thank you!',
            ].map((sms) => (
              <p
                key={sms}
                className="flex max-w-sm gap-3 rounded-lg rounded-bl-none border border-line bg-white p-4 text-ink shadow-card"
              >
                <MessageSquareText className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                {sms}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-20">
        <ButtonLink href="/shop" size="lg">
          Start shopping
        </ButtonLink>
      </Container>
    </>
  )
}
