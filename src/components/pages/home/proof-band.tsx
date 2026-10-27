import { ProofPair } from '@/components/order/proof-pair'
import { Section } from '@/components/site/section'
import { formatUsd } from '@/lib/format'
import { sampleDoor, sampleReceipt } from './sample-proof'

const steps = [
  {
    title: 'Fill a basket',
    body: 'Groceries, household, pharmacy and baby items, priced in US dollars.',
  },
  {
    title: 'Tell us who it’s for',
    body: 'Their address and a landmark, and what to do if something is out of stock.',
  },
  {
    title: 'We shop in Jamaica',
    body: 'Our driver buys everything and sends you the receipt photo.',
  },
  {
    title: 'At their door today',
    body: 'Your family gets a text on the way. You get the doorstep photo.',
  },
]

/**
 * The page's one crimson band: how an order works, and the two photos every order comes with,
 * shown on a clearly labelled example order. The receipt is in J$, as a Jamaican till prints it.
 */
export function ProofBand({ jmdPerUsd }: { jmdPerUsd: number }) {
  return (
    <Section tone="crimson" wide aria-labelledby="proof-h">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mb-3 eyebrow text-blush">Proof on every order</p>
          <h2 id="proof-h" className="text-h2 text-balance">
            You see what was bought, and that it arrived
          </h2>
          <p className="mt-3 max-w-xl text-lead text-on-crimson-muted">
            Every item and every price on the real receipt, then the bags at their door. Both photos
            come to your email and your tracking link.
          </p>
          <ol className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden
                  className="w-6 shrink-0 text-h3 font-extrabold text-blush tabular-nums"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-small text-on-crimson-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="mx-auto w-full max-w-md lg:col-span-6 lg:max-w-lg">
          <div className="rounded-2xl bg-crimson-800 px-5 pt-5 pb-8 sm:px-10 sm:pt-8 sm:pb-12">
            <p className="mb-5 inline-flex rounded-sm bg-blush px-2 py-0.5 text-xs font-bold text-crimson-deep">
              Example order
            </p>
            <ProofPair tilt onDark receipt={{ ...sampleReceipt, jmdPerUsd }} door={sampleDoor} />
          </div>
          <figcaption className="mt-3 text-center text-small text-on-crimson-muted">
            The sender paid {formatUsd(sampleReceipt.totalCents)}. We send you the real receipt.
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
