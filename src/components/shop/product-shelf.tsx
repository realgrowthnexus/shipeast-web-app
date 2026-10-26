import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { ProductCard } from '@/components/shop/product-card'
import { Section } from '@/components/site/section'
import { cn } from '@/lib/cn'
import type { Product } from '@/lib/types'

/** The line under each department's shelf title. Other departments use their description. */
export const shelfLeads: Record<string, string> = {
  groceries: 'Rice, flour, oil and the staples they cook with every day.',
  household: 'Detergent, paper goods and cleaning basics.',
  pharmacy: 'Pain relief, vitamins and first aid.',
  'baby-and-child': 'Diapers, wipes and formula for the little ones.',
}

/** One department's products for a shelf: in stock first, then featured first. */
export function shelfProducts(products: Product[], categoryId: string) {
  return products
    .filter((p) => p.categoryId === categoryId)
    .sort(
      (a, b) =>
        Number(a.status !== 'visible') - Number(b.status !== 'visible') ||
        Number(b.featured) - Number(a.featured),
    )
}

export type ShelfTone = 'crimson' | 'tint' | 'canvas'

/**
 * Band colour for the nth shelf on a page: the first is the one red brand shelf, the rest
 * alternate blush and the page background so each aisle reads as its own section.
 */
export const shelfTone = (i: number): ShelfTone => (i === 0 ? 'crimson' : i % 2 ? 'tint' : 'canvas')

/**
 * A store shelf: one department's products with prices and one-tap add. Scrolls sideways on
 * phones and shows five across on wide screens, with a link to the whole aisle. No entrance
 * animation: in a store the products should simply be there. Cards stay warm white so the
 * product and its price lead; the band behind them carries the colour.
 */
export function ProductShelf({
  id,
  title,
  lead,
  href,
  products,
  jmdPerUsd,
  tone = 'tint',
}: {
  id: string
  title: string
  lead?: string
  href: string
  products: Product[]
  jmdPerUsd: number
  tone?: ShelfTone
}) {
  if (!products.length) return null
  const dark = tone === 'crimson'
  return (
    <Section tone={tone} size="sm" wide aria-labelledby={id}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id={id} className={cn('text-h2', dark ? 'text-white' : 'text-ink')}>
            {title}
          </h2>
          {lead && (
            <p className={cn('mt-1', dark ? 'text-on-crimson-muted' : 'text-ink-body')}>{lead}</p>
          )}
        </div>
        <Link
          href={href}
          className={cn(
            'group inline-flex min-h-11 items-center gap-1.5 font-semibold hover:underline',
            dark ? 'text-white' : 'text-crimson',
          )}
        >
          See all {title.toLowerCase()}
          <ArrowRight
            className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </Link>
      </div>
      <ul className="-mx-4 grid snap-x scroll-px-4 auto-cols-[46%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:auto-cols-[31%] md:mx-0 md:auto-cols-auto md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-0 lg:grid-cols-5 lg:gap-4">
        {products.slice(0, 5).map((p, i) => (
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
      </ul>
    </Section>
  )
}
