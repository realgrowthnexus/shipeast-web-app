import type { BasketSummary } from '@/lib/data/site'
import type { Category, Product } from '@/lib/types'

/** Pure helpers for the shop listing (`/shop` and `/shop/[department]`). */

/** What the listing shows: the whole shop, or one department. */
export type Scope = { kind: 'all' } | { kind: 'department'; category: Category }

export const scopePath = (scope: Scope) =>
  scope.kind === 'all' ? '/shop' : `/shop/${scope.category.slug}`

/**
 * The small label above a tile's name: the aisle on a department page (none until one is
 * assigned), the department on `/shop`.
 */
export function tileLabel(
  product: Pick<Product, 'aisleId' | 'categoryId'>,
  scope: Scope,
  names: { aisles: Record<string, string>; departments: Record<string, string> },
): string | null {
  if (scope.kind === 'all') return names.departments[product.categoryId] ?? null
  return (product.aisleId && names.aisles[product.aisleId]) || null
}

export type Shortcut =
  { kind: 'basket'; summary: BasketSummary } | { kind: 'all'; count: number; fromCents: number }

/** Where the basket tile goes in the first batch: the 8th cell, or last in a short list. */
export const shortcutIndex = (items: number) => Math.min(7, items)

/**
 * The one ready-made basket tile, from real data only. On a department page: the basket this
 * department supplies at least half of (by item quantity), preferring ones that can be ordered
 * today, then featured ones, then the biggest share. On `/shop`: all baskets and the lowest
 * price. Null when nothing fits (no tile).
 */
export function pickShortcutBasket(
  scope: Scope,
  summaries: BasketSummary[],
  products: Pick<Product, 'id' | 'categoryId' | 'status'>[],
): Shortcut | null {
  if (!summaries.length) return null
  if (scope.kind === 'all')
    return {
      kind: 'all',
      count: summaries.length,
      fromCents: Math.min(...summaries.map((s) => s.basket.priceCents)),
    }

  const byId = new Map(products.map((p) => [p.id, p]))
  const candidates = summaries
    .map((summary, order) => {
      const items = summary.basket.items
      const total = items.reduce((n, i) => n + i.quantity, 0)
      const mine = items
        .filter((i) => byId.get(i.productId)?.categoryId === scope.category.id)
        .reduce((n, i) => n + i.quantity, 0)
      const orderable = items.every((i) => byId.get(i.productId)?.status === 'visible')
      return { summary, order, share: total ? mine / total : 0, orderable }
    })
    .filter((c) => c.share >= 0.5)
    .sort(
      (a, b) =>
        Number(b.orderable) - Number(a.orderable) ||
        Number(b.summary.basket.featured) - Number(a.summary.basket.featured) ||
        b.share - a.share ||
        a.order - b.order,
    )
  return candidates.length ? { kind: 'basket', summary: candidates[0].summary } : null
}
