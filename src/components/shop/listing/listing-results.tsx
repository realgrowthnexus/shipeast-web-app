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
  matchesQuery,
  narrowByFind,
  PAGE_SIZE,
  parseShopQuery,
  shopHref,
  shopParams,
  shopQueryString,
  toFacetIndex,
} from '@/lib/shop-filters'
import { pickShortcutBasket, type Scope, scopePath, shortcutIndex } from '@/lib/shop-listing'
import { formatJmd } from '@/lib/format'
import { priceCheckLine, priceCheckRange } from '@/lib/shop-front'
import { unitPriceLabel } from '@/lib/unit-price'
import { cn } from '@/lib/cn'
import { ShelfCard } from '@/components/shop/shelf-card'
import { ActiveFilters } from './active-filters'
import { AisleRow } from './aisle-row'
import { BasketShortcutTile } from './basket-shortcut-tile'
import { FilterFields } from './filter-fields'
import { FilterForm } from './filter-form'
import { FilterSheet } from './filter-sheet'
import { FindInList } from './find-in-list'
import { ListingHelpRow } from './listing-help-row'
import { EmptyDepartment, NoMatches } from './listing-empty'
import { ListingNavProvider, RESULTS_HEADING, ResultsRegion } from './listing-nav'
import { LoadMore } from './load-more'
import { MoreFromShop } from './more-from-shop'
import { SortSelect } from './sort-select'
import { StickyToolbar } from './sticky-toolbar'
import { TileBasketControl } from './tile-basket-control'
import { Button } from '@/components/ui/button'

/** Columns of the grid, for `sizes`: 2 → 3 → 3 (with the sidebar) → 4. */
const cardSizes =
  '(min-width: 1280px) 236px, (min-width: 1024px) 28vw, (min-width: 768px) 31vw, 46vw'

