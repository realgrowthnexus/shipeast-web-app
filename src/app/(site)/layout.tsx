import { preconnect } from 'react-dom'
import { MotionProvider } from '@/components/motion/motion-provider'
import { CookieBanner } from '@/components/site/cookie-banner'
import { DemoBanner } from '@/components/site/demo-banner'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getActiveZones, getCategories, getSettings } from '@/lib/data/site'
import { joinParishes } from '@/lib/home'
import { isDemoMode } from '@/lib/env'
import { site } from '@/lib/site'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  // Every photo hero loads from Unsplash: open the connection while the HTML streams.
  preconnect('https://images.unsplash.com')
  const [settings, zones, categories] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
  ])
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.company,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    address: { '@type': 'PostalAddress', addressRegion: 'St. Thomas', addressCountry: 'JM' },
    areaServed: zones.map((z) => ({ '@type': 'AdministrativeArea', name: z.parish })),
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <a
        href="#main"
        className="sr-only z-overlay rounded-md bg-surface px-4 py-3 font-semibold text-crimson focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <MotionProvider>
        {isDemoMode() && <DemoBanner />}
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter
          settings={settings}
          categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
          parishList={joinParishes(zones.map((z) => z.parish))}
        />
        <CookieBanner />
      </MotionProvider>
    </>
  )
}
