import Link from 'next/link'
import { ShelfCard } from '@/components/shop/shelf-card'
import { unitPriceLabel } from '@/lib/unit-price'
import type { Product } from '@/lib/types'
import { TileBasketControl } from './tile-basket-control'

/**
 * A rail of real products. A thin department (unfiltered, fewer than 8 items) ends with items
 * from the other departments, so the page never reads as an empty shop; the product page uses
 * it for "More from {aisle}". No invented "coming soon" counts.
 */
export function MoreFromShop({
  products,
  jmdPerUsd,
  quantities,
  title = 'More from the shop',
  href = '/shop',
  linkLabel = 'Shop everything',
  headingId = 'more-from-shop',
}: {
  products: Product[]
  jmdPerUsd: number
  /** Basket quantity by product id. */
  quantities: Record<string, number>
  title?: string
  href?: string
  linkLabel?: string
  headingId?: string
}) {
  if (!products.length) return null
  return (
    <section aria-labelledby={headingId} className="pt-10 lg:pt-12">
      <div className="flex items-center justify-between gap-4">
        <h2 id={headingId} className="font-display text-title font-semibold text-ink">
          {title}
        </h2>
        <Link
          href={href}
          className="inline-flex min-h-control shrink-0 items-center text-small font-semibold text-crimson underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
      <ul
        role="list"
        className="bleed-gutter -my-1.5 mt-4 rail scroll-px-4 gap-3 py-1.5 md:gap-4 lg:m-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:p-0 xl:grid-cols-6"
      >
        {products.map((p, i) => (
          <li
            key={p.id}
            className={`flex w-[42%] sm:w-[28%] lg:w-auto ${i >= 4 ? 'lg:max-xl:hidden' : ''}`}
          >
            <ShelfCard
              product={p}
              jmdPerUsd={jmdPerUsd}
              unitPrice={unitPriceLabel(p.size, p.priceCents)}
              sizes="(min-width: 1280px) 160px, (min-width: 1024px) 200px, 44vw"
              // The shelf-tag placeholder's type is too big for a card this narrow.
              placeholder="icon"
              action={
                <TileBasketControl
                  productId={p.id}
                  name={p.name}
                  quantity={quantities[p.id] ?? 0}
                  inStock={p.status === 'visible'}
                />
              }
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
