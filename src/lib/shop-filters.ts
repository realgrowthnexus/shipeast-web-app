import type { Product } from '@/lib/types'

/**
 * The shop listing's search, filters, sorting and paging (`/shop` and `/shop/[department]`).
 * Every state lives in the URL so a sender can share a link with family. Pure and client-safe:
 * the phone filter sheet imports the facet index helpers to count results live.
 */

export const SORTS = {
  // The key stays `popular` for old links. We don't track popularity: this is the team's
  // `featured` flag, so the label says so.
  popular: 'Our picks first',
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

/** Products per batch. Divides by 2, 3 and 4, so every batch fills its rows. */
export const PAGE_SIZE = 24
export const MAX_QUERY = 80
const MAX_WORDS = 8

export interface ShopQuery {
  q: string
  /** Aisle slugs, in aisle order. */
  aisles: string[]
  price: PriceBand
  inStock: boolean
  sort: Sort
  /** How many batches are shown (cumulative). */
  page: number
}

export const defaultQuery: ShopQuery = {
  q: '',
  aisles: [],
  price: 'any',
  inStock: false,
  sort: 'popular',
  page: 1,
}

export interface ListingAisle {
  id: string
  slug: string
  name: string
}

/** What the filters need to know about the scope. */
export interface ListingContext {
  /** Aisles of the scoped department, in order; [] on `/shop` (no aisle filter there). */
  aisles: ListingAisle[]
  /** Every aisle's name by id, so the find field matches aisle names on any page. */
  aisleNames: Record<string, string>
  /** Department name by category id, for find matching and labels. */
  departments: Record<string, string>
}

const pick = <T extends string>(value: unknown, options: Record<T, string>, fallback: T): T =>
  typeof value === 'string' && value in options ? (value as T) : fallback

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

/** Trimmed, single-spaced and cut to 80 characters. */
export const cleanQuery = (text: string) => text.trim().replace(/\s+/g, ' ').slice(0, MAX_QUERY)

/** Lower-cased words of a query, at most 8. Shared with the site search. */
export const queryWords = (text: string) =>
  text.toLowerCase().split(/\s+/).filter(Boolean).slice(0, MAX_WORDS)

/** True when every word appears in `text` (case-insensitive). */
export const matchesWords = (text: string, words: string[]) => {
  const t = text.toLowerCase()
  return words.every((w) => t.includes(w))
}

export function parseShopQuery(
  params: Record<string, string | string[] | undefined>,
  ctx?: Pick<ListingContext, 'aisles'>,
): ShopQuery {
  const page = Number(first(params.page))
  const raw = params.aisle === undefined ? [] : ([] as string[]).concat(params.aisle)
  const order = ctx?.aisles.map((a) => a.slug) ?? []
  return {
    q: cleanQuery(first(params.q) ?? ''),
    aisles: order.filter((slug) => raw.includes(slug)),
    price: pick(first(params.price), PRICE_BANDS, 'any'),
    inStock: first(params.stock) === '1',
    sort: pick(first(params.sort), SORTS, 'popular'),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  }
}

const FILTER_KEYS = ['q', 'aisles', 'price', 'inStock', 'sort'] as const

/** Applies a patch. Changing any filter or the sort starts again from the first batch. */
export function patchQuery(q: ShopQuery, patch: Partial<ShopQuery> = {}): ShopQuery {
  const next = { ...q, ...patch }
  if (!('page' in patch) && FILTER_KEYS.some((k) => k in patch)) next.page = 1
  return next
}

/** URL params in a fixed order (`q`, `aisle`…, `price`, `stock`, `sort`, `page`), defaults left out. */
export function shopParams(q: ShopQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (q.q) params.set('q', q.q)
  for (const a of q.aisles) params.append('aisle', a)
  if (q.price !== 'any') params.set('price', q.price)
  if (q.inStock) params.set('stock', '1')
  if (q.sort !== 'popular') params.set('sort', q.sort)
  if (q.page > 1) params.set('page', String(q.page))
  return params
}

/** `?q=…&aisle=…` or `''`. */
export function shopQueryString(q: ShopQuery, patch?: Partial<ShopQuery>): string {
  const s = shopParams(patchQuery(q, patch)).toString()
  return s ? `?${s}` : ''
}

export function shopHref(basePath: string, q: ShopQuery, patch?: Partial<ShopQuery>): string {
  return basePath + shopQueryString(q, patch)
}

/** One removable chip per active value, each with the patch that removes only itself. */
export function activeFilters(
  q: ShopQuery,
  ctx: Pick<ListingContext, 'aisles'>,
): { key: string; label: string; patch: Partial<ShopQuery> }[] {
  const chips: { key: string; label: string; patch: Partial<ShopQuery> }[] = []
  if (q.q) chips.push({ key: 'q', label: `“${q.q}”`, patch: { q: '' } })
  for (const slug of q.aisles) {
    const aisle = ctx.aisles.find((a) => a.slug === slug)
    if (aisle)
      chips.push({
        key: `aisle-${slug}`,
        label: aisle.name,
        patch: { aisles: q.aisles.filter((s) => s !== slug) },
      })
  }
  if (q.price !== 'any')
    chips.push({ key: 'price', label: PRICE_BANDS[q.price], patch: { price: 'any' } })
  if (q.inStock) chips.push({ key: 'stock', label: 'In stock only', patch: { inStock: false } })
  return chips
}

/** Number of active filter values (aisles, price band, in stock). The find text is not counted. */
export const activeCount = (q: Pick<ShopQuery, 'aisles' | 'price' | 'inStock'>) =>
  q.aisles.length + (q.price !== 'any' ? 1 : 0) + (q.inStock ? 1 : 0)

export const inBand = (cents: number, band: PriceBand) =>
  band === 'under-10'
    ? cents < 1000
    : band === '10-25'
      ? cents >= 1000 && cents <= 2500
      : band === 'over-25'
        ? cents > 2500
        : true

const aisleSlugOf = (p: Product, ctx: Pick<ListingContext, 'aisles'>) =>
  (p.aisleId && ctx.aisles.find((a) => a.id === p.aisleId)?.slug) || null

/** The text the find field searches: name, size, description, aisle and department. */
const findText = (p: Product, ctx: ListingContext) =>
  `${p.name} ${p.size} ${p.description} ${(p.aisleId && ctx.aisleNames[p.aisleId]) || ''} ${ctx.departments[p.categoryId] ?? ''}`

const matchesFind = (p: Product, q: ShopQuery, ctx: ListingContext) =>
  !q.q || matchesWords(findText(p, ctx), queryWords(q.q))

/** Products that match the find text only (the base for the phone sheet's facet index). */
export const narrowByFind = (products: Product[], q: ShopQuery, ctx: ListingContext) =>
  products.filter((p) => matchesFind(p, q, ctx))

/** Every active filter, optionally skipping one group (for that group's facet counts). */
export function matchesQuery(
  p: Product,
  q: ShopQuery,
  ctx: ListingContext,
  skip?: 'aisles' | 'price' | 'stock',
): boolean {
  if (!matchesFind(p, q, ctx)) return false
  if (skip !== 'aisles' && q.aisles.length) {
    const slug = aisleSlugOf(p, ctx)
    if (!slug || !q.aisles.includes(slug)) return false
  }
  if (skip !== 'price' && !inBand(p.priceCents, q.price)) return false
  if (skip !== 'stock' && q.inStock && p.status !== 'visible') return false
  return true
}

const out = (p: Product) => Number(p.status !== 'visible')

/** Out of stock always goes last (a sender can't buy it), then the chosen sort, then by name. */
function compare(sort: Sort) {
  return (a: Product, b: Product) => {
    const bySort =
      sort === 'price-asc'
        ? a.priceCents - b.priceCents
        : sort === 'price-desc'
          ? b.priceCents - a.priceCents
          : sort === 'popular'
            ? Number(b.featured) - Number(a.featured)
            : 0
    return out(a) - out(b) || bySort || a.name.localeCompare(b.name)
  }
}

export function applyShopQuery(products: Product[], q: ShopQuery, ctx: ListingContext) {
  const sorted = products.filter((p) => matchesQuery(p, q, ctx)).sort(compare(q.sort))
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const page = Math.min(q.page, pages)
  const items = sorted.slice(0, page * PAGE_SIZE)
  return {
    total: sorted.length,
    shown: items.length,
    page,
    pages,
    hasMore: items.length < sorted.length,
    items,
  }
}

export interface Facets {
  aisles: Record<string, number>
  price: Record<PriceBand, number>
  inStock: number
}

/** How many products each option would show, with every other active filter applied. */
export function facetCounts(products: Product[], q: ShopQuery, ctx: ListingContext): Facets {
  const aisles: Record<string, number> = Object.fromEntries(ctx.aisles.map((a) => [a.slug, 0]))
  for (const p of products.filter((p) => matchesQuery(p, q, ctx, 'aisles'))) {
    const slug = aisleSlugOf(p, ctx)
    if (slug) aisles[slug] += 1
  }
  const forPrice = products.filter((p) => matchesQuery(p, q, ctx, 'price'))
  const price = Object.fromEntries(
    (Object.keys(PRICE_BANDS) as PriceBand[]).map((band) => [
      band,
      forPrice.filter((p) => inBand(p.priceCents, band)).length,
    ]),
  ) as Record<PriceBand, number>
  const inStock = products.filter(
    (p) => matchesQuery(p, q, ctx, 'stock') && p.status === 'visible',
  ).length
  return { aisles, price, inStock }
}

/** Compact rows for the phone sheet's live count; built from products narrowed by scope and find. */
export type FacetRow = [aisleSlug: string | null, priceCents: number, inStock: 0 | 1]

export function toFacetIndex(products: Product[], ctx: ListingContext): FacetRow[] {
  return products.map((p) => [aisleSlugOf(p, ctx), p.priceCents, p.status === 'visible' ? 1 : 0])
}

export function countFacetIndex(
  rows: FacetRow[],
  draft: Pick<ShopQuery, 'aisles' | 'price' | 'inStock'>,
): number {
  return rows.filter(
    ([aisle, cents, stock]) =>
      (!draft.aisles.length || (aisle !== null && draft.aisles.includes(aisle))) &&
      inBand(cents, draft.price) &&
      (!draft.inStock || stock === 1),
  ).length
}

/**
 * The query a filter form describes (checked aisles, price, stock and its hidden `q` and
 * `sort`), from the first batch. Takes FormData or anything shaped like it.
 */
export function queryFromForm(data: {
  get(name: string): unknown
  getAll(name: string): unknown[]
}): ShopQuery {
  const text = (name: string) => {
    const v = data.get(name)
    return typeof v === 'string' ? v : ''
  }
  return {
    q: cleanQuery(text('q')),
    aisles: [...new Set(data.getAll('aisle').filter((v): v is string => typeof v === 'string'))],
    price: pick(text('price'), PRICE_BANDS, 'any'),
    inStock: text('stock') === '1',
    sort: pick(text('sort'), SORTS, 'popular'),
    page: 1,
  }
}
