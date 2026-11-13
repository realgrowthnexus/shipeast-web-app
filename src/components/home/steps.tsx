import { Camera, CreditCard, ShoppingBasket, Store, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
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
    <section aria-labelledby="home-steps" className="mx-auto max-w-wide gutter py-10 md:py-12">
      <Reveal y={0} className="max-w-2xl">
        <h2 id="home-steps" className="font-display text-title font-semibold">
          From your phone to their door
        </h2>
        <p className="mt-1 text-small text-ink-body">Four steps. Pay with {payLine}.</p>
      </Reveal>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {lanes.map((lane, laneIndex) => (
          <Reveal key={lane.label} className="flex flex-col">
            <p
              className={cn(
                'self-start rounded-full px-4 py-1.5 text-small font-semibold text-on-dark',
                lane.tone === 'you' ? 'bg-crimson' : 'bg-leaf',
              )}
            >
              {lane.label}
            </p>
            <ol start={laneIndex * 2 + 1} className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
              {lane.steps.map((s, i) => {
                const n = laneIndex * 2 + i + 1
                return (
                  <li
                    key={s.title}
                    className="flex flex-col rounded-lg border border-line bg-surface p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'font-display text-h2 font-semibold',
                          lane.tone === 'you' ? 'text-crimson' : 'text-leaf',
                        )}
                        aria-hidden
                      >
                        {n}
                      </span>
                      <s.icon className="size-6 text-ink" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="mt-3 font-display text-lead font-semibold text-ink">
                      <span className="sr-only">Step {n}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-small text-ink-body">{s.body}</p>
                  </li>
                )
              })}
            </ol>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
