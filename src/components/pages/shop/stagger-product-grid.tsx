import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { ProductCard } from '@/components/shop/product-card'
import type { Product } from '@/lib/types'

/**
 * The same grid and cards as `ProductGrid` (same add-to-basket control), with the cards
 * appearing one after another as the grid scrolls into view.
 */
export function StaggerProductGrid({
  products,
  jmdPerUsd,
}: {
  products: Product[]
  jmdPerUsd: number
}) {
  return (
    <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <StaggerItem key={p.id} className="flex">
          <ProductCard
            product={p}
            jmdPerUsd={jmdPerUsd}
            action={<AddToBasket kind="product" id={p.id} name={p.name} />}
          />
        </StaggerItem>
      ))}
    </Stagger>
  )
}
