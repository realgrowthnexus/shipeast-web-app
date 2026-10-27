import { AddToBasket } from '@/components/shop/add-to-basket'
import { ProductCard } from '@/components/shop/product-card'
import { cn } from '@/lib/cn'
import { hasProductPhoto } from '@/components/shop/product-image'
import type { Category, Product } from '@/lib/types'
import { HomeSection } from './home-section'

/**
 * Up to ten products across the departments, photographed and in stock only, featured first and
 * then taken in turn from each department so one aisle never fills the grid.
 */
export function popularProducts(products: Product[], categories: Category[], count = 10) {
  const ready = products
    .filter((p) => p.status === 'visible' && hasProductPhoto(p))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
  const queues = categories.map((c) => ready.filter((p) => p.categoryId === c.id))
  const picked: Product[] = []
  while (picked.length < count && queues.some((q) => q.length)) {
    for (const q of queues) {
      const next = q.shift()
      if (next && picked.length < count) picked.push(next)
    }
  }
  return picked
}

/**
 * The store's main grid: two across on phones, five on wide screens. Each card names its
 * department, and its Add button fills crimson while the card is hovered.
 */
export function PopularProducts({
  products,
  categories,
  jmdPerUsd,
  note,
}: {
  products: Product[]
  categories: Category[]
  jmdPerUsd: number
  note?: string
}) {
  const names = new Map(categories.map((c) => [c.id, c.name]))
  return (
    <HomeSection
      id="popular-h"
      title="Popular right now"
      note={note}
      link={{ href: '/shop', label: 'See the whole store', short: 'See all' }}
    >
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
        {products.map((p, i) => (
          // Whole rows only: 6 on phones, 8 on tablets, 10 on wide screens
          <li
            key={p.id}
            className={cn('flex', i >= 6 && 'hidden md:flex', i >= 8 && 'md:hidden lg:flex')}
          >
            <ProductCard
              product={p}
              jmdPerUsd={jmdPerUsd}
              category={names.get(p.categoryId)}
              action={
                <AddToBasket
                  kind="product"
                  id={p.id}
                  name={p.name}
                  className="group-hover:bg-crimson group-hover:text-white"
                />
              }
            />
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
