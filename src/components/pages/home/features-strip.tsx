import { Camera, Clock, DollarSign, Receipt } from 'lucide-react'

/**
 * The four promises behind every order, in one quiet row above the footer: icon, short title,
 * one line. Two across on phones and tablets, four on wide screens.
 */
export function FeaturesStrip({ cutoffTime, parishes }: { cutoffTime: string; parishes: string }) {
  const features = [
    {
      icon: Clock,
      title: 'Same-day delivery',
      body: `Order by ${cutoffTime} Jamaica time for delivery today in ${parishes}.`,
    },
    {
      icon: Receipt,
      title: 'Receipt photo',
      body: 'See the till receipt for everything our driver bought.',
    },
    {
      icon: Camera,
      title: 'Doorstep photo',
      body: 'A photo at the door the moment your family has it.',
    },
    {
      icon: DollarSign,
      title: 'Pay in US dollars',
      body: 'PayPal, card or bank transfer. Full refund until we start shopping.',
    },
  ]
  return (
    <section aria-label="Every order" className="py-8 sm:py-10">
      <ul className="mx-auto grid w-full max-w-wide grid-cols-2 gap-3 gutter lg:grid-cols-4 lg:gap-4">
        {features.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:gap-4 sm:p-5"
          >
            <Icon className="mt-0.5 size-7 shrink-0 text-crimson" strokeWidth={1.75} aria-hidden />
            <span>
              <span className="block font-bold text-ink">{title}</span>
              <span className="mt-1 block text-small text-ink-body">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
