import { describe, expect, it } from 'vitest'
import type { BasketSummary } from '@/lib/data/site'
import * as demo from '@/lib/demo'
import { pickShortcutBasket, type Scope, shortcutIndex, tileLabel } from './shop-listing'

const summaries: BasketSummary[] = demo.baskets.map((basket) => ({
  basket,
  itemCount: basket.items.reduce((n, i) => n + i.quantity, 0),
  separateCents: 0,
}))
const dept = (slug: string): Scope => ({
  kind: 'department',
  category: demo.categories.find((c) => c.slug === slug)!,
})
const pick = (scope: Scope) => {
  const s = pickShortcutBasket(scope, summaries, demo.products)
  return s?.kind === 'basket' ? s.summary.basket.name : s
}

describe('pickShortcutBasket', () => {
  it('picks the basket each department mostly supplies', () => {
    expect(pick(dept('groceries'))).toBe('Family Food Basket')
    expect(pick(dept('baby-and-child'))).toBe('Baby Care Pack')
    expect(pick(dept('pharmacy'))).toBe('Pharmacy Pack')
  })

  it('shows no tile when no basket fits the department', () => {
    expect(pick(dept('household'))).toBeNull()
  })

  it('shows every basket and the lowest price on /shop', () => {
    expect(pickShortcutBasket({ kind: 'all' }, summaries, demo.products)).toEqual({
      kind: 'all',
      count: demo.baskets.length,
      fromCents: Math.min(...demo.baskets.map((b) => b.priceCents)),
    })
  })

  it('has no tile without baskets', () => {
    expect(pickShortcutBasket({ kind: 'all' }, [], demo.products)).toBeNull()
  })

  it('goes in the 8th cell, or last in a short list', () => {
    expect(shortcutIndex(22)).toBe(7)
    expect(shortcutIndex(4)).toBe(4)
  })
})

describe('tileLabel', () => {
  const names = {
    aisles: Object.fromEntries(demo.aisles.map((a) => [a.id, a.name])),
    departments: Object.fromEntries(demo.categories.map((c) => [c.id, c.name])),
  }
  const rice = demo.products.find((p) => p.slug === 'long-grain-rice-10lb')!
  it('shows the aisle on a department page and the department on /shop', () => {
    expect(tileLabel(rice, dept('groceries'), names)).toBe('Rice & grains')
    expect(tileLabel(rice, { kind: 'all' }, names)).toBe('Groceries')
    expect(tileLabel({ ...rice, aisleId: null }, dept('groceries'), names)).toBeNull()
  })
})
