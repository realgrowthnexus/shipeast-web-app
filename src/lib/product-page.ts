import { buildBasketRows, type BasketRow } from '@/lib/baskets'
import type { BasketSummary } from '@/lib/data/site'
import type { Product } from '@/lib/types'

/**
 * Pure helpers for the product page (docs/product-v2/PLAN.md §3), kept out of the components
 * so they can be tested without rendering.
 */

/** In stock first, then the shop's own picks, then by name. */
const shelfOrder = (a: Product, b: Product) =>
  Number(a.status !== 'visible') - Number(b.status !== 'visible') ||
  Number(b.featured) - Number(a.featured) ||
  a.name.localeCompare(b.name)

export interface Related {
  products: Product[]
  /** How many of `products` come from the product's own aisle (they come first). */
  fromAisle: number
}

/**
 * Up to `max` other items for "More from…": the same aisle first, topped up from the same
 * department. Never the product itself, never a hidden item.
 */
export function relatedProducts(product: Product, products: Product[], max = 6): Related {
  const others = products.filter(
    (p) => p.id !== product.id && p.status !== 'hidden' && p.categoryId === product.categoryId,
  )
  const aisle = product.aisleId
    ? others.filter((p) => p.aisleId === product.aisleId).sort(shelfOrder)
    : []
  const department = others.filter((p) => !aisle.includes(p)).sort(shelfOrder)
  const picked = [...aisle, ...department].slice(0, max)
  return { products: picked, fromAisle: Math.min(aisle.length, picked.length) }
}

export interface BasketWith {
  row: BasketRow
  /** How many of the product the basket holds. */
  quantity: number
}

/**
 * Baskets that hold this product and can be ordered today (every item in stock), in admin
 * order, at most `max`. A basket with a sold-out item is left out, never shown greyed.
 */
export function basketsWith(
  productId: string,
  summaries: BasketSummary[],
  products: Product[],
  max = 3,
): BasketWith[] {
  const holding = summaries.filter((s) => s.basket.items.some((i) => i.productId === productId))
  return buildBasketRows(holding, products)
    .filter((row) => !row.unavailable.length)
    .slice(0, max)
    .map((row) => ({
      row,
      quantity: row.lines.find((l) => l.product.id === productId)?.quantity ?? 1,
    }))
}
