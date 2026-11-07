import { Gift } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { SavingTag } from '@/components/shop/saving-tag'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import type { BasketRow as Row } from '@/lib/baskets'
import { occasionPhrases } from '@/lib/home'
import { basketPhotos } from '@/lib/stock-photos'
import { BasketItems } from './basket-items'
import { OccasionIcon } from './occasion-icon'

/**
 * One basket, readable without opening it: photo, who it is for, price and Add, then every item
 * and the totals. Phones read header → buy → items; from 768px the buy bar moves under the table
 * (it holds the only focusables after the name, so focus order still matches what is seen).
 */
export function BasketRowCard({ row, jmdPerUsd }: { row: Row; jmdPerUsd: number }) {
  const { basket } = row.summary
  const photo = basketPhotos[basket.slug]
  const nameId = `${basket.slug}-name`
  return (
    <article
      id={basket.slug}
      aria-labelledby={nameId}
      className="scroll-mt-header overflow-hidden rounded-xl border border-line bg-surface target:border-crimson target:ring-2 target:ring-crimson lg:grid lg:grid-cols-12"
    >
      {photo ? (
        <StockPhoto
          name={photo}
          sizes="(min-width: 1024px) 470px, (min-width: 768px) 720px, 100vw"
          className="aspect-16/9 rounded-none lg:col-span-5 lg:aspect-auto lg:h-full"
        />
      ) : (
        <div className="grid aspect-16/9 place-items-center bg-crimson text-blush lg:col-span-5 lg:aspect-auto lg:h-full">
          <OccasionIcon occasion={basket.occasion} className="size-12" />
        </div>
      )}

      <div className="flex flex-col gap-5 p-card lg:col-span-7 lg:p-card-lg">
        <header>
          <p className="flex items-center gap-2 text-small font-semibold text-ink-muted">
            <OccasionIcon occasion={basket.occasion} className="size-icon text-crimson" />
            For {occasionPhrases[basket.occasion]}
          </p>
          <h3 className="mt-2 text-title text-ink">
            <Link
              id={nameId}
              href={`/baskets/${basket.slug}`}
              className="decoration-2 underline-offset-4 hover:text-crimson hover:underline"
            >
              {basket.name}
            </Link>
          </h3>
          <p className="mt-1 text-body text-ink-body">{basket.description}</p>
        </header>

        <div className="flex flex-col gap-4 border-y border-line py-5 md:order-last md:flex-row md:flex-wrap md:items-end md:justify-between md:border-b-0 md:pb-0">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <Price cents={basket.priceCents} jmdPerUsd={jmdPerUsd} size="lg" />
            {row.savingCents > 0 && <SavingTag cents={row.savingCents} className="mt-2" />}
          </div>
          {row.unavailable.length > 0 ? (
            <div className="rounded-md border border-warn-line bg-warn-tint p-4 text-small text-ink md:max-w-sm">
              <p className="font-semibold">Not available today</p>
              <p className="mt-1">
                {row.unavailable.map((p) => p.name).join(', ')}{' '}
                {row.unavailable.length === 1 ? 'is' : 'are'} out of stock, so this basket
                can&apos;t be ordered right now. You can add the other items one by one from the
                shop.
              </p>
              <ButtonLink href="/shop" variant="outline" size="sm" className="mt-3">
                Go to the shop
              </ButtonLink>
            </div>
          ) : (
            <AddToBasket kind="basket" id={basket.id} name={basket.name} variant="full" />
          )}
          <p className="flex w-full gap-2 text-small text-ink-muted">
            <Gift className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
            Add a gift message at checkout. We print it and hand it over.
          </p>
        </div>

        <BasketItems row={row} />
      </div>
    </article>
  )
}
