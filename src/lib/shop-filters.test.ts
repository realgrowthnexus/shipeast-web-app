import { describe, expect, it } from 'vitest'
import * as demo from '@/lib/demo'
import type { Product } from '@/lib/types'
import {
  activeFilters,
  applyShopQuery,
  countFacetIndex,
  defaultQuery,
  facetCounts,
  type ListingContext,
  narrowByFind,
  PAGE_SIZE,
  parseShopQuery,
  queryFromForm,
  type ShopQuery,
  shopQueryString,
  SORTS,
  toFacetIndex,
} from './shop-filters'

const departments = Object.fromEntries(demo.categories.map((c) => [c.id, c.name]))
const aisleNames = Object.fromEntries(demo.aisles.map((a) => [a.id, a.name]))
const aislesOf = (categoryId: string) =>
  demo.aisles
    .filter((a) => a.categoryId === categoryId)
    .sort((a, b) => a.sort - b.sort)
    .map(({ id, slug, name }) => ({ id, slug, name }))

const allCtx: ListingContext = { aisles: [], aisleNames, departments }
const groceriesCtx: ListingContext = { aisles: aislesOf('cat-groceries'), aisleNames, departments }
const groceries = demo.products.filter((p) => p.categoryId === 'cat-groceries')
const q = (patch: Partial<ShopQuery> = {}): ShopQuery => ({ ...defaultQuery, ...patch })

describe('parseShopQuery', () => {
  it('falls back to defaults for unknown values and drops unknown aisles', () => {
    expect(
      parseShopQuery({ sort: 'evil', price: '1e9', page: '-3', aisle: 'nope' }, groceriesCtx),
    ).toEqual(defaultQuery)
  })

  it('reads aisle as an array or a string, removes duplicates and keeps aisle order', () => {
    expect(
      parseShopQuery({ aisle: ['canned-goods', 'baking', 'canned-goods'] }, groceriesCtx).aisles,
    ).toEqual(['baking', 'canned-goods'])
    expect(parseShopQuery({ aisle: 'baking' }, groceriesCtx).aisles).toEqual(['baking'])
  })

  it('ignores aisle when the scope has no aisles (/shop)', () => {
    expect(parseShopQuery({ aisle: 'baking' }, allCtx).aisles).toEqual([])
    expect(parseShopQuery({ aisle: 'baking' }).aisles).toEqual([])
  })

  it('cleans the find text and cuts it to 80 characters', () => {
    expect(parseShopQuery({ q: '  rice   and  peas ' }).q).toBe('rice and peas')
    expect(parseShopQuery({ q: 'a'.repeat(81) }).q).toHaveLength(80)
  })
})

describe('shopQueryString', () => {
  it('round-trips every param in a fixed order, and is empty for defaults', () => {
    const query = q({
      q: 'rice',
      aisles: ['baking', 'canned-goods'],
      price: 'under-10',
      inStock: true,
      sort: 'price-asc',
      page: 2,
    })
    const s = shopQueryString(query)
    expect(s).toBe(
      '?q=rice&aisle=baking&aisle=canned-goods&price=under-10&stock=1&sort=price-asc&page=2',
    )
    const params = Object.fromEntries(
      [...new URLSearchParams(s).keys()].map((k) => [k, new URLSearchParams(s).getAll(k)]),
    )
    expect(parseShopQuery(params, groceriesCtx)).toEqual(query)
    expect(shopQueryString(defaultQuery)).toBe('')
  })

  it('drops the page when a filter changes', () => {
    expect(shopQueryString(q({ page: 3 }), { price: 'over-25' })).toBe('?price=over-25')
    expect(shopQueryString(q({ page: 3 }), { page: 4 })).toBe('?page=4')
  })
})

