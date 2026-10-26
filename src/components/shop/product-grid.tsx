import type { Product } from '@/lib/types'
import { AddToBasket } from './add-to-basket'
import { ProductCard } from './product-card'

export function ProductGrid({ products, jmdPerUsd }: { products: Product[]; jmdPerUsd: number }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id} className="flex">
          <ProductCard
            product={p}
            jmdPerUsd={jmdPerUsd}
            action={<AddToBasket kind="product" id={p.id} name={p.name} />}
          />
        </li>
      ))}
    </ul>
  )
}
