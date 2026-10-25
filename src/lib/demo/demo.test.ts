import { describe, expect, it } from 'vitest'
import { baskets, categories, products, zones } from '.'

describe('demo data', () => {
  it('has unique product slugs in known categories', () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length)
    const categoryIds = new Set(categories.map((c) => c.id))
    for (const p of products) expect(categoryIds.has(p.categoryId)).toBe(true)
  })

  it('prices baskets below the sum of their items', () => {
    for (const basket of baskets) {
      const separate = basket.items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId)!
        return sum + product.priceCents * item.quantity
      }, 0)
      expect(basket.priceCents).toBeLessThan(separate)
    }
  })

  it('launches with St. Thomas and Kingston only', () => {
    expect(zones.filter((z) => z.active).map((z) => z.parish)).toEqual(['St. Thomas', 'Kingston'])
    expect(zones).toHaveLength(14)
  })
})
