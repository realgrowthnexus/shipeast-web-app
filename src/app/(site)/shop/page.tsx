import type { Metadata } from 'next'
import { ShopBaskets } from '@/components/pages/shop/shop-baskets'
import { ShopFrontDoor } from '@/components/pages/shop/front-door'
import { CantFindBanner, HowWeShop } from '@/components/pages/shop/shop-promises'
import { ShopNotes } from '@/components/pages/shop/shop-notes'
import { ProductShelf, shelfLeads, shelfProducts } from '@/components/shop/product-shelf'
import { buildBasketRows } from '@/lib/baskets'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getSettings } from '@/lib/data/site'
import { earliestCutoff, joinParishes } from '@/lib/home'
import { aisleSample, aisleSampleLine, priceCheckLine, priceCheckRange } from '@/lib/shop-front'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Groceries, household, pharmacy and baby items bought in Jamaica and delivered to your family the same day.',
}

/** The staples shelf needs at least this many featured products in stock. */
const MIN_STAPLES = 3

/** A price-check line for a set of products, or null when no date is known. */
const checkLine = (products: Parameters<typeof priceCheckRange>[0]) => {
  const range = priceCheckRange(products)
  return range ? priceCheckLine(range) : null
}

/**
 * The front door of a well-run Jamaican store: type what you need or walk into an aisle, then
 * the shelves. Every loader is cached, so the page prerenders; the cut-off countdown and Add
 * buttons are the only client parts.
 */
export default async function ShopPage() {
  const [settings, categories, baskets, products, zones] = await Promise.all([
    getSettings(),
    getCategories(),
    getBaskets({ featured: true }),
    getProducts(),
    getActiveZones(),
  ])
  const shelves = categories.map((c) => ({ category: c, products: shelfProducts(products, c.id) }))
  const staples = shelfProducts(products.filter((p) => p.featured && p.status === 'visible'))
  const categoryNames = Object.fromEntries(categories.map((c) => [c.id, c.name]))

  return (
    <>
      <ShopFrontDoor
        aisles={shelves.map(({ category: c, products: shelf }) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          count: c.count,
          sample: aisleSampleLine(aisleSample(shelf), c.count),
        }))}
        notes={
          <ShopNotes
            parishList={joinParishes(zones.map((z) => z.parish))}
            cutoff={earliestCutoff(zones)}
            jmdPerUsd={settings.jmdPerUsd}
            priceCheck={checkLine(products)}
          />
        }
      />

      {baskets.length > 0 && (
        <ShopBaskets
          rows={buildBasketRows(baskets, products).slice(0, 3)}
          jmdPerUsd={settings.jmdPerUsd}
        />
      )}

      {staples.length >= MIN_STAPLES && (
        <ProductShelf
          id="aisle-staples"
          title="Everyday staples"
          lead="A few basics from each department, picked by our team."
          note={checkLine(staples.slice(0, 5)) ?? undefined}
          products={staples}
          jmdPerUsd={settings.jmdPerUsd}
          categoryNames={categoryNames}
        />
      )}

      {/* One shelf per department, like the aisles of a store */}
      {shelves.map(({ category: c, products: shelf }, i) => (
        <ProductShelf
          key={c.id}
          id={`aisle-${c.slug}`}
          title={c.name}
          lead={shelfLeads[c.slug] ?? c.description}
          note={checkLine(shelf) ?? undefined}
          href={`/shop/${c.slug}`}
          products={shelf}
          jmdPerUsd={settings.jmdPerUsd}
          divided={i > 0 || staples.length >= MIN_STAPLES}
        />
      ))}

      <HowWeShop />

      <CantFindBanner itemRequests={settings.features.item_requests} />
    </>
  )
}
