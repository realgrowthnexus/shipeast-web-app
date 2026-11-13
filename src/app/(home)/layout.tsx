import { Bricolage_Grotesque, Caveat } from 'next/font/google'
import type { ReactNode } from 'react'
import { preconnect } from 'react-dom'
import { HomeFooter } from '@/components/home/footer'
import { HomeHeader } from '@/components/home/header'
import { HomeHydrated } from '@/components/home/hydrated'
import { MotionProvider } from '@/components/motion/motion-provider'
import { CookieBanner } from '@/components/site/cookie-banner'
import { DemoBanner } from '@/components/site/demo-banner'
import { getActiveZones, getCategories, getSettings } from '@/lib/data/site'
import { isDemoMode } from '@/lib/env'
import { earliestCutoff, joinParishes } from '@/lib/home'
import { site } from '@/lib/site'

/** Headings on the home page: a chunky grotesque that reads like painted shop signage. */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

/** One handwritten accent, for the gift note only. */
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

/**
 * The home page has its own shell (docs/home-v3/PLAN.md): its own header, footer, fonts and
 * the cream page colour. Every other page keeps the (site) layout untouched.
 */
export default async function HomeLayout({ children }: { children: ReactNode }) {
  preconnect('https://images.unsplash.com')
  const [settings, zones, categories] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
  ])
  const parishList = joinParishes(zones.map((z) => z.parish))
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
    <div
      data-home=""
      className={`${bricolage.variable} ${caveat.variable} flex flex-1 flex-col bg-cream text-ink`}
    >
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
      {/* Scroll reveals and lazy photos start hidden; without JavaScript they never would show. */}
      <noscript>
        <style>{'[data-reveal],[data-fade]{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <MotionProvider>
        <HomeHydrated />
        {isDemoMode() && <DemoBanner />}
        <HomeHeader parishList={parishList} cutoff={earliestCutoff(zones)} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <HomeFooter
          settings={settings}
          categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
          parishList={parishList}
        />
        <CookieBanner />
      </MotionProvider>
    </div>
  )
}
