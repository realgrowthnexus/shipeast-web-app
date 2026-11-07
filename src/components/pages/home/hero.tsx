import Link from 'next/link'
import { onDarkLink } from '@/components/site/links'
import { CutoffNote } from '@/components/site/cutoff-note'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import type { Receipt } from '@/lib/home'
import { HeroReceipt } from './hero-receipt'

/**
 * S1 "The receipt lands at home": a centred statement on solid crimson (band A), then a
 * full-bleed photo of home with no overlay and no text (band B). The example receipt straddles
 * the seam at the left, so it reads as printed in Jamaica and landing with the family. Two
 * stacked bands, never columns. On a phone the headline is painted first.
 */
export function HomeHero({
  parishList,
  earliestCutoff,
  receipt,
}: {
  parishList: string
  earliestCutoff: string | null
  receipt: Receipt | null
}) {
  return (
    <section aria-labelledby="hero-title" className="text-on-dark on-dark-focus">
      <div className="bg-crimson pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-20">
        <div className="mx-auto max-w-page gutter text-center">
          <h1 id="hero-title" className="mx-auto max-w-4xl text-display text-balance">
            <span className="block">Groceries for home.</span>{' '}
            <span className="block">Proof for you.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-on-crimson-muted lg:mt-6">
            Fill a basket for your family in {parishList || 'Jamaica'} and pay in US dollars. Our
            driver buys everything in Jamaica, delivers it the same day, and sends you a photo of
            the till receipt and a photo at the door.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
              Start shopping
            </ButtonLink>
            <Link href="/baskets" className={`${onDarkLink} self-center`}>
              See ready-made baskets
            </Link>
          </div>
          {earliestCutoff && (
            <CutoffNote
              cutoff={earliestCutoff}
              tone="onDark"
              className="mx-auto mt-6 max-w-xl justify-center text-left lg:mt-8 lg:max-w-2xl"
            />
          )}
        </div>
      </div>

      <div className="relative">
        <StockPhoto
          name="familyPhone"
          preload
          sizes="100vw"
          imgClassName="object-[25%_30%] md:object-[50%_30%]"
          className="aspect-4/5 rounded-none md:aspect-video lg:aspect-[21/9] 2xl:aspect-[3/1]"
        />
        {receipt && (
          <div className="absolute inset-x-0 top-0 mx-auto max-w-wide gutter">
            <HeroReceipt
              receipt={receipt}
              className="relative z-raised -mt-16 w-52 md:-mt-24 md:w-64 lg:w-72 xl:w-80"
            />
          </div>
        )}
      </div>
    </section>
  )
}
