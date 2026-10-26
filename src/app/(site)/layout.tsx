import { CookieBanner } from '@/components/site/cookie-banner'
import { DemoBanner } from '@/components/site/demo-banner'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getActiveZones, getSettings } from '@/lib/data/site'
import { isDemoMode } from '@/lib/env'
import { site } from '@/lib/site'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const [settings, zones] = await Promise.all([getSettings(), getActiveZones()])
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
        className="sr-only z-50 rounded-md bg-white px-4 py-3 font-semibold text-crimson focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {isDemoMode() && <DemoBanner />}
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter whatsapp={settings.whatsapp} />
      <CookieBanner />
    </>
  )
}
