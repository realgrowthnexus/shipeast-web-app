import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import * as demo from '@/lib/demo'
import { isDemoMode } from '@/lib/env'
import { publicImageUrl, supabaseAdmin } from '@/lib/supabase/admin'
import type {
  Basket,
  Category,
  DeliveryZone,
  Faq,
  Product,
  PromoCode,
  SiteSettings,
} from '@/lib/types'

/**
 * The one place that decides where shop data comes from: the demo seed data, or Supabase once
 * its keys are set. Everything else in `src/lib/data` builds on these loaders, so pages never
 * know the difference. Each loader is cached and tagged for the admin panel to refresh.
 */

async function rows<T>(
  query: PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
) {
  const { data, error } = await query
  if (error) throw new Error(`Supabase read failed: ${error.message}`)
  return data ?? []
}

export async function loadSettings(): Promise<SiteSettings> {
  'use cache'
  cacheTag('settings')
  cacheLife('hours')
  if (isDemoMode()) return demo.settings

  const list = await rows<{ key: string; value: unknown }>(
    supabaseAdmin().from('settings').select('key, value'),
  )
  const get = <T>(key: string, fallback: T): T =>
    (list.find((r) => r.key === key)?.value as T | undefined) ?? fallback
  const contact = get('contact', { email: '', phone: '', whatsapp: '' })
  const bank = get<Record<string, string>>('bank_transfer', {})
  return {
    jmdPerUsd: Number(get('exchange_rate', { jmd_per_usd: demo.settings.jmdPerUsd }).jmd_per_usd),
    email: contact.email || demo.settings.email,
    phone: contact.phone ?? '',
    whatsapp: contact.whatsapp ?? '',
    bankTransferHoursToPay: Number(get('bank_transfer_hours', 48)),
    bankTransfer: {
      bankName: bank.bank_name ?? '',
      accountName: bank.account_name ?? '',
      accountNumber: bank.account_number ?? '',
      branch: bank.branch ?? '',
      accountType: bank.account_type ?? '',
      currency: bank.currency || 'USD',
      notes: bank.notes ?? '',
    },
    features: { ...demo.settings.features, ...get('features', {}) },
  }
}

export async function loadZones(): Promise<DeliveryZone[]> {
  'use cache'
  cacheTag('zones')
  cacheLife('hours')
  if (isDemoMode()) return [...demo.zones].sort((a, b) => a.sort - b.sort)

  const data = await rows<{
    id: string
    parish: string
    active: boolean
    fee_cents: number
    speed: DeliveryZone['speed']
    cutoff_time: string
    min_order_cents: number
    sort: number
  }>(supabaseAdmin().from('delivery_zones').select('*').order('sort'))
  return data.map((z) => ({
    id: z.id,
    parish: z.parish,
    active: z.active,
    feeCents: z.fee_cents,
    speed: z.speed,
    cutoffTime: z.cutoff_time.slice(0, 5),
    minOrderCents: z.min_order_cents,
    sort: z.sort,
  }))
}

export async function loadFaqs(): Promise<Faq[]> {
  'use cache'
  cacheTag('faqs')
  cacheLife('hours')
  if (isDemoMode()) return [...demo.faqs].sort((a, b) => a.sort - b.sort)

  const data = await rows<{
    id: string
    group_name: Faq['group']
    question: string
    answer: string
    sort: number
  }>(supabaseAdmin().from('faqs').select('*').eq('visible', true).order('sort'))
  // Until ShipEast adds its own, the drafted answers stay up rather than an empty page.
  if (!data.length) return [...demo.faqs].sort((a, b) => a.sort - b.sort)
  return data.map((f) => ({ ...f, group: f.group_name }))
}

export interface CatalogueData {
  categories: Category[]
  /** Every product, hidden ones included, so old basket lines can still be priced. */
  products: Product[]
  baskets: Basket[]
}

export async function loadCatalogue(): Promise<CatalogueData> {
  'use cache'
  cacheTag('catalogue')
  cacheLife('minutes')
  if (isDemoMode()) {
    return { categories: demo.categories, products: demo.products, baskets: demo.baskets }
  }

  const db = supabaseAdmin()
  const [categories, products, baskets] = await Promise.all([
    rows<Category & { visible: boolean }>(
      db.from('categories').select('id, slug, name, description, sort, visible').order('sort'),
    ),
    rows<{
      id: string
      slug: string
      name: string
      size: string
      description: string
      category_id: string
      price_cents: number
      status: Product['status']
      image_path: string | null
      price_checked_at: string
      featured: boolean
    }>(db.from('products').select('*').order('name')),
    rows<{
      id: string
      slug: string
      name: string
      description: string
      price_cents: number
      occasion: Basket['occasion']
      status: Product['status']
      image_path: string | null
      featured: boolean
      basket_items: { product_id: string; quantity: number }[]
    }>(db.from('baskets').select('*, basket_items(product_id, quantity)').order('sort')),
  ])

  return {
    categories: categories
      .filter((c) => c.visible)
      .map(({ id, slug, name, description, sort }) => ({ id, slug, name, description, sort })),
    products: products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      size: p.size,
      description: p.description,
      categoryId: p.category_id,
      priceCents: p.price_cents,
      status: p.status,
      imagePath: publicImageUrl('products', p.image_path),
      priceCheckedAt: p.price_checked_at,
      featured: p.featured,
    })),
    baskets: baskets
      .filter((b) => b.status === 'visible')
      .map((b) => ({
        id: b.id,
        slug: b.slug,
        name: b.name,
        description: b.description,
        priceCents: b.price_cents,
        occasion: b.occasion,
        featured: b.featured,
        imagePath: publicImageUrl('products', b.image_path),
        items: b.basket_items.map((i) => ({ productId: i.product_id, quantity: i.quantity })),
      })),
  }
}

export async function loadPromos(): Promise<PromoCode[]> {
  'use cache'
  cacheTag('promos')
  cacheLife('minutes')
  if (isDemoMode()) return demo.promos

  const data = await rows<{
    code: string
    description: string
    percent_off: number | null
    amount_off_cents: number | null
    min_order_cents: number
    starts_at: string | null
    ends_at: string | null
    active: boolean
  }>(supabaseAdmin().from('promo_codes').select('*').eq('active', true))
  return data.map((p) => ({
    code: p.code,
    description: p.description,
    percentOff: p.percent_off,
    amountOffCents: p.amount_off_cents,
    minOrderCents: p.min_order_cents,
    startsAt: p.starts_at,
    endsAt: p.ends_at,
    active: p.active,
  }))
}
