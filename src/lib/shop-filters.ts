import type { Product } from '@/lib/types'

/** Category page sorting, filtering and paging. Read from the URL so results can be shared. */

export const SORTS = {
  popular: 'Popular first',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
  name: 'Name, A to Z',
} as const

export const PRICE_BANDS = {
  any: 'Any price',
  'under-10': 'Under USD$10',
  '10-25': 'USD$10 to USD$25',
  'over-25': 'Over USD$25',
} as const

export type Sort = keyof typeof SORTS
export type PriceBand = keyof typeof PRICE_BANDS

export const PAGE_SIZE = 12

export interface ShopQuery {
  sort: Sort
  price: PriceBand
  inStock: boolean
  page: number
}

const pick = <T extends string>(value: unknown, options: Record<T, string>, fallback: T): T =>
  typeof value === 'string' && value in options ? (value as T) : fallback

export function parseShopQuery(params: Record<string, string | string[] | undefined>): ShopQuery {
  const page = Number(params.page)
  return {
    sort: pick(params.sort, SORTS, 'popular'),
    price: pick(params.price, PRICE_BANDS, 'any'),
    inStock: params.stock === '1',
    page: Number.isInteger(page) && page > 0 ? page : 1,
  }
}

export function shopQueryString(q: ShopQuery, page = q.page): string {
  const params = new URLSearchParams()
  if (q.sort !== 'popular') params.set('sort', q.sort)
  if (q.price !== 'any') params.set('price', q.price)
  if (q.inStock) params.set('stock', '1')
  if (page > 1) params.set('page', String(page))
  const s = params.toString()
  return s ? `?${s}` : ''
}

const inBand = (cents: number, band: PriceBand) =>
  band === 'under-10'
    ? cents < 1000
    : band === '10-25'
      ? cents >= 1000 && cents <= 2500
      : band === 'over-25'
        ? cents > 2500
        : true

export function applyShopQuery(products: Product[], q: ShopQuery) {
  const filtered = products
    .filter((p) => inBand(p.priceCents, q.price))
    .filter((p) => !q.inStock || p.status === 'visible')
  const sorted = [...filtered].sort((a, b) => {
    switch (q.sort) {
      case 'price-asc':
        return a.priceCents - b.priceCents
      case 'price-desc':
        return b.priceCents - a.priceCents
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        // Featured first, then in-stock before out-of-stock, then by name.
        return (
          Number(b.featured) - Number(a.featured) ||
          Number(a.status !== 'visible') - Number(b.status !== 'visible') ||
          a.name.localeCompare(b.name)
        )
    }
  })
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const page = Math.min(q.page, pages)
  return {
    total: sorted.length,
    page,
    pages,
    items: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}
