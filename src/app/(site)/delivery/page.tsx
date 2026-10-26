import {
  Camera,
  Check,
  Clock3,
  DoorOpen,
  Landmark,
  MapPin,
  MessageSquareText,
  Phone,
  ShoppingBasket,
  Truck,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { FaqList } from '@/components/pages/guide/faq-list'
import { GuideHero } from '@/components/pages/guide/guide-hero'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { Alert } from '@/components/ui/alert'
import { getFaqs, getZones } from '@/lib/data/site'
import { formatClockTime, formatUsd } from '@/lib/format'
import type { DeliveryZone } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Delivery areas and fees',
  description:
    'Where ShipEast delivers in Jamaica, the delivery fee for each parish and same-day cut-off times.',
}

const speedLabel: Record<DeliveryZone['speed'], string> = {
  same_day: 'Same day',
  next_day: 'Next day',
  scheduled: 'Scheduled runs',
}

const speedRule: Record<DeliveryZone['speed'], string> = {
  same_day: 'Same day if paid by',
  next_day: 'Next day if paid by',
  scheduled: 'Next run if paid by',
}

const tips = [
  {
    icon: Landmark,
    title: 'A nearby landmark',
    body: 'Give the street, community and parish, plus something the driver can see, like “blue gate opposite the church”.',
  },
  {
    icon: Phone,
    title: 'A phone that answers',
    body: (
      <>
        The driver calls when they are close. Give a number your family picks up, written like{' '}
        <span className="whitespace-nowrap">1-876-123-1234</span>.
      </>
    ),
  },
  {
    icon: DoorOpen,
    title: 'Someone at home',
    body: 'Let your family know it is coming. If nobody is home, the driver calls and waits, then we contact you to arrange another try.',
  },
]

function joinParishes(names: string[]) {
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}

