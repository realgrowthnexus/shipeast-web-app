import 'server-only'
import type { Basket, DeliveryZone, Faq, Product, SiteSettings } from '@/lib/types'
import { loadCatalogue, loadFaqs, loadSettings, loadZones } from './source'

/** Read-only data for the public site. Loading and caching live in `./source`. */

export async function getSettings(): Promise<SiteSettings> {
  return loadSettings()
}

export async function getZones(): Promise<DeliveryZone[]> {
  return loadZones()
}

export async function getActiveZones(): Promise<DeliveryZone[]> {
  return (await getZones()).filter((z) => z.active)
}

export async function getFaqs(): Promise<Faq[]> {
  return loadFaqs()
}

export async function getCategories() {
  const { categories, products } = await loadCatalogue()
  return [...categories]
    .sort((a, b) => a.sort - b.sort)
    .map((c) => ({
      ...c,
      count: products.filter((p) => p.categoryId === c.id && p.status !== 'hidden').length,
    }))
}

export interface BasketSummary {
  basket: Basket
  itemCount: number
  separateCents: number
}

function summarise(basket: Basket, products: Product[]): BasketSummary {
  const byId = new Map(products.map((p) => [p.id, p]))
  return {
    basket,
    itemCount: basket.items.reduce((n, i) => n + i.quantity, 0),
    separateCents: basket.items.reduce(
      (sum, i) => sum + (byId.get(i.productId)?.priceCents ?? 0) * i.quantity,
      0,
    ),
  }
}

export async function getBaskets(filter?: { featured?: boolean; occasion?: Basket['occasion'][] }) {
  const { baskets, products } = await loadCatalogue()
  return baskets
    .filter((b) => (filter?.featured ? b.featured : true))
    .filter((b) => (filter?.occasion ? filter.occasion.includes(b.occasion) : true))
    .map((b) => summarise(b, products))
}
