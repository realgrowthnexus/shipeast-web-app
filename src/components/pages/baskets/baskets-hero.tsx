import { CutoffNote } from '@/components/site/cutoff-note'
import { ButtonLink } from '@/components/ui/button'
import type { BasketRow } from '@/lib/baskets'
import { PriceBoard } from './price-board'

/** S1: the title beside the price board, on solid crimson. No photo: the board is the picture. */
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
    <section
      aria-labelledby="baskets-title"
      className="bg-crimson section text-on-dark on-dark-focus"
    >
      <div className="mx-auto max-w-wide gutter lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-4">
          <h1 id="baskets-title" className="animate-rise text-h1 text-balance">
            Ready-made baskets for home
          </h1>
          <p className="mt-4 max-w-2xl animate-rise text-lead text-on-crimson-muted [animation-delay:80ms]">
            {rows.length
              ? `Each one is packed around a real need and priced as one. Our driver buys every item in Jamaica on the day we deliver${allSave ? ', and each basket costs less than the same items bought one by one' : ''}.`
              : 'New baskets are on the way. In the meantime you can build your own from the shop.'}
          </p>
          {cutoff && <CutoffNote cutoff={cutoff} tone="onDark" className="mt-6" />}
          {!rows.length && (
            <ButtonLink href="/shop" variant="onDark" size="lg" className="mt-8">
              Shop single items
            </ButtonLink>
          )}
        </div>
        {rows.length > 0 && (
          <div className="mt-10 lg:col-span-8 lg:mt-0">
            <PriceBoard rows={rows} jmdPerUsd={jmdPerUsd} />
          </div>
        )}
      </div>
    </section>
  )
}
