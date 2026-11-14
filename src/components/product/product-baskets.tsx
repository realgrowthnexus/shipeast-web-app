import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { HomeAddButton } from '@/components/home/add-button'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatUsd } from '@/lib/format'
import type { BasketWith } from '@/lib/product-page'
import { basketPhotos } from '@/lib/stock-photos'

/**
 * "In a ready-made basket" (docs/product-v2/PLAN.md §2.E): the baskets we can sell today that
 * already hold this item, as compact cards. The page renders it only when there is at least one.
 */
export function ProductBaskets({ baskets, name }: { baskets: BasketWith[]; name: string }) {
  if (!baskets.length) return null
  return (
    <section aria-labelledby="baskets-title" className="pt-10 lg:pt-12">
      <h2 id="baskets-title" className="font-display text-title font-semibold text-ink">
        In a ready-made basket
      </h2>
      <p className="mt-1 text-small text-ink-body">
        {name} comes in {baskets.length === 1 ? 'this basket' : 'these baskets'}. Add one in a tap.
      </p>
      <ul
        role="list"
        className="bleed-gutter -my-1.5 mt-4 rail scroll-px-4 gap-3 py-1.5 md:gap-4 lg:m-0 lg:mt-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:p-0"
      >
        {baskets.map(({ row, quantity }) => {
          const { basket, itemCount } = row.summary
          const photo = basketPhotos[basket.slug]
          return (
            <li key={basket.id} className="flex w-[85%] sm:w-[60%] lg:w-auto">
              <article className="group relative flex w-full card-rise gap-3 rounded-xl border border-line bg-surface p-2 hover:border-line-hover has-[h3_a:focus-visible]:outline-3 has-[h3_a:focus-visible]:outline-offset-2 has-[h3_a:focus-visible]:outline-signal">
                {photo ? (
                  <StockPhoto
                    name={photo}
                    alt=""
                    sizes="112px"
                    className="photo-loading aspect-[4/3] w-28 shrink-0 self-start rounded-md"
                  />
                ) : (
                  <div className="grid aspect-[4/3] w-28 shrink-0 place-items-center self-start rounded-md bg-surface-muted">
                    <ShoppingBasket className="size-icon-lg text-ink-muted" aria-hidden />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                  <h3 className="font-display text-small font-semibold text-ink">
                    <Link
                      href={`/baskets/${basket.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {basket.name}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {itemCount} items, with {quantity} × {name}
                  </p>
                  <p className="mt-2 -rotate-2 self-start rounded-full bg-mango px-3 py-0.5 font-display text-small font-semibold text-ink tabular-nums transition-transform duration-250 group-hover:rotate-0 motion-reduce:transition-none">
                    {formatUsd(basket.priceCents)}
                  </p>
                  <HomeAddButton
                    kind="basket"
                    id={basket.id}
                    name={basket.name}
                    label="Add basket"
                    className="relative z-raised mt-auto pt-2"
                  />
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
