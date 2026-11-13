import { Camera, CreditCard, ShoppingBasket, Store, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type Step = { icon: LucideIcon; title: string; body: string }

const lanes: { label: string; tone: 'you' | 'us'; steps: Step[] }[] = [
  {
    label: 'You, overseas',
    tone: 'you',
    steps: [
      {
        icon: ShoppingBasket,
        title: 'Fill a basket',
        body: 'Pick groceries, household, pharmacy or baby items, or take a ready-made basket.',
      },
      {
        icon: CreditCard,
        title: 'Pay in US dollars',
        body: 'Tell us who it is for and where they live. You see the full total before you pay.',
      },
    ],
  },
  {
    label: 'ShipEast, in Jamaica',
    tone: 'us',
    steps: [
      {
        icon: Store,
        title: 'We shop in Jamaica',
        body: 'A ShipEast driver buys your list at a store in Jamaica and photographs the till receipt.',
      },
      {
        icon: Camera,
        title: 'Delivered, with proof',
        body: 'Your family gets a text, then the bags. You get the photo at the door by email.',
      },
    ],
  },
]

/**
 * How it works (PLAN §3, row 8): four steps in two lanes, so it is plain which half is yours
 * and which half happens in Jamaica. Numbers, because this is a real sequence.
 */
export function HomeSteps({ payLine }: { payLine: string }) {
  return (
    <section aria-labelledby="home-steps" className="mx-auto max-w-wide gutter py-14 md:py-20">
      <div className="max-w-2xl">
        <h2 id="home-steps" className="font-display text-h2">
          From your phone to their door
        </h2>
        <p className="mt-2 text-ink-body">Four steps. Pay with {payLine}.</p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {lanes.map((lane, laneIndex) => (
          <div
            key={lane.label}
            className={cn(
              'flex flex-col rounded-3xl p-5 sm:p-7',
              lane.tone === 'you' ? 'bg-surface-selected' : 'bg-leaf-soft',
            )}
          >
            <p
              className={cn(
                'self-start rounded-full px-4 py-1.5 text-small font-bold text-on-dark',
                lane.tone === 'you' ? 'bg-crimson' : 'bg-leaf',
              )}
            >
              {lane.label}
            </p>
            <ol start={laneIndex * 2 + 1} className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
              {lane.steps.map((s, i) => {
                const n = laneIndex * 2 + i + 1
                return (
                  <li key={s.title} className="flex flex-col rounded-2xl bg-surface p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'font-display text-numeral',
                          lane.tone === 'you' ? 'text-crimson' : 'text-leaf',
                        )}
                        aria-hidden
                      >
                        {n}
                      </span>
                      <s.icon className="size-8 text-ink" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-title text-ink">
                      <span className="sr-only">Step {n}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-2 text-ink-body">{s.body}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
