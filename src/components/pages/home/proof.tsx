import { Camera, DoorOpen, ReceiptText, Truck } from 'lucide-react'
import Link from 'next/link'
import { SmsPreview } from '@/components/order/sms-preview'

const emails = [
  {
    icon: ReceiptText,
    title: 'Order confirmed',
    line: 'Your receipt for what you paid, in US dollars.',
  },
  { icon: Camera, title: 'Shopped', line: 'A photo of the till receipt from the store.' },
  { icon: Truck, title: 'On the way', line: 'The driver has left the store.' },
  { icon: DoorOpen, title: 'Delivered', line: 'A photo at the door, and who received it.' },
]

/** Illustrative only, and labelled so: update to the real Twilio templates once they exist. */
const texts = [
  'ShipEast: Your groceries from Marcia are on the way. The driver will deliver today.',
  'ShipEast: Delivered. Your groceries from Marcia were dropped off at 2:41 PM.',
]

/**
 * S5: the middle red block. Text-led on purpose after three photo rows: what lands in your
 * inbox beside what lands on their phone.
 */
export function HomeProof() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="scroll-mt-header bg-oxblood section text-on-dark on-dark-focus"
    >
      <div className="mx-auto max-w-wide gutter">
        <div className="mx-auto max-w-page">
          <div className="max-w-2xl">
            <h2 id="proof-title" className="text-h2 text-balance">
              You see it bought. You see it delivered.
            </h2>
            <p className="mt-3 text-lead text-on-oxblood-muted">
              Every order sends you two photos, and your family a text. Nobody in Jamaica needs an
              app, an account or a smartphone.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h3 className="text-h3">What you get by email</h3>
              <ol className="mt-6">
                {emails.map(({ icon: Icon, title, line }, i) => (
                  <li
                    key={title}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-6 last:pb-0"
                  >
                    {i < emails.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-10 bottom-0 left-5 w-0.5 -translate-x-1/2 bg-line-on-dark"
                      />
                    )}
                    <span className="grid size-10 place-items-center rounded-full bg-crimson-deep">
                      <Icon className="size-icon text-blush" aria-hidden />
                    </span>
                    <div className="pt-2">
                      <p className="font-bold">{title}</p>
                      <p className="mt-1 text-small text-on-oxblood-muted">{line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="md:max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-none">
              <h3 className="text-h3">What your family gets by text</h3>
              <SmsPreview
                className="mt-6"
                messages={texts}
                label="Examples of the text messages your family gets"
              />
              <p className="mt-4 text-small text-on-oxblood-muted">
                Examples. Your messages show your own order, names and times.
              </p>
              <Link
                href="/how-it-works#proof-h"
                className="mt-2 inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush underline-offset-4 transition-colors duration-150 hover:decoration-on-dark"
              >
                See the full journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
