import { readBasket } from '@/lib/basket/cookie'
import { productQuantity } from '@/lib/basket/state'
import { requestLink } from '@/components/pages/shop/shop-promises'
import { getAisleNames, getAisles, getProducts } from '@/lib/data/catalogue'
import { getBaskets, getCategories, getSettings } from '@/lib/data/site'
import {
  activeCount,
  activeFilters,
  applyShopQuery,
  facetCounts,
  type ListingContext,
  narrowByFind,
  PAGE_SIZE,
  parseShopQuery,
  shopHref,
  shopParams,
  shopQueryString,
  toFacetIndex,
} from '@/lib/shop-filters'
import {
  pickShortcutBasket,
  type Scope,
  scopePath,
  shortcutIndex,
  tileLabel,
} from '@/lib/shop-listing'
import { unitPriceLabel } from '@/lib/unit-price'
import { cn } from '@/lib/cn'
import { ActiveFilters } from './active-filters'
import { BasketShortcutTile } from './basket-shortcut-tile'
import { FilterFields } from './filter-fields'
import { FilterForm } from './filter-form'
import { FilterSheet } from './filter-sheet'
import { FindInList } from './find-in-list'
import { ListingHelpRow } from './listing-help-row'
import { EmptyDepartment, NoMatches } from './listing-empty'
import { ListingNavProvider, RESULTS_HEADING, ResultsRegion } from './listing-nav'
import { LoadMore } from './load-more'
import { ProductTile } from './product-tile'
import { SortSelect } from './sort-select'
import { StickyToolbar } from './sticky-toolbar'
import { Button } from '@/components/ui/button'

/**
 * Everything below the strip: the one dynamic part of the listing (it reads `searchParams`
 * and the basket cookie), inside the page's single Suspense boundary. Filters the scope on the
 * server and renders the sidebar, the phone toolbar and sheet, the chips, the grid, Load more
 * and the help row.
 */
