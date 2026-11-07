import { DoorOpen, ReceiptText, Repeat2 } from 'lucide-react'
import Link from 'next/link'
import { onDarkLink } from '@/components/site/links'
import { SUBSTITUTION_RULES } from '@/lib/substitution'

/** "Allow similar, Ask me first, or Leave it out", built from the one list of rules. */
const ruleNames = SUBSTITUTION_RULES.map((r) => r.title)
const ruleList = `${ruleNames.slice(0, -1).join(', ')}, or ${ruleNames.at(-1)}`

const rows = [
  {
    icon: ReceiptText,
    title: 'A photo of the till receipt.',
    body: 'Our driver buys every item and sends you the receipt from the store, so you see what was bought and what it cost.',
  },
  {
    icon: Repeat2,
    title: 'If something has run out, you decide.',
    body: `At checkout choose ${ruleList}. A left-out item is refunded.`,
  },
  {
    icon: DoorOpen,
    title: 'A photo at the door, a text for them.',
    body: 'You get a photo when the basket is handed over. Your family gets a text and installs nothing.',
  },
]

/** S3: the two doubts that grow with a many-item basket, answered in three ruled rows. */
export function AfterYouOrder() {
  return (
    <section
      id="how-baskets-work"
      aria-labelledby="how-baskets-work-title"
      className="scroll-mt-header bg-oxblood section text-on-dark on-dark-focus"
    >
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="how-baskets-work-title" className="text-h2 text-balance">
            What happens after you add a basket
          </h2>
          <p className="mt-3 max-w-2xl text-lead text-on-oxblood-muted">
            We buy the whole basket in Jamaica on the day we deliver. You see the proof; your family
            just opens the door.
          </p>
          <Link href="/how-it-works" className={`${onDarkLink} mt-4`}>
            How it works
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-line-on-dark border-y border-line-on-dark lg:col-span-7 lg:mt-0">
          {rows.map(({ icon: Icon, title, body }) => (
            <li key={title} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
              <span className="grid size-12 place-items-center rounded-full bg-crimson-deep text-on-dark [&_svg]:size-6">
                <Icon aria-hidden />
              </span>
              <div>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-1 text-body text-on-oxblood-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
