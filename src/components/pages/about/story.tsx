import { MapPin, ReceiptText, Truck } from 'lucide-react'
import { StockPhoto } from '@/components/site/stock-photo'

/**
 * S2: a real Kingston street beside a short, provable story, closed by a three-row fact strip
 * for the skimmer. One DOM order for every width (title, photo, text); grid placement puts the
 * photo on the left from 1024px.
 */
export function AboutStory({ parishList }: { parishList: string }) {
  const facts = [
    { icon: MapPin, term: 'Based in', value: 'St. Thomas, Jamaica' },
    ...(parishList ? [{ icon: Truck, term: 'Delivering in', value: parishList }] : []),
    {
      icon: ReceiptText,
      term: 'On every order',
      value: 'A photo of the till receipt and a photo at the door',
    },
  ]
  return (
    <section aria-labelledby="story-title" className="section">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 xl:gap-x-12">
        <h2
          id="story-title"
          className="text-h2 text-balance text-ink lg:col-span-7 lg:col-start-6 lg:row-start-1"
        >
          Errands are what we do
        </h2>
        <StockPhoto
          name="kingstonStreet"
          position="center 35%"
          sizes="(min-width: 1024px) 460px, 100vw"
          className="mt-8 aspect-4/3 rounded-xl md:aspect-16/9 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:aspect-4/5"
        />
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2">
          <div className="mt-6 flex max-w-prose flex-col gap-4 text-body text-ink-body lg:text-lead">
            <p>
              ShipEast is a courier and bearer service in St. Thomas. Picking things up, dropping
              them off and running errands for people who can&apos;t be there themselves is our
              everyday work.
            </p>
            <p>
              Our driver already shops at local stores for customers who live overseas. Shop &amp;
              Send puts that on a proper website: you fill the basket and pay in US dollars, and we
              do the shopping and the delivery.
            </p>
            <p>
              Nothing is shipped, so there are no barrels, customs or freight. Only the money
              crosses the border. Your family installs nothing; they get a text when it&apos;s on
              the way.
            </p>
          </div>
          <dl className="mt-8 max-w-prose">
            {facts.map(({ icon: Icon, term, value }) => (
              <div
                key={term}
                className="grid gap-x-3 border-t border-line py-4 last:border-b sm:grid-cols-[13rem_1fr] sm:items-center"
              >
                <dt className="flex items-center gap-3 text-small text-ink-muted">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-muted">
                    <Icon className="size-icon text-crimson" aria-hidden />
                  </span>
                  {term}
                </dt>
                <dd className="pl-13 text-body font-semibold text-ink sm:pl-0">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