export async function ListingResults({
  scope,
  searchParams,
}: {
  scope: Scope
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [params, basket, settings, all, categories, aisleNames, baskets, aisles] =
    await Promise.all([
      searchParams,
      readBasket(),
      getSettings(),
      getProducts(),
      getCategories(),
      getAisleNames(),
      getBaskets(),
      scope.kind === 'department' ? getAisles(scope.category.id) : Promise.resolve([]),
    ])

  const basePath = scopePath(scope)
  const products =
    scope.kind === 'all' ? all : all.filter((p) => p.categoryId === scope.category.id)
  const departments = Object.fromEntries(categories.map((c) => [c.id, c.name]))
  const ctx: ListingContext = {
    aisles: aisles.map(({ id, slug, name }) => ({ id, slug, name })),
    aisleNames,
    departments,
  }
  const query = parseShopQuery(params, ctx)
  const result = applyShopQuery(products, query, ctx)
  const facets = facetCounts(products, query, ctx)
  const qs = shopQueryString(query)
  const filtered = activeCount(query) > 0 || Boolean(query.q)
  const hasOutOfStock = products.some((p) => p.status !== 'visible')
  const request = requestLink(settings.features.item_requests)

  // Department links keep the find text, price, stock and sort (aisles belong to one department).
  const keep = { aisles: [], page: 1 }
  const departmentOptions = [
    {
      key: 'all',
      name: 'All items',
      count: categories.reduce((n, c) => n + c.count, 0),
      href: shopHref('/shop', query, keep),
      current: scope.kind === 'all',
    },
    ...categories.map((c) => ({
      key: c.slug,
      name: c.name,
      count: c.count,
      href: shopHref(`/shop/${c.slug}`, query, keep),
      current: scope.kind === 'department' && scope.category.id === c.id,
    })),
  ]
  const fields = (idPrefix: string) => (
    <FilterFields
      idPrefix={idPrefix}
      departments={departmentOptions}
      aisles={aisles}
      query={query}
      facets={facets}
      hasOutOfStock={hasOutOfStock}
    />
  )

  const sortParams = [...shopParams({ ...query, sort: 'popular', page: 1 })]
  const sort = (id: string, labelClassName: string, className?: string) => (
    <SortSelect
      id={id}
      action={basePath}
      params={sortParams}
      value={query.sort}
      labelClassName={labelClassName}
      className={className}
    />
  )
  const findLabel = `Find in ${scope.kind === 'all' ? 'the shop' : scope.category.name}`
  const countText = (
    <p
      tabIndex={-1}
      className="text-small font-semibold text-ink tabular-nums focus:outline-none"
      data-results-count
    >
      {result.total} {result.total === 1 ? 'item' : 'items'}
      {query.q && <span className="font-medium text-ink-body"> for “{query.q}”</span>}
    </p>
  )
  const chips = <ActiveFilters basePath={basePath} query={query} aisles={ctx.aisles} />
  const hasChips = activeFilters(query, ctx).length > 0

  const inBasket = (id: string) => productQuantity(basket, id)
  const names = { aisles: aisleNames, departments }
  const shortcut = !filtered && result.page === 1 ? pickShortcutBasket(scope, baskets, all) : null
  const firstNewIndex = result.page > 1 ? (result.page - 1) * PAGE_SIZE : -1
  const tiles = result.items.map((p, i) => (
    <li key={p.id} className="flex">
      <ProductTile
        product={p}
        label={tileLabel(p, scope, names)}
        unitPrice={unitPriceLabel(p.size, p.priceCents)}
        jmdPerUsd={settings.jmdPerUsd}
        inBasket={inBasket(p.id)}
        eager={i < 4}
        priority={i < 2}
        firstNew={i === firstNewIndex}
      />
    </li>
  ))
  if (shortcut)
    tiles.splice(
      shortcutIndex(tiles.length),
      0,
      <li key="basket-shortcut" className="flex">
        <BasketShortcutTile shortcut={shortcut} />
      </li>,
    )
  const allOut = products.length > 0 && products.every((p) => p.status !== 'visible')

  return (
    <ListingNavProvider>
      <div
        data-listing
        className="mx-auto max-w-wide gutter pt-6 pb-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:pt-8 lg:pb-20 xl:grid-cols-[16rem_minmax(0,1fr)]"
      >
        {/* Desktop sidebar. Below 1024px it shows only without JavaScript, from the Filters link. */}
        <aside
          id="filters"
          aria-label="Filters"
          className="hidden target:block max-lg:mb-6 max-lg:rounded-lg max-lg:border max-lg:border-line max-lg:bg-surface max-lg:p-card lg:block"
        >
          <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:max-h-[calc(100dvh-var(--header-height)-3rem)] lg:[scrollbar-gutter:stable] lg:overflow-y-auto lg:pr-2">
            <FindInList
              action={basePath}
              label={findLabel}
              query={query}
              idPrefix="side"
              className="mb-5 hidden border-b border-line pb-5 lg:flex"
            />
            <FilterForm key={qs} action={basePath}>
              {fields('side')}
              <Button
                type="submit"
                variant="secondary"
                block
                className="mt-6 group-data-[enhanced]/filters:hidden"
              >
                Apply filters
              </Button>
            </FilterForm>
            <a
              href="#results-heading"
              className="mt-3 inline-flex min-h-control items-center text-small font-semibold text-crimson underline underline-offset-2 lg:hidden"
            >
              Close filters
            </a>
          </div>
        </aside>

        <section aria-labelledby={RESULTS_HEADING} className="min-w-0">
          <h2
            id={RESULTS_HEADING}
            tabIndex={-1}
            className="sr-only scroll-mt-[calc(var(--header-height)+4.5rem)] lg:scroll-mt-header"
          >
            {scope.kind === 'all' ? 'All products' : `Products in ${scope.category.name}`}
          </h2>

          <FindInList
            action={basePath}
            label={findLabel}
            query={query}
            idPrefix="top"
            className="mb-3 md:hidden"
          />

          <StickyToolbar className="sticky top-(--header-height) z-sticky bleed-gutter border-b border-line bg-surface py-2 transition-shadow duration-150 data-[stuck]:shadow-lift lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:data-[stuck]:shadow-none">
            <div className="grid grid-cols-2 items-center gap-2 md:grid-cols-[minmax(0,1fr)_auto_13rem] md:gap-3 lg:flex lg:justify-between">
              <FindInList
                action={basePath}
                label={findLabel}
                query={query}
                idPrefix="bar"
                hiddenLabel
                className="hidden md:flex lg:hidden"
              />
              <FilterSheet
                action={basePath}
                activeCount={activeCount(query)}
                total={result.total}
                index={toFacetIndex(narrowByFind(products, query, ctx), ctx)}
                className="md:w-auto lg:hidden"
              >
                {fields('sheet')}
              </FilterSheet>
              <div className="hidden lg:block">{countText}</div>
              {sort('sort-bar', 'max-lg:sr-only', 'lg:w-80')}
            </div>
          </StickyToolbar>

          <div className={cn('mt-4 flex flex-col gap-3 lg:mt-3', !hasChips && 'lg:hidden')}>
            <div className="lg:hidden">{countText}</div>
            {chips}
          </div>

          <ResultsRegion total={result.total} className="mt-4 lg:mt-6">
            {products.length === 0 ? (
              <EmptyDepartment
                departments={categories
                  .filter((c) => scope.kind === 'all' || c.id !== scope.category.id)
                  .map((c) => ({ href: `/shop/${c.slug}`, name: c.name }))}
              />
            ) : result.total === 0 ? (
              <NoMatches
                chips={chips}
                clearHref={shopHref(basePath, {
                  ...query,
                  q: '',
                  aisles: [],
                  price: 'any',
                  inStock: false,
                })}
                query={query.q}
                request={request}
              />
            ) : (
              <>
                {allOut && !query.inStock && (
                  <p className="mb-4 rounded-md bg-warn-tint p-4 text-small text-ink">
                    Everything here is out of stock right now. We restock often, so check back soon.
                  </p>
                )}
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-3 transition-opacity duration-150 group-data-[pending]/results:opacity-60 md:grid-cols-3 md:gap-4 lg:gap-y-6 xl:grid-cols-4"
                >
                  {tiles}
                </ul>
                {result.hasMore && (
                  <LoadMore
                    shown={result.shown}
                    total={result.total}
                    href={shopHref(basePath, query, { page: result.page + 1 })}
                  />
                )}
              </>
            )}
          </ResultsRegion>

          <ListingHelpRow itemRequests={settings.features.item_requests} />
        </section>
      </div>
    </ListingNavProvider>
  )
}
