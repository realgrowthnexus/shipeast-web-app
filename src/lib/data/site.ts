import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import * as demo from '@/lib/demo'
import type { Basket, Category, DeliveryZone, Faq, Product, SiteSettings } from '@/lib/types'

/**
 * Read-only data for the public site. Every page goes through here, so switching from demo
 * data to Supabase (Phase 3) happens in one place. Results are cached and tagged so the
 * admin panel can refresh them after an edit.
 */

export async function getSettings(): Promise<SiteSettings> {
  'use cache'
  cacheTag('settings')
  cacheLife('hours')
  return demo.settings
}

export async function getZones(): Promise<DeliveryZone[]> {
  'use cache'
  cacheTag('zones')
  cacheLife('hours')
  return [...demo.zones].sort((a, b) => a.sort - b.sort)
}

export async function getActiveZones(): Promise<DeliveryZone[]> {
  return (await getZones()).filter((z) => z.active)
}

export async function getFaqs(): Promise<Faq[]> {
  'use cache'
  cacheTag('faqs')
  cacheLife('hours')
  return [...demo.faqs].sort((a, b) => a.sort - b.sort)
}

export async function getCategories(): Promise<(Category & { count: number })[]> {
  'use cache'
  cacheTag('catalogue')
  cacheLife('hours')
  return [...demo.categories]
    .sort((a, b) => a.sort - b.sort)
    .map((c) => ({
      ...c,
      count: demo.products.filter((p) => p.categoryId === c.id && p.status !== 'hidden').length,
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
  'use cache'
  cacheTag('catalogue')
  cacheLife('hours')
  return demo.baskets
    .filter((b) => (filter?.featured ? b.featured : true))
    .filter((b) => (filter?.occasion ? filter.occasion.includes(b.occasion) : true))
    .map((b) => summarise(b, demo.products))
}
