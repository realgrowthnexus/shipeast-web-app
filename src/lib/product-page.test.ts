import { describe, expect, it } from 'vitest'
import { baskets, products } from '@/lib/demo/catalogue'
import type { Product } from '@/lib/types'
import { basketsWith, relatedProducts } from './product-page'

const listed = products.filter((p) => p.status !== 'hidden')
const bySlug = (slug: string) => listed.find((p) => p.slug === slug)!
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

const item = (over: Partial<Product>): Product => ({
  id: 'p',
  slug: 'p',
  name: 'P',
  size: '',
  description: '',
  categoryId: 'cat-a',
  priceCents: 100,
  status: 'visible',
  imagePath: null,
  priceCheckedAt: '2026-11-07',
  featured: false,
  aisleId: 'ais-1',
  ...over,
})

describe('relatedProducts', () => {
  const self = item({ id: 'self', name: 'Self' })
  const shelf = [
    self,
    item({ id: 'dept-1', name: 'Apple', aisleId: 'ais-2' }),
    item({ id: 'aisle-out', name: 'Bread', status: 'out_of_stock' }),
    item({ id: 'aisle-b', name: 'Corn' }),
    item({ id: 'aisle-feat', name: 'Zest', featured: true }),
    item({ id: 'hidden', name: 'Hidden', status: 'hidden' }),
    item({ id: 'other-dept', name: 'Other', categoryId: 'cat-b' }),
    item({ id: 'dept-2', name: 'Banana', aisleId: null }),
  ]

  it('puts the same aisle first, in stock before out of stock, picks before the rest', () => {
    const { products: got, fromAisle } = relatedProducts(self, shelf, 6)
    expect(got.map((p) => p.id)).toEqual(['aisle-feat', 'aisle-b', 'aisle-out', 'dept-1', 'dept-2'])
    expect(fromAisle).toBe(3)
  })

  it('tops up from the department and never shows itself, hidden items or other departments', () => {
    const ids = relatedProducts(self, shelf, 6).products.map((p) => p.id)
    expect(ids).not.toContain('self')
    expect(ids).not.toContain('hidden')
    expect(ids).not.toContain('other-dept')
  })

  it('stops at the limit and counts only the aisle items it kept', () => {
    const { products: got, fromAisle } = relatedProducts(self, shelf, 2)
    expect(got).toHaveLength(2)
    expect(fromAisle).toBe(2)
  })

  it('uses the department alone when the product has no aisle', () => {
    const loose = item({ id: 'loose', aisleId: null })
    const { products: got, fromAisle } = relatedProducts(loose, [loose, ...shelf])
    expect(fromAisle).toBe(0)
    expect(got.every((p) => p.categoryId === 'cat-a')).toBe(true)
  })

  it('works on the demo catalogue: a client item gets its own aisle first', () => {
    const rice = bySlug('kings-basmati-rice-6-8-kg-15-lb')
    const { products: got, fromAisle } = relatedProducts(rice, listed)
    expect(got.length).toBeGreaterThan(0)
    expect(got.slice(0, fromAisle).every((p) => p.aisleId === rice.aisleId)).toBe(true)
  })
})

describe('basketsWith', () => {
  it('finds the family food basket for its long grain rice, with the quantity', () => {
    const rice = bySlug('long-grain-rice-10lb')
    const got = basketsWith(rice.id, summaries, listed)
    expect(got.map((b) => b.row.summary.basket.slug)).toContain('family-food-basket')
    expect(got.every((b) => b.quantity >= 1)).toBe(true)
  })

  it('drops a basket that cannot be ordered today (the hamper holds sold-out coffee)', () => {
    const coffee = bySlug('ground-coffee-24oz')
    expect(basketsWith(coffee.id, summaries, listed)).toEqual([])
    for (const p of listed)
      for (const b of basketsWith(p.id, summaries, listed))
        expect(b.row.summary.basket.slug).not.toBe('christmas-hamper')
  })

  it('returns nothing for a client item that sits in no basket', () => {
    const rice = bySlug('kings-basmati-rice-6-8-kg-15-lb')
    expect(basketsWith(rice.id, summaries, listed)).toEqual([])
  })

  it('shows at most the limit', () => {
    const all = summaries.map((s) => ({
      ...s,
      basket: { ...s.basket, items: [...s.basket.items, { productId: 'x', quantity: 1 }] },
    }))
    const extra = item({ id: 'x' })
    expect(basketsWith('x', all, [...listed, extra], 2).length).toBeLessThanOrEqual(2)
  })
})
