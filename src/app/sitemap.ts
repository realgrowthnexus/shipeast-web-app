import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/data/catalogue'
import { LEGAL_SLUGS } from '@/lib/data/legal'
import { getBaskets, getCategories, getSettings } from '@/lib/data/site'
import { site } from '@/lib/site'

const pages = [
  '',
  '/shop',
  '/baskets',
  '/how-it-works',
  '/delivery',
  '/about',
  '/photo-credits',
  '/faq',
  '/contact',
  '/monthly',
  '/gifts',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, categories, products, baskets] = await Promise.all([
    getSettings(),
    getCategories(),
    getProducts(),
    getBaskets(),
  ])
  const entry = (
    path: string,
    priority: number,
    changeFrequency: 'daily' | 'weekly' | 'yearly',
  ) => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  })
  return [
    ...pages.map((path) => entry(path, path === '' ? 1 : 0.7, 'weekly')),
    ...(settings.features.item_requests ? [entry('/request', 0.5, 'weekly')] : []),
    ...categories.map((c) => entry(`/shop/${c.slug}`, 0.8, 'daily')),
    ...products.map((p) => entry(`/product/${p.slug}`, 0.6, 'daily')),
    ...baskets.map(({ basket }) => entry(`/baskets/${basket.slug}`, 0.7, 'weekly')),
    ...LEGAL_SLUGS.map((slug) => entry(`/legal/${slug}`, 0.3, 'yearly')),
  ]
}
