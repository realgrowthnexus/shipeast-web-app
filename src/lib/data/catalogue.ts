import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import type { Catalogue } from '@/lib/basket/pricing'
import * as demo from '@/lib/demo'
import type { Basket, Category, Product } from '@/lib/types'
import { getBaskets, getZones, type BasketSummary } from './site'

/** Shop reads. Hidden products never leave this module except for basket pricing. */

const listed = (p: Product) => p.status !== 'hidden'

export async function getProducts(): Promise<Product[]> {
  'use cache'
  cacheTag('catalogue')
  cacheLife('hours')
  return demo.products.filter(listed)
}

export async function getProduct(slug: string): Promise<Product | null> {
  return (await getProducts()).find((p) => p.slug === slug) ?? null
}

export async function getCategory(slug: string): Promise<Category | null> {
  'use cache'
  cacheTag('catalogue')
  cacheLife('hours')
  return demo.categories.find((c) => c.slug === slug) ?? null
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
  'use cache'
  cacheTag('catalogue', 'zones', 'promos')
  cacheLife('minutes')
  return {
    products: demo.products,
    baskets: demo.baskets,
    zones: await getZones(),
    promos: demo.promos,
  }
}

export type SearchHit =
  | { kind: 'product'; product: Product; category: Category | undefined }
  | { kind: 'basket'; basket: Basket }

/** Plain word match over names, sizes, descriptions and category names. Every word must match. */
export async function searchCatalogue(query: string): Promise<SearchHit[]> {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 8)
  if (!words.length) return []
  const [products, baskets] = await Promise.all([getProducts(), getBaskets()])
  const matches = (text: string) => words.every((w) => text.toLowerCase().includes(w))

  const basketHits: SearchHit[] = baskets
    .filter(({ basket }) => matches(`${basket.name} ${basket.description}`))
    .map(({ basket }) => ({ kind: 'basket', basket }))
  const productHits: SearchHit[] = products
    .map((product) => ({
      product,
      category: demo.categories.find((c) => c.id === product.categoryId),
    }))
    .filter(({ product, category }) =>
      matches(`${product.name} ${product.size} ${product.description} ${category?.name ?? ''}`),
    )
    .map((hit) => ({ kind: 'product', ...hit }))
  return [...basketHits, ...productHits]
}