describe('applyShopQuery', () => {
  it('finds within the scope by every word', () => {
    const milk = applyShopQuery(demo.products, q({ q: 'milk' }), allCtx).items.map((p) => p.name)
    expect(milk).toContain('Evaporated Milk')
    expect(milk.every((name) => /milk/i.test(name))).toBe(true)
    // "grains" is only in the aisle name, Rice & grains
    const rice = applyShopQuery(demo.products, q({ q: 'rice grains', page: 9 }), allCtx).items
    expect(rice.map((p) => p.name)).toContain('Long Grain Rice')
    // Every hit is in that aisle: both words are in its name
    expect(rice.every((p) => p.aisleId === 'ais-rice-and-grains')).toBe(true)
  })

  it('uses only the first 8 words of the find text', () => {
    const nine = 'rice rice rice rice rice rice rice rice zzz'
    const plain = applyShopQuery(demo.products, q({ q: 'rice' }), allCtx).total
    expect(plain).toBeGreaterThan(0)
    expect(applyShopQuery(demo.products, q({ q: nine }), allCtx).total).toBe(plain)
  })

  it('filters Groceries by aisle', () => {
    const r = applyShopQuery(groceries, q({ aisles: ['baking'] }), groceriesCtx)
    expect(r.items.map((p) => p.name).sort()).toEqual(['All-Purpose Flour', 'Granulated Sugar'])
  })

  it.each(Object.keys(SORTS) as (keyof typeof SORTS)[])(
    'puts out-of-stock Ground Coffee last when sorting by %s',
    (sort) => {
      // Ask for every page: the list is longer than one page now.
      const r = applyShopQuery(groceries, q({ sort, page: 99 }), groceriesCtx)
      expect(r.items).toHaveLength(groceries.length)
      expect(r.items.at(-1)?.name).toBe('Ground Coffee')
    },
  )

  it('sorts by price within the in-stock items', () => {
    const prices = applyShopQuery(
      groceries,
      q({ sort: 'price-desc', inStock: true }),
      groceriesCtx,
    ).items.map((p) => p.priceCents)
    expect(prices).toEqual([...prices].sort((a, b) => b - a))
  })

  it('shows batches cumulatively and clamps the page', () => {
    const many: Product[] = Array.from({ length: 30 }, (_, i) => ({
      ...demo.products[0],
      id: `fake-${i}`,
      slug: `fake-${i}`,
      name: `Fake ${String(i).padStart(2, '0')}`,
    }))
    const p1 = applyShopQuery(many, q(), allCtx)
    expect([p1.shown, p1.hasMore, p1.total]).toEqual([PAGE_SIZE, true, 30])
    const p2 = applyShopQuery(many, q({ page: 2 }), allCtx)
    expect([p2.shown, p2.hasMore]).toEqual([30, false])
    expect(applyShopQuery(many, q({ page: 99 }), allCtx).page).toBe(2)
  })
})

describe('facets', () => {
  it('counts each group with every other filter applied', () => {
    const f = facetCounts(groceries, q({ price: 'under-10' }), groceriesCtx)
    // Aisle counts follow the price filter
    const under10 = groceries.filter((p) => p.priceCents < 1000)
    expect(Object.values(f.aisles).reduce((a, b) => a + b, 0)).toBe(under10.length)
    expect(f.aisles['baking']).toBe(2)
    expect(f.aisles['rice-and-grains']).toBe(
      under10.filter((p) => p.aisleId === 'ais-rice-and-grains').length,
    )
    // Price counts ignore the price filter: Any is every grocery, the bands split them
    expect(f.price.any).toBe(groceries.length)
    expect(f.price['under-10'] + f.price['10-25'] + f.price['over-25']).toBe(groceries.length)
    // In stock: under USD$10 and visible
    expect(f.inStock).toBe(under10.filter((p) => p.status === 'visible').length)
  })

  it.each([
    { aisles: [], price: 'any', inStock: false },
    { aisles: ['baking'], price: 'any', inStock: false },
    { aisles: ['baking', 'canned-goods'], price: 'under-10', inStock: false },
    { aisles: [], price: '10-25', inStock: true },
    { aisles: ['breakfast-and-drinks'], price: 'any', inStock: true },
    { aisles: ['cooking-oils'], price: 'over-25', inStock: false },
  ] as Pick<ShopQuery, 'aisles' | 'price' | 'inStock'>[])(
    'the phone sheet count matches the listing for %o',
    (draft) => {
      const query = q({ q: '', ...draft })
      const index = toFacetIndex(narrowByFind(groceries, query, groceriesCtx), groceriesCtx)
      expect(countFacetIndex(index, draft)).toBe(
        applyShopQuery(groceries, query, groceriesCtx).total,
      )
    },
  )

  it('labels each chip and removes only itself', () => {
    const query = q({ q: 'milk', aisles: ['baking'], price: 'under-10', inStock: true })
    const chips = activeFilters(query, groceriesCtx)
    expect(chips.map((c) => c.label)).toEqual(['“milk”', 'Baking', 'Under USD$10', 'In stock only'])
    expect(chips.map((c) => ({ ...query, ...c.patch }))).toEqual([
      { ...query, q: '' },
      { ...query, aisles: [] },
      { ...query, price: 'any' },
      { ...query, inStock: false },
    ])
  })

  it('calls the default sort "Our picks first": we do not track popularity', () => {
    expect(SORTS.popular).toBe('Our picks first')
  })
})

describe('queryFromForm', () => {
  it('reads a filter form into a first-batch query', () => {
    const form = new FormData()
    form.append('q', ' rice ')
    form.append('aisle', 'baking')
    form.append('aisle', 'canned-goods')
    form.append('price', 'under-10')
    form.append('stock', '1')
    form.append('sort', 'name')
    expect(shopQueryString(queryFromForm(form))).toBe(
      '?q=rice&aisle=baking&aisle=canned-goods&price=under-10&stock=1&sort=name',
    )
    const plain = new FormData()
    plain.append('price', 'any')
    plain.append('sort', 'nonsense')
    expect(queryFromForm(plain)).toEqual(defaultQuery)
  })
})
