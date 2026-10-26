import type { MetadataRoute } from 'next'
import { isDemoMode } from '@/lib/env'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Keep the placeholder preview out of search results until the real catalogue is live.
  if (isDemoMode()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/admin', '/driver', '/checkout', '/track/', '/styleguide'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
