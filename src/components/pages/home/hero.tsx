import { ArrowRight, Camera, Clock3, Receipt } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { FlagStripe, JamaicaFlag } from '@/components/site/jamaica'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'

const chips = [
  { icon: Receipt, text: 'Receipt photo' },
  { icon: Camera, text: 'Photo at the door' },
  { icon: Clock3, text: 'Same day' },
]

/**
 * The home hero, laid out like a store front: one big crimson banner with the promise, and two
 * deal tiles beside it. CSS entrances only, so nothing waits for JavaScript.
 */
export function HomeHero({ parishes }: { parishes: string }) {
  return (
    <section className="pt-4 pb-10 sm:pt-6 sm:pb-14">
      <div className="mx-auto grid w-full max-w-wide gap-4 gutter lg:gap-5">
        {/* Main banner */}
        <div className="relative grid animate-rise overflow-hidden rounded-2xl bg-crimson text-white md:grid-cols-12">
          <div className="flex flex-col items-start p-card-lg sm:p-10 md:col-span-7 lg:p-14">
            <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-crimson-800 py-2 pr-4 pl-2.5 eyebrow">
              <JamaicaFlag className="w-7" />
              Delivering to {parishes} today
            </p>
            <h1 className="text-display text-balance">Send groceries, not money</h1>
            <p className="mt-5 max-w-md text-lead text-on-crimson-muted">
              Fill a basket online and pay in US dollars. We shop in Jamaica and deliver to your
              family’s door the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" variant="onDark" size="lg">
                Start shopping
              </ButtonLink>
              <ButtonLink
                href="/how-it-works"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-crimson-700"
              >
                How it works
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {chips.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex min-h-9 items-center gap-2 rounded-full bg-crimson-700 px-4 text-small"
                >
                  <Icon className="size-4 text-blush" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <StockPhoto
            name="heroGroceries"
            preload
            sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
            className="aspect-2/1 rounded-none md:col-span-5 md:aspect-auto md:h-full"
          />
          <FlagStripe className="h-1.5 md:col-span-12" />
        </div>

        {/* Three deal tiles */}
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:gap-5">
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
            tone="oxblood"
            delay="[animation-delay:200ms]"
          />
          <DealTile
            href="/monthly"
            photo="pantry"
            eyebrow="Sending every month?"
            title="Send it again"
            body="Save their address once and reorder in one tap."
            tone="tint"
            delay="[animation-delay:280ms]"
          />
        </div>
      </div>
    </section>
  )
}

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
  eyebrow: ReactNode
  title: string
  body: string
  tone: 'gold' | 'oxblood' | 'tint'
  delay: string
}) {
  const dark = tone === 'oxblood'
  return (
    <Link
      href={href}
      className={cn(
        'group grid w-[85%] shrink-0 hover-lift animate-rise snap-start grid-cols-5 overflow-hidden rounded-2xl sm:w-auto',
        {
          gold: 'bg-jm-gold text-ink',
          oxblood: 'bg-oxblood text-white',
          tint: 'bg-surface-tint text-ink',
        }[tone],
        delay,
      )}
    >
      <span className="col-span-3 flex flex-col p-card">
        <span
          className={cn(
            'eyebrow',
            dark ? 'text-jm-gold' : tone === 'gold' ? 'text-ink' : 'text-crimson',
          )}
        >
          {eyebrow}
        </span>
        <span className="mt-2 text-h3">{title}</span>
        <span className={cn('mt-1 text-small', dark ? 'text-on-oxblood-muted' : 'text-ink-body')}>
          {body}
        </span>
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-small font-bold">
          Shop now
          <ArrowRight
            className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </span>
      <StockPhoto
        name={photo}
        sizes="(min-width: 1280px) 160px, (min-width: 768px) 13vw, 40vw"
        className="col-span-2 h-full min-h-44 rounded-none"
        zoom
      />
    </Link>
  )
}
