import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { StockPhoto } from '@/components/site/stock-photo'
import type { StockPhotoKey } from '@/lib/stock-photos'

const steps: { title: string; body: string; photo: StockPhotoKey }[] = [
  {
    title: 'Fill a basket',
    photo: 'stepOrder',
    body: 'Pick groceries, household, pharmacy and baby items, or a ready-made basket. Prices are in US dollars.',
  },
  {
    title: 'Tell us who it’s for',
    photo: 'stepFamily',
    body: 'Add your family member’s address, phone and a nearby landmark, and choose what we do if something is out of stock.',
  },
  {
    title: 'We shop in Jamaica',
    photo: 'stepShop',
    body: 'Our driver buys everything at the store and sends you a photo of the receipt.',
  },
  {
    title: 'Delivered to the door',
    photo: 'stepDoor',
    body: 'Your family gets a text when we’re on the way. You get a photo at the door when it’s handed over.',
  },
]

/** Four numbered steps, joined by a thin line on wide screens. */
export function HomeSteps() {
  return (
    <div className="relative mt-12">
      <span aria-hidden className="absolute inset-x-6 top-6 hidden h-px bg-line-strong lg:block" />
      <Stagger as="ol" className="relative grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <StaggerItem key={step.title} className="flex flex-col">
            <span
              aria-hidden
              className="grid size-12 place-items-center rounded-full bg-crimson text-h3 text-white tabular-nums ring-8 ring-canvas"
            >
              {i + 1}
            </span>
            <StockPhoto
              name={step.photo}
              sizes="(min-width: 1280px) 290px, (min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
              className="mt-6 aspect-video rounded-xl sm:aspect-4/3"
            />
            <h3 className="mt-5 text-h3 text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-ink-body">{step.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
