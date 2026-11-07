import { DoorOpen, ReceiptText, type LucideIcon } from 'lucide-react'
import { ProofPair } from '@/components/order/proof-pair'
import { exampleRecipient } from './example-texts'

const blocks: { icon: LucideIcon; title: string; facts: [string, string][] }[] = [
  {
    icon: ReceiptText,
    title: 'The receipt photo',
    facts: [
      [
        'What it shows',
        'The store’s own till receipt: every item, its price, the total and the time.',
      ],
      ['When', 'As soon as the driver has paid, at the Shopped step.'],
      ['Where', 'In your email and on your tracking page.'],
    ],
  },
  {
    icon: DoorOpen,
    title: 'The door photo',
    facts: [
      ['What it shows', 'Your order at the door, and the name of the person who received it.'],
      ['When', 'At the Delivered step.'],
      ['Where', 'In your email and on your tracking page.'],
    ],
  },
]

/**
 * S3: the two photos, each with a plain "what it shows, when, where", beside the drawn pair.
 * One DOM order for phones (title, pair, blocks); grid placement moves the pair left from 1024px.
 */
export function HiwProof({
  lines,
  jmdPerUsd,
}: {
  /** The example basket's first lines, quantity applied, in US cents. */
  lines: { name: string; cents: number }[]
  jmdPerUsd: number
}) {
  return (
    <section aria-labelledby="proof-h" className="bg-surface section">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
          <h2 id="proof-h" className="scroll-mt-header text-h2 text-balance text-ink">
            Two photos on every order
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            The store&apos;s receipt and the order at the door. Both arrive by email and on your
            tracking page, so you never have to take our word for it.
          </p>
        </div>

        {lines.length > 0 && (
          // A muted tray behind the pair: the white paper receipt would vanish on the white band.
          <div className="mt-8 rounded-2xl bg-surface-muted px-6 pt-8 pb-10 sm:px-10 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
            <ProofPair
              tilt
              className="mx-auto max-w-xl"
              receipt={{
                store: 'Example receipt',
                lines,
                totalCents: lines.reduce((t, l) => t + l.cents, 0),
                jmdPerUsd,
              }}
              door={{ recipient: exampleRecipient.name, place: exampleRecipient.place }}
            />
          </div>
        )}

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2">
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {blocks.map(({ icon: Icon, title, facts }) => (
              <div key={title} className="rounded-lg border border-line bg-page p-card">
                <span className="grid size-12 place-items-center rounded-full bg-surface-muted">
                  <Icon className="size-icon-lg text-crimson" aria-hidden />
                </span>
                <h3 className="mt-4 text-h3 text-ink">{title}</h3>
                <dl className="mt-3 flex flex-col gap-3">
                  {facts.map(([term, value]) => (
                    <div key={term}>
                      <dt className="text-small font-bold text-ink">{term}</dt>
                      <dd className="text-small text-ink-body">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-small text-ink-muted">
            The receipt is in Jamaican dollars, as the store charges. You paid in US dollars at
            checkout.
          </p>
        </div>
      </div>
    </section>
  )
}
