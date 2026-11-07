import type { Metadata } from 'next'
import { AboutDetails } from '@/components/pages/about/details'
import { AboutHero } from '@/components/pages/about/hero'
import { AboutPromise } from '@/components/pages/about/promise'
import { AboutStory } from '@/components/pages/about/story'
import { AboutWhere } from '@/components/pages/about/where'
import { HomeClosing } from '@/components/pages/home/closing'
import { getActiveZones, getSettings } from '@/lib/data/site'
import { earliestCutoff, joinParishes } from '@/lib/home'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About ShipEast',
  description: `${site.company}: a courier and errand business in St. Thomas, Jamaica, also serving Kingston. We shop locally for families of Jamaicans abroad and deliver with photo proof.`,
}

/**
 * The business explained through its own name, then what it does and won't do, where it works
 * and exactly who you are dealing with. Both loaders are cached, so the page prerenders.
 */
export default async function AboutPage() {
  const [settings, zones] = await Promise.all([getSettings(), getActiveZones()])
  const parishList = joinParishes(zones.map((z) => z.parish))
  const cutoff = earliestCutoff(zones)
  const bankTransfer = Boolean(settings.bankTransfer.bankName)

  return (
    <>
      <AboutHero />
      <AboutStory parishList={parishList} />
      <AboutPromise parishList={parishList} bankTransfer={bankTransfer} />
      <AboutWhere zones={zones} parishList={parishList} earliestCutoff={cutoff} />
      <AboutDetails settings={settings} parishList={parishList} />
      <HomeClosing parishList={parishList} earliestCutoff={cutoff} />
    </>
  )
}
