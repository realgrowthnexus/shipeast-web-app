import { DollarSign, MessageSquareText, ReceiptText, Replace } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { site } from '@/lib/site'
import { lightLink } from './steps'

/**
 * S6: us against what senders really do today (barrels, cash, vouchers), without naming anyone.
 * A ruled list beside one tall family photo, which stays put while the list scrolls on wide
 * screens.
 */
export function HomeWhy({ bankTransfer }: { bankTransfer: boolean }) {
  const promises = [
    {
      icon: ReceiptText,
      title: 'Proof on every order',
      body: 'A photo of the till receipt and a photo at the door, emailed to you and kept with your order.',
    },
    {
      icon: Replace,
      title: 'You decide on swaps',
      body: 'If an item is out of stock we use the rule you chose: a similar item, ask you first, or leave it out and refund it.',
    },
    {
      icon: MessageSquareText,
      title: 'Nothing for them to install',
      body: 'Your family gets a text on any phone. No app, no account, no password.',
    },
    {
      icon: DollarSign,
      title: 'Pay in US dollars',
      body: `PayPal, or a debit or credit card through PayPal${bankTransfer ? ', or bank transfer' : ''}. You see the Jamaican dollar amount too.`,
    },
  ]
  return (
    <section aria-labelledby="why-title" className="section">
      {/* One DOM order for every width (title, photo, list); grid placement puts the photo on
          the left from 1024px. */}
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-8 xl:gap-x-12">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <h2 id="why-title" className="text-h2 text-balance text-ink">
            No barrel. No cash. You choose what arrives.
          </h2>
          <p className="mt-3 max-w-2xl text-lead text-ink-body">
            A barrel means packing, shipping and customs. Cash can be spent on anything. With
            ShipEast you pick each item and see it reach the door.
          </p>
        </div>
        <div className="mt-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <StockPhoto
            name="whyFamily"
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-4/5 rounded-xl md:aspect-16/9 lg:aspect-4/5"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2">
          <ul className="mt-8 md:grid md:grid-cols-2 md:gap-x-8 lg:block">
            {promises.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-line py-6">
                <h3 className="flex items-center gap-3 text-h3 text-ink">
                  <Icon className="size-icon shrink-0 text-crimson" aria-hidden />
                  {title}
                </h3>
                <p className="mt-2 max-w-prose text-body text-ink-body">{body}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className={lightLink}>
            About {site.company}
          </Link>
        </div>
      </div>
    </section>
  )
}
