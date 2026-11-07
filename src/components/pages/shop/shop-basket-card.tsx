import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { SavingTag } from '@/components/shop/saving-tag'
import { StockPhoto } from '@/components/site/stock-photo'
import { Price } from '@/components/ui/price'
import type { BasketSummary } from '@/lib/data/site'
import { basketPhotos } from '@/lib/stock-photos'

/** A compact horizontal basket card: the shop's one-tap shortcut above the shelves. */
export function ShopBasketCard({
  summary: { basket, itemCount, separateCents },
  jmdPerUsd,
  unavailable = false,
}: {
  summary: BasketSummary
  jmdPerUsd: number
  /** An item is out of stock, so the basket can't be ordered today: no Add button. */
  unavailable?: boolean
}) {
  const photo = basketPhotos[basket.slug]
  const saving = Math.max(0, separateCents - basket.priceCents)
  return (
    <article className="group relative grid hover-lift grid-cols-[6rem_1fr] gap-4 rounded-lg border border-line bg-surface p-3 has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-signal has-[a:focus-visible]:ring-offset-2 sm:grid-cols-[9rem_1fr] sm:p-4 xl:grid-cols-[8rem_1fr]">
      {photo ? (
        <StockPhoto
          name={photo}
          alt=""
          zoom
          sizes="(min-width: 640px) 144px, 96px"
          className="aspect-square rounded-md"
        />
      ) : (
        <div className="grid aspect-square place-items-center rounded-md bg-crimson text-blush">
          <ShoppingBasket className="size-8" aria-hidden />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-h3 text-ink">
          <Link
            href={`/baskets/${basket.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {basket.name}
          </Link>
        </h3>
        <p className="text-small text-ink-muted tabular-nums">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
            <Price cents={basket.priceCents} jmdPerUsd={jmdPerUsd} size="md" />
            {saving > 0 && <SavingTag cents={saving} className="mt-1" />}
          </div>
          {unavailable ? (
            <p className="text-small font-semibold text-ink-muted">Not available today</p>
          ) : (
            <div className="relative z-raised w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
              <AddToBasket kind="basket" id={basket.id} name={basket.name} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