export default async function DeliveryPage() {
  const [zones, faqs] = await Promise.all([getZones(), getFaqs()])
  const active = zones.filter((z) => z.active)
  const soon = zones.filter((z) => !z.active)
  const deliveryFaqs = faqs.filter((f) => f.group === 'Delivery')
  const cutoffs = [...new Set(active.map((z) => z.cutoffTime))]
  const cutoffText =
    cutoffs.length === 1 ? formatClockTime(cutoffs[0]) : 'your parish’s cut-off time'

  const day = [
    {
      icon: Clock3,
      title: `Pay by ${cutoffText}`,
      body: 'Orders paid before the cut-off go out the same day. Bank transfer orders are scheduled once the money arrives.',
    },
    {
      icon: ShoppingBasket,
      title: 'The driver shops',
      body: 'Our driver buys your list at a local store and sends you a photo of the till receipt.',
    },
    {
      icon: Truck,
      title: 'On the way',
      body: 'Your family gets a text with the driver’s name, so someone is ready to meet them.',
    },
    {
      icon: Camera,
      title: 'Photo at the door',
      body: 'The order is handed over and photographed. You see the photo and who received it.',
    },
  ]

  return (
    <>
      <GuideHero
        eyebrow="Delivery"
        title="Delivery areas and fees"
        photo="blueMountains"
        lead={
          active.length > 0 ? (
            <>
              We deliver in {joinParishes(active.map((z) => z.parish))} today, to the door, with a
              photo when it arrives. Fees are per order, not per item.
            </>
          ) : (
            'We are not taking deliveries right now. Check back soon, or message us to ask when your area opens.'
          )
        }
      />

      <Section wide aria-labelledby="zones-h">
        <SectionHeader
          id="zones-h"
          eyebrow="Where we deliver"
          title="Fees and cut-off times"
          lead="One fee per order, however many items are in the basket. Pay before the cut-off and the order arrives the same day."
        />
        {active.length === 0 ? (
          <Alert tone="warn" title="We are not taking deliveries right now" className="mt-10">
            Check back soon, or message us to ask when your area opens.
          </Alert>
        ) : (
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-6">
            {active.map((z) => (
              <StaggerItem
                key={z.id}
                className="flex flex-col rounded-xl border border-line bg-surface p-card-lg sm:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="flex items-center gap-2 text-h2 text-ink">
                    <MapPin className="size-7 shrink-0 text-crimson" aria-hidden />
                    {z.parish}
                  </h3>
                  <span className="rounded-full bg-surface-tint px-3 py-1 text-small font-semibold text-crimson-deep">
                    {speedLabel[z.speed]}
                  </span>
                </div>
                <p className="mt-8 text-small text-ink-muted">Delivery fee</p>
                <p className="text-numeral text-ink tabular-nums">{formatUsd(z.feeCents)}</p>
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
                  <div>
                    <dt className="text-small text-ink-muted">{speedRule[z.speed]}</dt>
                    <dd className="mt-1 text-h3 text-ink tabular-nums">
                      {formatClockTime(z.cutoffTime)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-small text-ink-muted">Minimum order</dt>
                    <dd className="mt-1 text-h3 text-ink tabular-nums">
                      {formatUsd(z.minOrderCents)}
                    </dd>
                  </div>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>

      {active.length > 0 && (
        <Section tone="oxblood" wide aria-labelledby="day-h">
          <SectionHeader
            id="day-h"
            onDark
            eyebrow="A delivery day"
            title="From your order to their door"
            lead="What happens after you pay, and what your family sees."
          />
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {day.map((s, i) => (
              <StaggerItem
                key={s.title}
                className="flex flex-col gap-4 rounded-xl bg-crimson-800 p-card-lg"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="size-7 text-blush" aria-hidden />
                  <span className="text-h2 text-blush tabular-nums" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-h3 text-white">{s.title}</h3>
                <p className="text-on-crimson-muted">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section size="lg" wide aria-labelledby="tips-h">
        <PhotoFeature photo="kingstonStreet" aspect="aspect-4/3 sm:aspect-video lg:aspect-4/5">
          <p className="mb-3 eyebrow text-crimson">Before you check out</p>
          <h2 id="tips-h" className="text-h2 text-balance text-ink">
            Three things that make delivery easy
          </h2>
          <ul className="mt-8 flex flex-col gap-6">
            {tips.map((t) => (
              <li key={t.title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-tint">
                  <t.icon className="size-6 text-crimson" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{t.title}</h3>
                  <p className="mt-1 text-ink-body">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-col gap-2 border-t border-line pt-6">
            {[
              'Every delivery ends with a photo at the door and the name of who received it.',
              'Your family gets a text when the driver sets off, and another when it is delivered.',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-ink-body">
                <Check className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/legal/delivery"
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-crimson hover:underline"
          >
            Read the delivery policy
          </Link>
        </PhotoFeature>
      </Section>

      {soon.length > 0 && (
        <Section tone="surface" wide aria-labelledby="soon-h">
          <SectionHeader
            id="soon-h"
            eyebrow="Coming later"
            title="More parishes as we add drivers"
            lead="We don’t deliver to these parishes yet. Message us if you need one of them, and we’ll tell you when it opens."
          />
          <Stagger className="mt-8 flex flex-wrap gap-2">
            {soon.map((z) => (
              <StaggerItem
                key={z.id}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-canvas px-4 text-ink"
              >
                <MapPin className="size-4 text-ink-muted" aria-hidden />
                {z.parish}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8" delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-crimson hover:underline"
            >
              <MessageSquareText className="size-5" aria-hidden />
              Ask about your parish
            </Link>
          </Reveal>
        </Section>
      )}

      {deliveryFaqs.length > 0 && (
        <Section tone={soon.length > 0 ? 'canvas' : 'tint'} wide aria-labelledby="dfaq-h">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader id="dfaq-h" eyebrow="Questions" title="About delivery" />
              <Reveal className="mt-6" delay={0.1}>
                <Link
                  href="/faq#delivery"
                  className="inline-flex min-h-11 items-center font-semibold text-crimson hover:underline"
                >
                  See all questions
                </Link>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <FaqList faqs={deliveryFaqs} />
            </Reveal>
          </div>
        </Section>
      )}

      <CtaBand
        title="Send a basket home today"
        photo="guideKitchen"
        secondary={{ href: '/how-it-works', label: 'How it works' }}
      >
        Fill the basket in US dollars, and our driver does the shopping and the delivery.
      </CtaBand>
    </>
  )
}
