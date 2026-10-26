import { CalendarClock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { PhotoHero } from '@/components/pages/company/photo-hero'
import { Steps } from '@/components/pages/company/steps'
import { BasketCard } from '@/components/shop/product-card'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { getBaskets, getSettings } from '@/lib/data/site'
import type { StockPhotoKey } from '@/lib/stock-photos'

export const metadata: Metadata = {
  title: 'Gifts and occasions',
  description:
    'Christmas hampers, birthdays, back to school and new baby baskets, delivered with a printed gift message.',
}

const occasions: { photo: StockPhotoKey; title: string; body: string }[] = [
  {
    photo: 'giftChristmas',
    title: 'Christmas',
    body: 'Hampers with festive staples. Order early for the week before Christmas.',
  },
  {
    photo: 'giftBirthday',
    title: 'Birthdays',
    body: 'Add their favourites and a gift message for the day.',
  },
  {
    photo: 'giftSchool',
    title: 'Back to school',
    body: 'Lunch-box snacks and household basics for the new term.',
  },
  {
    photo: 'giftBaby',
    title: 'New baby',
    body: 'Diapers, wipes and formula, so the new parents can rest.',
  },
]

const messageSteps = [
  {
    title: 'Add a message at checkout',
    body: 'Write a few lines in the gift message box when you pay. Sign it however they know you.',
  },
  {
    title: 'We print it and hand it over',
    body: 'Your message is printed and handed over at the door, with the order.',
  },
  {
    title: 'You get the door photo',
    body: 'The photo at the door goes on your tracking link, so you see the moment it arrived.',
  },
]

export default async function GiftsPage() {
  const [settings, baskets] = await Promise.all([
    getSettings(),
    getBaskets({ occasion: ['christmas', 'baby', 'school'] }),
  ])

  return (
    <>
      <PhotoHero
        eyebrow="Gifts"
        title="Gifts and occasions"
        photo="companyGiftHands"
        lead="A basket at the door, with your own message printed and handed over."
        actions={
          <>
            <ButtonLink href="/shop" variant="onDark" size="lg">
              Start shopping
            </ButtonLink>
            {baskets.length > 0 && (
              <ButtonLink
                href="#gift-baskets"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-crimson-700"
              >
                See gift baskets
              </ButtonLink>
            )}
          </>
        }
      />

      <Section aria-labelledby="occasions-h" wide>
        <SectionHeader
          eyebrow="Occasions"
          id="occasions-h"
          title="For the days you wish you were home"
        />
        <Stagger className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {occasions.map(({ photo, title, body }) => (
            <StaggerItem key={title} className="flex flex-col gap-4">
              <StockPhoto
                name={photo}
                sizes="(min-width: 1280px) 616px, (min-width: 640px) 50vw, 100vw"
                className="aspect-4/3 rounded-2xl"
              />
              <div>
                <h3 className="text-h2 text-ink">{title}</h3>
                <p className="mt-2 max-w-md text-lead text-ink-body">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {baskets.length > 0 && (
        <Section tone="surface" wide id="gift-baskets" aria-labelledby="gift-baskets-h">
          <SectionHeader
            eyebrow="Ready-made"
            id="gift-baskets-h"
            title="Baskets for the occasion"
            lead="Put together for you. Open one to see every item, then add your message at checkout."
            action={
              <Link
                href="/baskets"
                className="inline-flex min-h-11 items-center font-semibold text-crimson hover:underline"
              >
                See all baskets
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {baskets.map(({ basket, itemCount, separateCents }) => (
              <BasketCard
                key={basket.id}
                basket={basket}
                jmdPerUsd={settings.jmdPerUsd}
                itemCount={itemCount}
                separateCents={separateCents}
              />
            ))}
          </div>
        </Section>
      )}

      <Section tone={baskets.length > 0 ? 'canvas' : 'tint'} wide aria-labelledby="message-h">
        <PhotoFeature photo="companyGiftCard" side="end">
          <p className="mb-3 eyebrow text-crimson">Gift message</p>
          <h2 id="message-h" className="text-h2 text-balance text-ink">
            Your words, at their door
          </h2>
          <p className="mt-3 mb-8 text-lead text-ink-body">
            Any order can carry a gift message, not only baskets.
          </p>
          <Steps steps={messageSteps} compact />
        </PhotoFeature>
      </Section>

      <Section tone="oxblood" size="sm" aria-labelledby="christmas-h">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-crimson-800 text-blush">
              <CalendarClock className="size-7" aria-hidden />
            </span>
            <div className="max-w-2xl">
              <h2 id="christmas-h" className="text-h3 text-white">
                Sending for Christmas? Order early.
              </h2>
              <p className="mt-2 text-on-crimson-muted">
                Stores in Jamaica get busy in the week before Christmas. Order a few days ahead so
                the hamper is there in good time.
              </p>
            </div>
          </div>
          <ButtonLink href="/baskets" variant="onDark">
            See the baskets
          </ButtonLink>
        </div>
      </Section>

      <CtaBand
        title="Make their day from wherever you are"
        photo="basketChristmas"
        secondary={{ href: '/how-it-works', label: 'How it works' }}
      >
        Fill a basket in US dollars, add your message, and we deliver it in St. Thomas or Kingston.
      </CtaBand>
    </>
  )
}
