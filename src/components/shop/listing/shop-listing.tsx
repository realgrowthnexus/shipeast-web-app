import { Suspense } from 'react'
import { getAisles, getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getCategories, getSettings } from '@/lib/data/site'
import { earliestCutoff } from '@/lib/home'
import { defaultQuery } from '@/lib/shop-filters'
import { type Scope, scopePath } from '@/lib/shop-listing'
import { BandFind } from './band-find'
import { FindInList } from './find-in-list'
import { ListingResults } from './listing-results'
import { ListingSkeleton } from './listing-skeleton'
import { ShopBand } from './shop-band'

/**
 * The listing shared by `/shop` and `/shop/[department]` (docs/shop-v2/PLAN.md): the crimson
 * department band is static (cached loaders, prerendered in the shell); its find field, the
 * filters and the grid read the URL and the basket cookie, so they stream in inside Suspense.
 */
export async function ShopListing({
  scope,
  searchParams,
}: {
  scope: Scope
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [categories, zones, products, settings, aisles] = await Promise.all([
    getCategories(),
    getActiveZones(),
    getProducts(),
    getSettings(),
    scope.kind === 'department' ? getAisles(scope.category.id) : Promise.resolve([]),
  ])
  const inScope =
    scope.kind === 'all' ? products : products.filter((p) => p.categoryId === scope.category.id)
  const basePath = scopePath(scope)
  const findLabel = `Find in ${scope.kind === 'all' ? 'the shop' : scope.category.name}`
  const listingAisles = aisles.map(({ id, slug, name }) => ({ id, slug, name }))
  return (
    <>
      <ShopBand
        title={scope.kind === 'all' ? 'Shop for family in Jamaica' : scope.category.name}
        description={
          scope.kind === 'all'
            ? 'Bought in Jamaica on the day we deliver. You pay in US dollars.'
            : scope.category.description
        }
        count={inScope.length}
        current={scope.kind === 'all' ? null : scope.category.slug}
        departments={categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count }))}
        allCount={categories.reduce((n, c) => n + c.count, 0)}
        cutoff={earliestCutoff(zones)}
        jmdPerUsd={settings.jmdPerUsd}
        findSlot={
          <Suspense
            fallback={
              <FindInList
                action={basePath}
                label={findLabel}
                query={defaultQuery}
                idPrefix="band"
                tone="onCrimson"
              />
            }
          >
            <BandFind
              action={basePath}
              label={findLabel}
              aisles={listingAisles}
              searchParams={searchParams}
            />
          </Suspense>
        }
      />
      <Suspense fallback={<ListingSkeleton scope={scope} />}>
        <ListingResults scope={scope} searchParams={searchParams} />
      </Suspense>
    </>
  )
}
