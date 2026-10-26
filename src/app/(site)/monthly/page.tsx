import {
  CalendarClock,
  Camera,
  DollarSign,
  MessageSquareText,
  PauseCircle,
  Pencil,
  Repeat2,
} from 'lucide-react'
import type { Metadata } from 'next'
import { IconList } from '@/components/pages/company/icon-list'
import { PhotoHero } from '@/components/pages/company/photo-hero'
import { Steps } from '@/components/pages/company/steps'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { ButtonLink } from '@/components/ui/button'
import { getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Monthly orders',
  description:
    'Set up Mum’s basket once and send it again every month, or reorder any past order in one tap.',
}

/** True of every order, whether or not monthly orders are switched on. */
const benefits = [
  {
    icon: Camera,
    title: 'Proof every time',
    body: 'A photo of the store receipt and a photo at the door, on every delivery.',
  },
  {
    icon: DollarSign,
    title: 'Pay in US dollars',
    body: 'PayPal, a debit or credit card through PayPal, or a bank transfer.',
  },
  {
    icon: MessageSquareText,
    title: 'Nothing for them to install',
    body: 'Your family gets a text when the order is on its way. That’s all they need.',
  },
]

export default async function MonthlyPage() {
  const { features } = await getSettings()
  const monthly = features.monthly_orders

  const points = monthly
    ? [
        {
          icon: CalendarClock,
          title: 'Pick the day',
          body: 'Choose the date each month, and we charge and shop on that day.',
        },
        {
          icon: Pencil,
          title: 'Change it any time',
          body: 'Add or remove items, or change the address, before the next order.',
        },
        {
          icon: PauseCircle,
          title: 'Pause or stop',
          body: 'Skip a month, pause, or cancel whenever you like.',
        },
      ]
    : [
        {
          icon: Repeat2,
          title: 'Send it again in one tap',
          body: 'Every past order has a "Send this again" button with the same items and address.',
        },
        {
          icon: Pencil,
          title: 'Saved family addresses',
          body: 'Save Mum, Grandad and anyone else once, with their landmark and phone.',
        },
        {
          icon: CalendarClock,
          title: 'Same proof every time',
          body: 'Receipt photo and door photo on every order, so you know it arrived.',
        },
      ]

  return (
    <>
      <PhotoHero
        eyebrow="Monthly orders"
        title={monthly ? 'Set up their basket once' : 'Sending every month?'}
        photo="pantry"
        lead={
          monthly
            ? 'Choose the items once, pick a day, and we shop and deliver every month. Each delivery comes with the receipt photo and the door photo.'
            : 'Make it quick. With a free account, the next order is one tap.'
        }
        actions={
          <>
            <ButtonLink href="/baskets" variant="onDark" size="lg">
              Choose a basket
            </ButtonLink>
            <ButtonLink
              href="/signup"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-crimson-700"
            >
              Create a free account
            </ButtonLink>
          </>
        }
      />

      <Section aria-labelledby="steps-h">
        <SectionHeader
          eyebrow={monthly ? 'How it works' : 'With a free account'}
          id="steps-h"
          title={
            monthly ? 'Three steps, then it comes every month' : 'The next order takes a minute'
          }
        />
        <div className="mt-10">
          <Steps steps={points} />
        </div>
      </Section>

      <Section tone="oxblood" aria-labelledby="benefits-h">
        <SectionHeader
          onDark
          eyebrow="Every order"
          id="benefits-h"
          title="The same care, month after month"
        />
        <div className="mt-10">
          <IconList points={benefits} onDark />
        </div>
      </Section>

      <Section wide aria-labelledby="cupboard-h">
        <PhotoFeature photo="companyFamilyMeal" parallax>
          <p className="mb-3 eyebrow text-crimson">Why families send monthly</p>
          <h2 id="cupboard-h" className="text-h2 text-balance text-ink">
            The cupboard stays full
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-lead text-ink-body">
            <p>
              Rice, oil, soap and diapers run out on a schedule. Sending the same basket each month
              means nobody has to ask, and you know exactly what arrived.
            </p>
            <p>
              Start with one of our baskets, or fill your own from the shop and save the order for
              next time.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" variant="outline">
              Browse the shop
            </ButtonLink>
          </div>
        </PhotoFeature>
      </Section>

      <CtaBand
        title="Start their first basket"
        href="/baskets"
        label="Choose a basket"
        secondary={{ href: '/signup', label: 'Create a free account' }}
        photo="basketFood"
      >
        Pick the items once. Every delivery comes with the receipt photo and the door photo.
      </CtaBand>
    </>
  )
}
