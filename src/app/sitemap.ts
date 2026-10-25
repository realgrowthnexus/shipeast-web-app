import type { MetadataRoute } from 'next'
import { LEGAL_SLUGS } from '@/lib/data/legal'
import { site } from '@/lib/site'

const pages = ['', '/how-it-works', '/delivery', '/about', '/faq', '/contact', '/monthly', '/gifts']

export default function sitemap(): MetadataRoute.Sitemap {
  // Shop, product and basket URLs join this list in Phase 3.
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${site.url}/legal/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
