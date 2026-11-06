import Link from 'next/link'
import { CutoffNote } from '@/components/site/cutoff-note'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import type { Receipt } from '@/lib/home'
import { HeroReceipt } from './hero-receipt'

/** The hero's and closing panel's secondary link on crimson. */
export const onCrimsonLink =
  'inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-on-dark'

/**
 * S1: the promise on solid crimson, beside a warm photo with the example receipt straddling its
 * edge. Split, not a photo background: the receipt needs the crimson to read, and on a phone the
 * headline (not a darkened photo) is the first thing painted.
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
    <section
      aria-labelledby="hero-title"
      className="bg-crimson section-lg pb-12 text-on-dark on-dark-focus lg:section"
    >
      <div className="mx-auto max-w-wide gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12">
        <div className="max-w-2xl lg:col-span-6 lg:max-w-none xl:pr-8">
          <h1 id="hero-title" className="text-display text-balance">
            Groceries for home. Proof for you.
          </h1>
          <p className="mt-5 text-lead text-on-crimson-muted lg:mt-6">
            Fill a basket for your family in {parishList || 'Jamaica'} and pay in US dollars. Our
            driver buys everything in Jamaica, delivers it the same day, and sends you a photo of
            the till receipt and a photo at the door.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
              Start shopping
            </ButtonLink>
            <Link href="/baskets" className={`${onCrimsonLink} self-start sm:self-auto`}>
              See ready-made baskets
            </Link>
          </div>
          {earliestCutoff && (
            <CutoffNote cutoff={earliestCutoff} tone="onDark" className="mt-6 lg:mt-8" />
          )}
        </div>

        <div className="relative mt-10 lg:col-span-6 lg:mt-0">
          <StockPhoto
            name="familyPhone"
            preload
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
            className="aspect-4/3 rounded-xl md:aspect-16/9 lg:aspect-square lg:rounded-2xl"
          />
          {receipt && (
            <HeroReceipt
              receipt={receipt}
              className="relative z-raised -mt-28 mr-3 ml-auto w-60 md:-mt-36 md:mr-8 md:w-64 lg:absolute lg:-bottom-8 lg:-left-6 lg:m-0 lg:w-60 xl:bottom-12 xl:-left-20 xl:w-80"
            />
          )}
        </div>
      </div>
    </section>
  )
}
