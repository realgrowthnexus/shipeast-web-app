import { describe, expect, it } from 'vitest'
import { baskets, products } from '@/lib/demo/catalogue'
import type { Product } from '@/lib/types'
import { buildBasketRows } from './baskets'

const listed = products.filter((p) => p.status !== 'hidden')
const summaries = baskets.map((basket) => {
  const byId = new Map(products.map((p) => [p.id, p]))
  return {
    basket,
    itemCount: basket.items.reduce((n, i) => n + i.quantity, 0),
    separateCents: basket.items.reduce(
      (sum, i) => sum + (byId.get(i.productId)?.priceCents ?? 0) * i.quantity,
      0,
    ),
  }
})

describe('buildBasketRows', () => {
  const rows = buildBasketRows(summaries, listed)

  it('lists every item so the lines add up to the one-by-one total', () => {
    for (const row of rows) {
      expect(row.lines.reduce((t, l) => t + l.lineCents, 0)).toBe(row.summary.separateCents)
    }
  })

  it('never shows a negative saving', () => {
    const cheap = [{ ...summaries[0], separateCents: 100 }]
    expect(buildBasketRows(cheap, listed)[0].savingCents).toBe(0)
    for (const row of rows) expect(row.savingCents).toBeGreaterThanOrEqual(0)
  })

  it('sorts a basket with an out-of-stock item last and names the item', () => {
    const last = rows.at(-1)!
    expect(last.summary.basket.slug).toBe('christmas-hamper')
    expect(last.unavailable.map((p) => p.name)).toContain('Ground Coffee')
    expect(rows.slice(0, -1).every((r) => r.unavailable.length === 0)).toBe(true)
  })

  it('keeps admin order otherwise', () => {
    const orderable = baskets.map((b) => b.slug).filter((s) => s !== 'christmas-hamper')
    expect(rows.slice(0, -1).map((r) => r.summary.basket.slug)).toEqual(orderable)
  })

  it('skips an item whose product is gone', () => {
    const gone: Product[] = listed.filter((p) => p.id !== baskets[0].items[0].productId)
    const row = buildBasketRows([summaries[0]], gone)[0]
    expect(row.lines).toHaveLength(baskets[0].items.length - 1)
  })
})
