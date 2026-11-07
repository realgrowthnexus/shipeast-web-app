import { Gift, MapPin, Phone } from 'lucide-react'
import { SmsPreview } from '@/components/order/sms-preview'
import { StockPhoto } from '@/components/site/stock-photo'
import { exampleTexts } from './example-texts'

const tips = [
  {
    icon: Phone,
    text: 'The driver calls the number you give when they are close. Write it like 1-876-123-1234.',
  },
  {
    icon: MapPin,
    text: 'Add a landmark, like “blue gate opposite the church”, so the driver finds the house first time.',
  },
  { icon: Gift, text: 'Add a gift message at checkout and we hand it over with the order.' },
]

/**
 * S5: the person at the other end, then exactly what reaches her phone. One DOM order for
 * phones (title, photo, texts, tips); grid placement puts the photo left from 1024px.
 */
export function HiwFamily() {
  return (
    <section aria-labelledby="family-h" className="bg-surface section">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-end">
          <h2 id="family-h" className="scroll-mt-header text-h2 text-balance text-ink">
            Your family installs nothing
          </h2>
          <p className="mt-3 max-w-2xl text-lead text-ink-body">
            No app, no account and no smartphone needed. They get a text when the driver sets off
            and another when the order is delivered.
          </p>
        </div>

        <div className="mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0">
          {/* She stands right of centre: 62% keeps her face in the tall 4:5 crop, and the wide
              phone crops barely trim the sides, so one position serves every width. */}
          <StockPhoto
            name="hiwFamilyDoor"
            sizes="(min-width: 1024px) 460px, 100vw"
            position="62% 35%"
            className="aspect-4/3 rounded-xl md:aspect-16/9 lg:aspect-4/5 lg:rounded-2xl"
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start">
          <SmsPreview
            className="mt-8 max-w-md border border-line bg-page"
            messages={exampleTexts}
            label="Examples of the two text messages your family gets"
          />
          <p className="mt-3 text-small text-ink-muted">
            Examples. The real texts use your names and times.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {tips.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-small text-ink-body">
                <Icon className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
