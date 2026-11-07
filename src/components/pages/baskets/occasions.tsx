import Link from 'next/link'
import { lightLink } from '@/components/site/links'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'

/**
 * S4: the occasion sender (the printed gift message, more ideas) and the monthly supporter
 * (send it again) in one calm split. The repeat wording follows the monthly-orders switch.
 */
export function Occasions({ monthly }: { monthly: boolean }) {
  return (
    <section aria-labelledby="occasions" className="bg-surface section">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        <StockPhoto
          name="basketsGiftWrap"
          sizes="(min-width: 1024px) 552px, 100vw"
          className="aspect-4/3 rounded-2xl md:aspect-16/9 lg:col-span-6 lg:aspect-4/3"
        />
        <div className="mt-8 max-w-2xl lg:col-span-6 lg:mt-0">
          <h2 id="occasions" className="text-h2 text-balance text-ink">
            Sending for an occasion?
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            Add a gift message at checkout. We print it and hand it over with the basket, so it
            arrives from you, not from a courier.
          </p>
          <ButtonLink href="/gifts" variant="outline" size="lg" className="mt-6 w-full sm:w-auto">
            See gift ideas
          </ButtonLink>
          <hr className="my-8 border-t border-line" />
          <h3 className="text-h3 text-ink">
            {monthly ? 'Want it every month?' : 'Sending the same basket again?'}
          </h3>
          <p className="mt-2 text-body text-ink-body">
            {monthly
              ? 'Set up a monthly order once. We shop and deliver on the day you pick, with the receipt photo and the door photo every time.'
              : 'With a free account, every past order has a Send this again button: the same items to the same address, in one tap.'}
          </p>
          <Link href="/monthly" className={`${lightLink} mt-2`}>
            {monthly ? 'Set up a monthly order' : 'How repeat sending works'}
          </Link>
        </div>
      </div>
    </section>
  )
}