/**
 * Everything below the band: the dynamic part of the listing (it reads `searchParams` and the
 * basket cookie), inside the page's Suspense boundary. Filters the scope on the server and
 * renders the aisle row, the sidebar, the phone toolbar and sheet, the chips, the grid, Load
 * more, the price line, the thin-department rail and the help strip (docs/shop-v2/PLAN.md §2).
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

  const fields = (idPrefix: string) => (
    <FilterFields
      idPrefix={idPrefix}
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
  const range = priceCheckRange(products)
  const chips = <ActiveFilters basePath={basePath} query={query} aisles={ctx.aisles} />
  const hasChips = activeFilters(query, ctx).length > 0

  const inBasket = (id: string) => productQuantity(basket, id)
  const shortcut = !filtered && result.page === 1 ? pickShortcutBasket(scope, baskets, all) : null
  const firstNewIndex = result.page > 1 ? (result.page - 1) * PAGE_SIZE : -1
  const tiles = result.items.map((p, i) => {
    // The first batch rises in on paint; a loaded batch rises from its first new card.
    const rise = i < PAGE_SIZE ? i : firstNewIndex >= 0 ? i - firstNewIndex : -1
    return (
      <li
        key={p.id}
        className={cn('flex', rise >= 0 && 'animate-rise')}
        style={rise >= 0 ? { animationDelay: `${Math.min(rise, 7) * 40}ms` } : undefined}
      >
        <ShelfCard
          product={p}
          jmdPerUsd={settings.jmdPerUsd}
          unitPrice={unitPriceLabel(p.size, p.priceCents)}
          sizes={cardSizes}
          eager={i < 4}
          priority={i < 2}
          firstNew={i === firstNewIndex}
          action={
            <TileBasketControl
              productId={p.id}
              name={p.name}
              quantity={inBasket(p.id)}
              inStock={p.status === 'visible'}
            />
          }
        />
      </li>
    )
  })
  if (shortcut)
    tiles.splice(
      shortcutIndex(tiles.length),
      0,
      <li key="basket-shortcut" className="flex">
        <BasketShortcutTile shortcut={shortcut} />
      </li>,
    )

  // A thin department (unfiltered, under 8 items) ends with real products from elsewhere.
  const thin = scope.kind === 'department' && !filtered && result.total > 0 && result.total < 8
  const more = thin
    ? all
        .filter((p) => p.categoryId !== scope.category.id && p.status === 'visible')
        .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
        .slice(0, 6)
    : []
  const quantities = Object.fromEntries(more.map((p) => [p.id, inBasket(p.id)]))
  const aisleTotal = products.filter((p) => matchesQuery(p, query, ctx, 'aisles')).length
  const allOut = products.length > 0 && products.every((p) => p.status !== 'visible')

  return (
    <ListingNavProvider>
      {scope.kind === 'department' && aisles.length >= 2 && (
        <AisleRow
          basePath={basePath}
          query={query}
          aisles={ctx.aisles}
          counts={facets.aisles}
          departmentName={scope.category.name}
          total={aisleTotal}
        />
      )}
      <div
        data-listing
        className="mx-auto max-w-wide gutter pt-4 pb-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:pt-6 lg:pb-16 xl:grid-cols-[16rem_minmax(0,1fr)]"
      >
        {/* Desktop sidebar. Below 1024px it shows only without JavaScript, from the Filters link. */}
        <aside
          id="filters"
          aria-label="Filters"
          className="hidden target:block max-lg:mb-6 max-lg:rounded-lg max-lg:border max-lg:border-line max-lg:bg-surface max-lg:p-card lg:block"
        >
          <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:max-h-[calc(100dvh-var(--header-height)-3rem)] lg:[scrollbar-gutter:stable] lg:overflow-y-auto lg:pr-2">
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

          <StickyToolbar className="sticky top-(--header-height) z-sticky bleed-gutter border-b border-line bg-surface py-2 transition-shadow duration-150 data-[stuck]:shadow-lift lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:data-[stuck]:shadow-none">
            <div className="grid grid-cols-2 items-center gap-2 md:grid-cols-[minmax(0,1fr)_auto_13rem] md:gap-3 lg:flex lg:justify-between lg:gap-4">
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
                top={
                  <FindInList
                    action={basePath}
                    label={findLabel}
                    query={query}
                    idPrefix="sheet"
                    className="mb-5 border-b border-line pb-5 md:hidden"
                  />
                }
              >
                {fields('sheet')}
              </FilterSheet>
              <div className="hidden lg:block">{countText}</div>
              {sort('sort-bar', 'font-medium max-lg:sr-only', 'lg:w-64')}
            </div>
          </StickyToolbar>

          <div className="mt-3 flex flex-col gap-3 lg:hidden">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              {countText}
              <p className="text-xs text-ink-muted">
                J$ is a guide at {formatJmd(settings.jmdPerUsd)} to USD$1.
              </p>
            </div>
            {chips}
          </div>
          {hasChips && <div className="mt-3 hidden lg:block">{chips}</div>}

          <ResultsRegion total={result.total} className="mt-4">
            {products.length === 0 ? (
              <EmptyDepartment
                name={scope.kind === 'department' ? scope.category.name : 'the shop'}
                request={request}
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
                  className="grid grid-cols-2 gap-3 transition-opacity duration-150 group-data-[pending]/results:opacity-60 md:grid-cols-3 md:gap-4 xl:grid-cols-4"
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
                <p className="mt-6 text-xs text-ink-muted">
                  {range && `${priceCheckLine(range)} `}Delivery times are estimates.
                </p>
              </>
            )}
          </ResultsRegion>

          {thin && (
            <MoreFromShop products={more} jmdPerUsd={settings.jmdPerUsd} quantities={quantities} />
          )}

          <ListingHelpRow
            itemRequests={settings.features.item_requests}
            whatsapp={settings.whatsapp}
          />
        </section>
      </div>
    </ListingNavProvider>
  )
}
