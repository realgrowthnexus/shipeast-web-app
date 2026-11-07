import 'server-only'
import type { Catalogue } from '@/lib/basket/pricing'
import { matchesWords, queryWords } from '@/lib/shop-filters'
import type { Aisle, Basket, Category, Product } from '@/lib/types'
import { getBaskets, getZones, type BasketSummary } from './site'
import { loadCatalogue, loadPromos } from './source'

/** Shop reads. Hidden products never leave this module except for basket pricing. */

const listed = (p: Product) => p.status !== 'hidden'

export async function getProducts(): Promise<Product[]> {
  return (await loadCatalogue()).products.filter(listed)
}

export async function getProduct(slug: string): Promise<Product | null> {
  return (await getProducts()).find((p) => p.slug === slug) ?? null
}

/** Aisles of one department in sort order, each with its count of listed products. Empty aisles are left out. */
export async function getAisles(categoryId: string): Promise<(Aisle & { count: number })[]> {
  const { aisles, products } = await loadCatalogue()
  return aisles
    .filter((a) => a.categoryId === categoryId)
    .sort((a, b) => a.sort - b.sort)
    .map((a) => ({ ...a, count: products.filter((p) => listed(p) && p.aisleId === a.id).length }))
    .filter((a) => a.count > 0)
}

/** Every visible aisle's name by id (the find field matches aisle names). */
export async function getAisleNames(): Promise<Record<string, string>> {
  return Object.fromEntries((await loadCatalogue()).aisles.map((a) => [a.id, a.name]))
}

export async function getCategory(slug: string): Promise<Category | null> {
  return (await loadCatalogue()).categories.find((c) => c.slug === slug) ?? null
}

export async function getBasket(slug: string): Promise<
  | (BasketSummary & {
      contents: { product: Product; quantity: number }[]
    })
  | null
> {
  const summary = (await getBaskets()).find((s) => s.basket.slug === slug)
  if (!summary) return null
  const products = await getProducts()
  const contents = summary.basket.items.flatMap((i) => {
    const product = products.find((p) => p.id === i.productId)
    return product ? [{ product, quantity: i.quantity }] : []
  })
  return { ...summary, contents }
}

/** Everything the basket needs to price itself, including hidden items already in a basket. */
export async function getCatalogue(): Promise<Catalogue> {
  const [{ products, baskets }, zones, promos] = await Promise.all([
    loadCatalogue(),
    getZones(),
    loadPromos(),
  ])
  return { products, baskets, zones, promos }
}

export type SearchHit =
  | { kind: 'product'; product: Product; category: Category | undefined }
  | { kind: 'basket'; basket: Basket }

/** Plain word match over names, sizes, descriptions and category names. Every word must match. */
export async function searchCatalogue(query: string): Promise<SearchHit[]> {
  const words = queryWords(query)
  if (!words.length) return []
  const [products, baskets, { categories }] = await Promise.all([
    getProducts(),
    getBaskets(),
    loadCatalogue(),
  ])
  const matches = (text: string) => matchesWords(text, words)

  const basketHits: SearchHit[] = baskets
    .filter(({ basket }) => matches(`${basket.name} ${basket.description}`))
    .map(({ basket }) => ({ kind: 'basket', basket }))
  const productHits: SearchHit[] = products
    .map((product) => ({
      product,
      category: categories.find((c) => c.id === product.categoryId),
    }))
    .filter(({ product, category }) =>
      matches(`${product.name} ${product.size} ${product.description} ${category?.name ?? ''}`),
    )
    .map((hit) => ({ kind: 'product', ...hit }))
  return [...basketHits, ...productHits]
}
