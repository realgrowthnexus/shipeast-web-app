import { DollarSign, MessageSquareText, PackageX } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { HomeHero } from '@/components/pages/home/hero'
import { PhotoCardLink } from '@/components/pages/home/photo-card'
import { ProofBand } from '@/components/pages/home/proof-band'
import { HomeSteps } from '@/components/pages/home/steps'
import { SwapChoices } from '@/components/pages/home/swaps'
import { HomeZones } from '@/components/pages/home/zones'
import { BasketCard } from '@/components/shop/product-card'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { PromiseTicker } from '@/components/site/promise-ticker'
import { Section, SectionHeader } from '@/components/site/section'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { getActiveZones, getBaskets, getCategories, getFaqs, getSettings } from '@/lib/data/site'
import { formatClockTime } from '@/lib/format'
import { categoryPhotos, type StockPhotoKey } from '@/lib/stock-photos'

const abroad = [
  {
    icon: DollarSign,
    title: 'Pay in US dollars',
    body: 'By PayPal, debit or credit card through PayPal, or bank transfer. You see the full total before you pay.',
  },
  {
    icon: PackageX,
    title: 'No barrels, no waiting weeks',
    body: 'Nothing is shipped. We buy everything in Jamaica, so it can be at their door the same day.',
  },
  {
    icon: MessageSquareText,
    title: 'Your family installs nothing',
    body: 'They get a text when the driver is on the way and when it’s delivered. You get email and a tracking link.',
  },
]

const occasions: { photo: StockPhotoKey; title: string; body: string }[] = [
  {
    photo: 'giftChristmas',
    title: 'Christmas',
    body: 'Hampers with festive staples, at their door for the holidays.',
  },
  {
    photo: 'giftBirthday',
    title: 'Birthdays',
    body: 'Their favourites and a printed gift message for the day.',
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

const linkClass = 'inline-flex min-h-11 items-center font-semibold text-crimson hover:underline'

export default async function HomePage() {
  const [settings, zones, categories, baskets, faqs] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
    getBaskets({ featured: true }),
    getFaqs(),
  ])
  const parishes = zones.map((z) => z.parish).join(' and ')
  const cutoff = formatClockTime(zones[0]?.cutoffTime ?? '13:00')

  return (
    <>
      {/* 1. Hero (crimson) */}
      <HomeHero parishes={parishes} />

      {/* 2. The promises every order carries (oxblood) */}
      <PromiseTicker />

      {/* 3. How it works (canvas) */}
      <Section wide aria-labelledby="how-h">
        <SectionHeader
          id="how-h"
          eyebrow="Four steps"
          title="How it works"
          lead="You order from wherever you are. We do the shopping and the driving in Jamaica."
          action={
            <Link href="/how-it-works" className={linkClass}>
              The full journey of an order
            </Link>
          }
        />
        <HomeSteps />
      </Section>

      {/* 4. Shop by category (surface) */}
      <Section tone="surface" wide aria-labelledby="cat-h">
        <SectionHeader
          id="cat-h"
          eyebrow="The shop"
          title="What we can buy for them"
          lead="Everyday needs from the store shelf, priced in US dollars."
          action={
            <Link href="/shop" className={linkClass}>
              See the whole shop
            </Link>
          }
        />
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => (
            <StaggerItem key={c.id}>
              <PhotoCardLink
                href={`/shop/${c.slug}`}
                photo={categoryPhotos[c.slug]}
                title={c.name}
                body={c.description}
                meta={`${c.count} items`}
                aspect="aspect-4/3 lg:aspect-4/5"
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 100vw"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 5. Ready-made baskets (tint) */}
      <Section tone="tint" wide aria-labelledby="bsk-h">
        <SectionHeader
          id="bsk-h"
          eyebrow="Save on bundles"
          title="Ready-made baskets"
          lead="Packed for the usual needs, for less than buying each item on its own."
          action={
            <Link href="/baskets" className={linkClass}>
              See all baskets
            </Link>
          }
        />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {baskets.slice(0, 3).map(({ basket, itemCount, separateCents }) => (
            <StaggerItem key={basket.id} className="flex [&>article]:flex-1">
              <BasketCard
                basket={basket}
                jmdPerUsd={settings.jmdPerUsd}
                itemCount={itemCount}
                separateCents={separateCents}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 6. Proof on every order (crimson) */}
      <ProofBand />

      {/* 7. You decide on swaps (canvas) */}
      <Section wide aria-labelledby="swap-h">
        <SectionHeader
          id="swap-h"
          eyebrow="If something is out of stock"
          title="You decide on swaps"
          lead="Shelves run out sometimes. Pick what we do at checkout, and we stick to it."
        />
        <SwapChoices />
      </Section>

      {/* 8. Made for Jamaicans abroad (surface) */}
      <Section tone="surface" wide aria-labelledby="abroad-h">
        <PhotoFeature photo="homeSenderPhone" parallax aspect="aspect-4/3 lg:aspect-4/5">
          <p className="mb-3 eyebrow text-crimson">From wherever you are</p>
          <h2 id="abroad-h" className="text-h2 text-balance text-ink">
            Made for Jamaicans abroad
          </h2>
          <p className="mt-3 max-w-2xl text-lead text-ink-body">
            Looking after family back home shouldn’t mean sending cash and hoping. Order from your
            phone in a few minutes and see it arrive.
          </p>
          <ul className="mt-8 grid gap-6">
            {abroad.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-tint">
                  <Icon className="size-6 text-crimson" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{title}</h3>
                  <p className="mt-1 text-ink-body">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/shop" size="lg" className="mt-9">
            Start shopping
          </ButtonLink>
        </PhotoFeature>
      </Section>

      {/* 9. Where we deliver (oxblood) */}
      <HomeZones zones={zones} />

      {/* 10. Gifts and occasions (canvas) */}
      <Section wide aria-labelledby="gift-h">
        <SectionHeader
          id="gift-h"
          eyebrow="Gifts and occasions"
          title="For the days that matter"
          lead="Send a basket for a birthday, the holidays or a new arrival, with a gift message."
          action={
            <Link href="/gifts" className={linkClass}>
              See gift ideas
            </Link>
          }
        />
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {occasions.map((o) => (
            <StaggerItem key={o.title}>
              <PhotoCardLink
                href="/gifts"
                photo={o.photo}
                title={o.title}
                body={o.body}
                meta="Gift ideas"
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 100vw"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 11. Questions people ask (surface) */}
      <Section tone="surface" aria-labelledby="faq-h">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="faq-h"
              eyebrow="Good to know"
              title="Questions people ask"
              lead="The short answers. There’s more on the questions page."
            />
            <Link href="/faq" className={`mt-4 ${linkClass}`}>
              All questions and answers
            </Link>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Accordion
              items={faqs.slice(0, 5).map((f) => ({ id: f.id, title: f.question, body: f.answer }))}
            />
          </Reveal>
        </div>
      </Section>

      {/* 12. Closing call to action (crimson panel on canvas) */}
      <CtaBand
        title={<>Order before {cutoff} and it’s at their door today.</>}
        photo="homeDoorWelcome"
        secondary={{ href: '/how-it-works', label: 'How it works' }}
      >
        Same-day delivery in {parishes}, with a photo of the receipt and a photo at the door.
      </CtaBand>
    </>
  )
}
