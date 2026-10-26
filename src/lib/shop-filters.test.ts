import { describe, expect, it } from 'vitest'
import * as demo from '@/lib/demo'
import { applyShopQuery, parseShopQuery, PAGE_SIZE, shopQueryString } from './shop-filters'

describe('shop filters', () => {
  it('falls back to defaults for unknown values', () => {
    expect(parseShopQuery({ sort: 'evil', price: '1e9', page: '-3' })).toEqual({
      sort: 'popular',
      price: 'any',
      inStock: false,
      page: 1,
    })
  })

  it('builds a short query string and round-trips it', () => {
    const q = parseShopQuery({ sort: 'price-asc', stock: '1' })
    expect(shopQueryString(q, 2)).toBe('?sort=price-asc&stock=1&page=2')
    expect(shopQueryString(parseShopQuery({}))).toBe('')
  })

  it('filters by price band and stock, and sorts', () => {
    const groceries = demo.products.filter((p) => p.categoryId === 'cat-groceries')
    const r = applyShopQuery(
      groceries,
      parseShopQuery({ price: 'under-10', sort: 'price-desc', stock: '1' }),
    )
    expect(r.items.every((p) => p.priceCents < 1000 && p.status === 'visible')).toBe(true)
    const prices = r.items.map((p) => p.priceCents)
    expect(prices).toEqual([...prices].sort((a, b) => b - a))
  })

  it('puts out-of-stock items last on the default sort and clamps the page', () => {
    const r = applyShopQuery(demo.products, parseShopQuery({ page: '99' }))
    expect(r.page).toBe(r.pages)
    const all = applyShopQuery(demo.products, {
      sort: 'popular',
      price: 'any',
      inStock: false,
      page: 1,
    })
    expect(all.items).toHaveLength(Math.min(PAGE_SIZE, demo.products.length))
    expect(all.items[0].featured).toBe(true)
  })
})
