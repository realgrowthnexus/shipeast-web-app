import { Suspense } from 'react'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getCategories } from '@/lib/data/site'
import { earliestCutoff } from '@/lib/home'
import { priceCheckLine, priceCheckRange } from '@/lib/shop-front'
import type { Scope } from '@/lib/shop-listing'
import { DepartmentBand } from './department-band'
import { EdgeStrip } from './edge-strip'
import { ListingResults } from './listing-results'
import { ListingSkeleton } from './listing-skeleton'

/**
 * The big-mart listing shared by `/shop` and `/shop/[department]`: the crimson department band
 * and the edge strip are static (cached loaders, prerendered in the shell); the filters and the
 * grid read the URL and the basket cookie, so they stream in inside one Suspense boundary.
 */
export async function ShopListing({
  scope,
  searchParams,
}: {
  scope: Scope
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [categories, zones, products] = await Promise.all([
    getCategories(),
    getActiveZones(),
    getProducts(),
  ])
  const inScope =
    scope.kind === 'all' ? products : products.filter((p) => p.categoryId === scope.category.id)
  const range = priceCheckRange(inScope)
  return (
    <>
      <DepartmentBand
        title={scope.kind === 'all' ? 'Everything in the shop' : scope.category.name}
        count={inScope.length}
        current={scope.kind === 'all' ? null : scope.category.slug}
        departments={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      />
      <EdgeStrip cutoff={earliestCutoff(zones)} priceCheck={range ? priceCheckLine(range) : null} />
      <Suspense fallback={<ListingSkeleton />}>
        <ListingResults scope={scope} searchParams={searchParams} />
      </Suspense>
    </>
  )
}
