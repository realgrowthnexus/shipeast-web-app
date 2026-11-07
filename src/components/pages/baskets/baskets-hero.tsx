import { CutoffNote } from '@/components/site/cutoff-note'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import type { BasketRow } from '@/lib/baskets'
import { cn } from '@/lib/cn'
import { PriceBoard } from './price-board'

/**
 * S1 "Shop window and price board": a photo band under the flat oxblood overlay with the title
 * left-aligned on it, and the price board as a solid crimson panel overlapping the band's bottom
 * edge. Text and board share one left edge. The board is the product list, so it is the biggest
 * solid block on the page.
 */
export function BasketsHero({
  rows,
  jmdPerUsd,
  cutoff,
}: {
  rows: BasketRow[]
  jmdPerUsd: number
  cutoff: string | null
}) {
  const allSave = rows.length > 0 && rows.every((r) => r.savingCents > 0)
  return (
    <section aria-labelledby="baskets-title" className="on-dark-focus">
      <div
        className={cn(
          'relative isolate overflow-hidden bg-oxblood text-on-dark',
          rows.length ? 'pt-28 pb-28 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40' : 'pt-28 pb-16 lg:pt-24',
        )}
      >
        <StockPhoto
          name="shopChoosing"
          alt=""
          preload
          sizes="100vw"
          imgClassName="object-[60%_center] md:object-[55%_40%]"
          className="absolute inset-0 -z-10 rounded-none"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim" />
        <div className="mx-auto max-w-page gutter">
          <div className="max-w-2xl">
            <h1 id="baskets-title" className="text-h1 text-balance">
              Ready-made baskets for home
            </h1>
            <p className="mt-4 text-lead text-on-crimson-muted">
              {rows.length
                ? `Each one is packed around a real need and priced as one. Our driver buys every item in Jamaica on the day we deliver${allSave ? ', and each basket costs less than the same items bought one by one' : ''}.`
                : 'New baskets are on the way. In the meantime you can build your own from the shop.'}
            </p>
            {cutoff && <CutoffNote cutoff={cutoff} tone="onPhoto" className="mt-6" />}
            {!rows.length && (
              <ButtonLink href="/shop" variant="onDark" size="lg" className="mt-8">
                Shop single items
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
      {rows.length > 0 && (
        <div className="relative z-raised mx-auto -mt-16 max-w-page gutter md:-mt-20 lg:-mt-28">
          <div className="animate-rise rounded-2xl bg-crimson p-2 text-on-dark shadow-float [animation-delay:120ms] sm:p-4 lg:px-8 lg:py-4">
            <PriceBoard rows={rows} jmdPerUsd={jmdPerUsd} />
          </div>
        </div>
      )}
    </section>
  )
}
