import type { BasketSummary } from '@/lib/data/site'
import type { Product } from '@/lib/types'

/**
 * Pure helpers for the baskets listing: each basket's items at today's shop price, so the page
 * can show the saving line by line instead of claiming it.
 */

export interface BasketLine {
  product: Product
  quantity: number
  /** Today's shop price for this quantity. */
  lineCents: number
}

export interface BasketRow {
  summary: BasketSummary
  /** In the basket's own item order. */
  lines: BasketLine[]
  /** Bought one by one minus the basket price; never negative. */
  savingCents: number
  /** Items that can't be bought today, so the basket can't be ordered. */
  unavailable: Product[]
}

/** Rows for the listing: orderable baskets first, then the rest, each group in admin order. */
export function buildBasketRows(summaries: BasketSummary[], products: Product[]): BasketRow[] {
  const byId = new Map(products.map((p) => [p.id, p]))
  const rows = summaries.map((summary): BasketRow => {
    const lines = summary.basket.items.flatMap((item) => {
      const product = byId.get(item.productId)
      if (!product) return []
      return [{ product, quantity: item.quantity, lineCents: product.priceCents * item.quantity }]
    })
    return {
      summary,
      lines,
      savingCents: Math.max(0, summary.separateCents - summary.basket.priceCents),
      unavailable: lines.filter((l) => l.product.status !== 'visible').map((l) => l.product),
    }
  })
  return [...rows.filter((r) => !r.unavailable.length), ...rows.filter((r) => r.unavailable.length)]
}
