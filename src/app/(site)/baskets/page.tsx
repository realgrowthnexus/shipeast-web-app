import { Gift } from 'lucide-react'
import type { Metadata } from 'next'
import { AfterYouOrder } from '@/components/pages/baskets/after-you-order'
import { BasketRowCard } from '@/components/pages/baskets/basket-row'
import { BasketsHero } from '@/components/pages/baskets/baskets-hero'
import { Occasions } from '@/components/pages/baskets/occasions'
import { ClosingPanel } from '@/components/site/closing-panel'
import { SectionHeader } from '@/components/site/section'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/card'
import { buildBasketRows } from '@/lib/baskets'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getSettings } from '@/lib/data/site'
import { earliestCutoff } from '@/lib/home'

export const metadata: Metadata = {
  title: 'Ready-made baskets',
  description:
    'Family food baskets, baby care packs, pharmacy packs and Christmas hampers. See every item and what you save, pay in US dollars, and we deliver in St. Thomas and Kingston.',
}

/**
 * A shop price board, then every basket opened up: its items at today's shop price and the
 * saving worked out in the open. Every loader is cached, so the page prerenders; the cut-off
 * countdown and Add to basket are the only client parts.
 */
export default async function BasketsPage() {
  const [settings, zones, summaries, products] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getBaskets(),
    getProducts(),
  ])
  const rows = buildBasketRows(summaries, products)
  const cutoff = earliestCutoff(zones)

  return (
    <>
      <BasketsHero rows={rows} jmdPerUsd={settings.jmdPerUsd} cutoff={cutoff} />

      <section aria-labelledby="whats-inside" className="section">
        <div className="mx-auto max-w-page gutter">
          {rows.length > 0 ? (
            <>
              <SectionHeader
                id="whats-inside"
                title="What’s inside each basket"
                lead="Every item at today’s shop price, so you can see exactly what you save."
                className="mb-8 lg:mb-12"
              />
              <ul className="flex flex-col gap-6 lg:gap-8">
                {rows.map((row) => (
                  <li key={row.summary.basket.id}>
                    <BasketRowCard row={row} jmdPerUsd={settings.jmdPerUsd} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-2xl text-small text-ink-muted">
                Shop prices are today’s prices for the same items and quantities.
              </p>
            </>
          ) : (
            <>
              <h2 id="whats-inside" className="sr-only">
                Baskets
              </h2>
              <EmptyState
                icon={<Gift aria-hidden />}
                title="New baskets are on the way"
                action={<ButtonLink href="/shop">Shop single items</ButtonLink>}
              >
                In the meantime you can build your own basket from the shop.
              </EmptyState>
            </>
          )}
        </div>
      </section>

      {rows.length > 0 && (
        <>
          <AfterYouOrder />
          <Occasions monthly={settings.features.monthly_orders} />
        </>
      )}

      <ClosingPanel
        id="closing-title"
        title="Rather choose every item yourself?"
        primary={{ href: '/shop', label: 'Build your own basket' }}
        secondary={{ href: '/how-it-works', label: 'How it works' }}
      >
        Shop groceries, household goods, pharmacy and baby items one by one and fill the basket your
        way.
      </ClosingPanel>
    </>
  )
}
