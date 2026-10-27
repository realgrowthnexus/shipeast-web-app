import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { ProductCard } from '@/components/shop/product-card'
import { hasProductPhoto } from '@/components/shop/product-image'
import { Section } from '@/components/site/section'
import type { Product } from '@/lib/types'

/** The line under each department's shelf title. Other departments use their description. */
export const shelfLeads: Record<string, string> = {
  groceries: 'Rice, flour, oil and the staples they cook with every day.',
  household: 'Detergent, paper goods and cleaning basics.',
  pharmacy: 'Pain relief, vitamins and first aid.',
  'baby-and-child': 'Diapers, wipes and formula for the little ones.',
}

/** One department's products for a shelf: in stock first, then photographed, then featured. */
export function shelfProducts(products: Product[], categoryId: string) {
  return products
    .filter((p) => p.categoryId === categoryId)
    .sort(
      (a, b) =>
        Number(a.status !== 'visible') - Number(b.status !== 'visible') ||
        Number(hasProductPhoto(b)) - Number(hasProductPhoto(a)) ||
        Number(b.featured) - Number(a.featured),
    )
}

/** A home-page shelf needs at least this many photographed products, or it waits until it has them. */
export const MIN_PHOTOGRAPHED = 3

export function shelfIsReady(products: Product[]) {
  return products.filter(hasProductPhoto).length >= MIN_PHOTOGRAPHED
}

/**
 * A store shelf: one department's products with prices and one-tap add. Scrolls sideways on
 * phones (2.3 cards in view) and shows five across on wide screens, with "See all" on the title
 * row. A shelf with fewer than five products ends with a "See all" tile instead of a gap. No
 * entrance animation: in a store the products should simply be there. `divided` draws a thin
 * line above, for every shelf after the first.
 */
export function ProductShelf({
  id,
  title,
  lead,
  note,
  href,
  products,
  jmdPerUsd,
  divided = false,
}: {
  id: string
  title: string
  lead?: string
  /** A small fact under the title, such as when shelf prices were last checked. */
  note?: string
  href: string
  products: Product[]
  jmdPerUsd: number
  divided?: boolean
}) {
  if (!products.length) return null
  const shown = products.slice(0, 5)
  const seeAll = `See all ${title.toLowerCase()}`
  return (
    <Section
      tone="surface"
      size="sm"
      wide
      aria-labelledby={id}
      className={divided ? 'pt-0!' : undefined}
    >
      <div className={divided ? 'border-t border-line pt-8 sm:pt-12' : undefined}>
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <h2 id={id} className="text-title text-ink">
              {title}
            </h2>
            {lead && <p className="mt-1 hidden text-ink-body sm:block">{lead}</p>}
            {note && <p className="mt-1 text-xs text-ink-muted">{note}</p>}
          </div>
          <Link
            href={href}
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-crimson hover:underline"
          >
            <span className="sm:hidden">See all</span>
            <span className="hidden sm:inline">{seeAll}</span>
            <ArrowRight
              className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
          </Link>
        </div>
        <ul className="-mx-4 grid snap-x scroll-px-4 auto-cols-[43%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:auto-cols-[31%] md:mx-0 md:auto-cols-auto md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-0 lg:grid-cols-5 lg:gap-4">
          {shown.map((p, i) => (
            <li
              key={p.id}
              className={i === 4 ? 'flex snap-start md:hidden lg:flex' : 'flex snap-start'}
            >
              <ProductCard
                product={p}
                jmdPerUsd={jmdPerUsd}
                action={<AddToBasket kind="product" id={p.id} name={p.name} />}
              />
            </li>
          ))}
          {shown.length < 5 && (
            <li className="hidden snap-start lg:flex">
              <Link
                href={href}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong p-3 text-center font-semibold text-crimson hover:bg-canvas"
              >
                <ArrowRight className="size-5" aria-hidden />
                {seeAll}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </Section>
  )
}
