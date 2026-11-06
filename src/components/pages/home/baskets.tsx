import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { Price } from '@/components/ui/price'
import { cn } from '@/lib/cn'
import type { BasketSummary } from '@/lib/data/site'
import { formatUsd } from '@/lib/format'
import { basketsLead } from '@/lib/home'
import { basketPhotos } from '@/lib/stock-photos'
import { lightLink } from './steps'

/** S4: the featured baskets, each one tap from the basket. */
export function HomeBaskets({
  baskets,
  jmdPerUsd,
}: {
  baskets: BasketSummary[]
  jmdPerUsd: number
}) {
  const n = baskets.length
  return (
    <section aria-labelledby="baskets-title" className="section">
      <div className="mx-auto max-w-page gutter">
        <SectionHeader
          id="baskets-title"
          title="Ready-made baskets"
          lead={basketsLead(baskets.map((b) => b.basket.occasion))}
          action={
            <Link href="/baskets" className={lightLink}>
              All baskets
            </Link>
          }
        />
        <ul
          className={cn(
            'mt-8 grid gap-6 md:grid-cols-2 lg:mt-12 xl:gap-8',
            n === 3 && 'lg:grid-cols-3',
            n >= 4 && 'xl:grid-cols-4',
          )}
        >
          {baskets.map((summary, i) => (
            <li
              key={summary.basket.id}
              // Three cards at 768: the third spans the row as a side-by-side card, no orphan.
              className={cn('flex', n === 3 && i === 2 && 'md:col-span-2 lg:col-span-1')}
            >
              <HomeBasketCard
                summary={summary}
                jmdPerUsd={jmdPerUsd}
                wideOnTablet={n === 3 && i === 2}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function HomeBasketCard({
  summary: { basket, itemCount, separateCents },
  jmdPerUsd,
  wideOnTablet = false,
}: {
  summary: BasketSummary
  jmdPerUsd: number
  wideOnTablet?: boolean
}) {
  const photo = basketPhotos[basket.slug]
  const saving = separateCents > basket.priceCents ? separateCents - basket.priceCents : 0
  return (
    <article
      className={cn(
        'group relative flex flex-1 hover-lift flex-col overflow-hidden rounded-xl border border-line bg-surface has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-signal has-[a:focus-visible]:ring-offset-2',
        wideOnTablet && 'md:grid md:grid-cols-2 lg:flex',
      )}
    >
      {photo ? (
        <StockPhoto
          name={photo}
          zoom
          sizes="(min-width: 1024px) 370px, (min-width: 768px) 45vw, 100vw"
          className={cn(
            'aspect-16/9 rounded-none',
            wideOnTablet && 'md:aspect-auto md:h-full lg:aspect-16/9',
          )}
        />
      ) : (
        <div className="grid aspect-16/9 place-items-center bg-crimson text-blush">
          <ShoppingBasket className="size-12" aria-hidden />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-card">
        <h3 className="text-h3 text-ink">
          <Link
            href={`/baskets/${basket.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {basket.name}
          </Link>
        </h3>
        <p className="text-body text-ink-body">{basket.description}</p>
        <p className="text-small text-ink-muted tabular-nums">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <Price cents={basket.priceCents} jmdPerUsd={jmdPerUsd} size="lg" />
            {saving > 0 && (
              <span className="mt-2 rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink tabular-nums">
                Save {formatUsd(saving)}
              </span>
            )}
          </div>
          <div className="relative z-raised">
            <AddToBasket kind="basket" id={basket.id} name={basket.name} />
          </div>
        </div>
      </div>
    </article>
  )
}
