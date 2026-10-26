import { ArrowRight, Camera, Clock3, MessageSquareText, Receipt } from 'lucide-react'
import Link from 'next/link'
import { FlagBadge } from '@/components/site/jamaica'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'

const chips = [
  { icon: Clock3, text: 'Same day' },
  { icon: Receipt, text: 'Receipt photo' },
  { icon: Camera, text: 'Photo at the door' },
]

/** What comes back with every order, for the card that sits on the photo. Facts only. */
const proof = [
  { icon: Receipt, text: 'Photo of the till receipt' },
  { icon: Camera, text: 'Photo at their door' },
  { icon: MessageSquareText, text: 'Texts to your family' },
]

/**
 * The home hero: a full-width blush band with the promise on the left and a photo running to the
 * right edge of the screen, then three deal tiles. CSS entrances only, so nothing waits for
 * JavaScript.
 */
export function HomeHero({ parishes }: { parishes: string }) {
  return (
    <>
      <section className="relative overflow-hidden bg-surface-tint">
        <div className="mx-auto grid w-full max-w-wide gutter lg:min-h-136 lg:grid-cols-12">
          <div className="flex animate-rise flex-col items-start py-12 sm:py-16 lg:col-span-6 lg:py-20 lg:pr-10">
            <FlagBadge className="mb-6">Delivering to {parishes} today</FlagBadge>
            <h1 className="text-display text-balance text-ink">
              Send groceries, <span className="text-crimson">not money</span>
            </h1>
            <p className="mt-5 max-w-lg text-lead text-ink-body">
              Fill a basket online and pay in US dollars. We shop in Jamaica and deliver to your
              family’s door the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="lg">
                Start shopping
                <ArrowRight aria-hidden />
              </ButtonLink>
              <ButtonLink href="/how-it-works" size="lg" variant="outline">
                How it works
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {chips.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex min-h-9 items-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-ink"
                >
                  <Icon className="size-4 text-crimson" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The photo: below the text on phones, the right half of the band on wide screens */}
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%]">
          <StockPhoto
            name="homeHeroBag"
            preload
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="aspect-4/3 rounded-none sm:aspect-video lg:aspect-auto lg:h-full"
          />
          <div className="absolute bottom-4 left-4 animate-rise rounded-lg bg-surface p-card shadow-float [animation-delay:200ms] sm:bottom-6 sm:left-6 lg:bottom-10 lg:-left-8 lg:max-w-xs">
            <p className="eyebrow text-crimson">With every order</p>
            <ul className="mt-3 grid gap-2.5">
              {proof.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-small font-semibold text-ink"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-tint">
                    <Icon className="size-4 text-crimson" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Three deal tiles */}
      <section aria-label="Deals" className="pt-6 pb-10 sm:pt-8 sm:pb-14">
        <div className="mx-auto flex max-w-wide snap-x scroll-px-4 gap-3 overflow-x-auto gutter pb-1 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
          <DealTile
            href="/baskets"
            photo="basketFood"
            eyebrow="Save on bundles"
            title="Ready-made baskets"
            body="Packed for the usual needs, for less than buying each item."
            tone="gold"
            delay="[animation-delay:120ms]"
          />
          <DealTile
            href="/gifts"
            photo="giftChristmas"
            eyebrow="Gifts and occasions"
            title="Gifts for home"
            body="Hampers for Christmas, birthdays and new babies."
            tone="crimson"
            delay="[animation-delay:200ms]"
          />
          <DealTile
            href="/monthly"
            photo="pantry"
            eyebrow="Sending every month?"
            title="Send it again"
            body="Save their address once and reorder in one tap."
            tone="oxblood"
            delay="[animation-delay:280ms]"
          />
        </div>
      </section>
    </>
  )
}

const tileTones = {
  gold: {
    tile: 'bg-jm-gold text-ink',
    eyebrow: 'text-ink',
    body: 'text-ink-body',
    arrow: 'bg-ink text-jm-gold',
  },
  crimson: {
    tile: 'bg-crimson text-white',
    eyebrow: 'text-blush',
    body: 'text-on-crimson-muted',
    arrow: 'bg-white text-crimson',
  },
  oxblood: {
    tile: 'bg-oxblood text-white',
    eyebrow: 'text-jm-gold',
    body: 'text-on-oxblood-muted',
    arrow: 'bg-jm-gold text-ink',
  },
} as const

function DealTile({
  href,
  photo,
  eyebrow,
  title,
  body,
  tone,
  delay,
}: {
  href: string
  photo: StockPhotoKey
  eyebrow: string
  title: string
  body: string
  tone: keyof typeof tileTones
  delay: string
}) {
  const t = tileTones[tone]
  return (
    <Link
      href={href}
      className={cn(
        'group flex w-[85%] shrink-0 hover-lift animate-rise snap-start gap-4 rounded-2xl p-3 sm:w-[55%] lg:w-auto',
        t.tile,
        delay,
      )}
    >
      <span className="flex flex-1 flex-col py-2 pl-2">
        <span className={cn('eyebrow', t.eyebrow)}>{eyebrow}</span>
        <span className="mt-2 text-h3">{title}</span>
        <span className={cn('mt-1 text-small', t.body)}>{body}</span>
        <span className="mt-auto flex items-center gap-2 pt-4 text-small font-bold">
          <span
            className={cn(
              'grid size-9 place-items-center rounded-full transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none',
              t.arrow,
            )}
          >
            <ArrowRight className="size-4" aria-hidden />
          </span>
          Shop now
        </span>
      </span>
      <StockPhoto
        name={photo}
        sizes="(min-width: 1280px) 150px, (min-width: 1024px) 12vw, (min-width: 640px) 22vw, 35vw"
        className="w-[40%] shrink-0 self-stretch rounded-xl"
        zoom
      />
    </Link>
  )
}
