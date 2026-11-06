import Link from 'next/link'
import { SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import type { StockPhotoKey } from '@/lib/stock-photos'

/** A text link on a light band. */
export const lightLink =
  'inline-flex min-h-control items-center font-semibold text-crimson underline-offset-4 hover:underline'

/**
 * S2: the four steps of one order, in order. Phones get rows with a small square photo so all
 * four fit in about a screen and a half; wider screens put the photo on top.
 */
export function HomeSteps({ payLine }: { payLine: string }) {
  const steps: { title: string; body: string; photo: StockPhotoKey; position?: string }[] = [
    {
      title: 'You fill the basket',
      body: `Choose groceries, household, pharmacy or baby items, or a ready-made basket. Pay in US dollars by ${payLine}.`,
      photo: 'homeSenderPhone',
    },
    {
      title: 'We shop in Jamaica',
      body: 'A ShipEast driver buys your list at a store in Jamaica. If something is out of stock, we follow the rule you chose.',
      photo: 'stepShop',
      position: '55% center',
    },
    {
      title: 'You get the receipt',
      body: 'The driver photographs the till receipt and we email it to you, so you see what was bought and what it cost.',
      photo: 'shopCheckout',
      position: 'center 60%',
    },
    {
      title: 'They get it at the door',
      body: 'Your family gets a text when the driver is on the way. At the door we take a photo and email it to you.',
      photo: 'homeStepToDoor',
    },
  ]
  const link = (
    <Link href="/how-it-works" className={lightLink}>
      See the full journey
    </Link>
  )

  return (
    <section aria-labelledby="steps-title" className="section">
      <div className="mx-auto max-w-page gutter">
        <SectionHeader
          id="steps-title"
          title="From your phone to their door"
          lead="Four steps, and you see each one happen."
          action={<div className="hidden lg:block">{link}</div>}
        />
        <ol className="mt-8 grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:mt-12 lg:grid-cols-4 xl:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[6rem_1fr] items-start gap-4 md:flex md:flex-col"
            >
              <StockPhoto
                name={step.photo}
                position={step.position}
                sizes="(min-width: 1024px) 270px, (min-width: 768px) 45vw, 96px"
                className="aspect-square rounded-md md:aspect-4/3 md:w-full md:rounded-lg"
              />
              <div>
                <h3 className="inline-flex items-center gap-3 text-h3 text-ink">
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-crimson text-small font-bold text-on-dark tabular-nums"
                  >
                    {i + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-small text-ink-body md:text-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 lg:hidden">{link}</div>
      </div>
    </section>
  )
}
