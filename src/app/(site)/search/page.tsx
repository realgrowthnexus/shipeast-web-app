import { PackagePlus, SearchX } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Highlight } from '@/components/shop/highlight'
import { ProductImage } from '@/components/shop/product-image'
import { SearchBox } from '@/components/shop/search-box'
import { CategoryChips } from '@/components/pages/shop/category-card'
import { requestLink } from '@/components/pages/shop/shop-promises'
import { Container } from '@/components/site/page-intro'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { Price } from '@/components/ui/price'
import { searchCatalogue } from '@/lib/data/catalogue'
import { getCategories, getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false },
}

export default function SearchPage({ searchParams }: PageProps<'/search'>) {
  return (
    <>
      <div className="bg-crimson-50">
        <Container className="pt-10 sm:pt-14">
          <p className="mb-3 animate-rise eyebrow text-crimson">The shop</p>
          <h1 className="animate-rise text-h1 text-ink">Search the shop</h1>
        </Container>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </>
  )
}

async function Results({ searchParams }: { searchParams: PageProps<'/search'>['searchParams'] }) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : (raw ?? '')).trim().slice(0, 80)
  const [settings, hits, categories] = await Promise.all([
    getSettings(),
    searchCatalogue(q),
    getCategories(),
  ])
  const requests = settings.features.item_requests
  const ask = requestLink(requests)

  return (
    <>
      <div className="border-b border-line bg-crimson-50">
        <Container className="flex flex-col gap-4 pt-6 pb-10 sm:pb-14">
          <SearchBox defaultValue={q} autoFocus={!q} className="max-w-2xl" />
          <CategoryChips categories={categories} />
        </Container>
      </div>
      <Container className="flex flex-col gap-8 section-sm">
        {!q ? (
          <p className="max-w-2xl text-lead text-ink-body">
            Search by name, like “rice”, “diapers” or “pain relief”, or{' '}
            <Link href="/shop" className="font-semibold text-crimson underline underline-offset-2">
              browse the shop
            </Link>
            .
          </p>
        ) : hits.length ? (
          <section aria-labelledby="results" className="flex flex-col gap-4">
            <h2 id="results" className="text-h3 text-ink" aria-live="polite">
              {hits.length} {hits.length === 1 ? 'result' : 'results'} for “{q}”
            </h2>
            <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {hits.map((hit) =>
                hit.kind === 'basket' ? (
                  <li
                    key={hit.basket.id}
                    className="flex flex-wrap items-center gap-4 p-3 transition-colors duration-150 hover:bg-surface-tint sm:flex-nowrap sm:p-4"
                  >
                    <div className="grid aspect-[4/3] w-20 shrink-0 place-items-center rounded-md bg-crimson text-xs font-bold text-white">
                      Basket
                    </div>
                    <div className="flex min-w-0 flex-1 basis-[calc(100%-6rem)] flex-col sm:basis-0">
                      <Link
                        href={`/baskets/${hit.basket.slug}`}
                        className="font-semibold text-ink hover:text-crimson"
                      >
                        <Highlight text={hit.basket.name} query={q} />
                      </Link>
                      <span className="text-small text-ink-muted">Ready-made basket</span>
                    </div>
                    <Price
                      cents={hit.basket.priceCents}
                      jmdPerUsd={settings.jmdPerUsd}
                      size="sm"
                      className="ml-24 sm:ml-0"
                    />
                    <ButtonLink
                      href={`/baskets/${hit.basket.slug}`}
                      variant="secondary"
                      size="sm"
                      className="ml-auto min-h-11 sm:ml-0"
                    >
                      View
                    </ButtonLink>
                  </li>
                ) : (
                  <li
                    key={hit.product.id}
                    className="flex flex-wrap items-center gap-4 p-3 transition-colors duration-150 hover:bg-surface-tint sm:flex-nowrap sm:p-4"
                  >
                    <ProductImage
                      src={hit.product.imagePath}
                      alt=""
                      categoryId={hit.product.categoryId}
                      slug={hit.product.slug}
                      sizes="80px"
                      className="w-20 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 basis-[calc(100%-6rem)] flex-col sm:basis-0">
                      <Link
                        href={`/product/${hit.product.slug}`}
                        className="font-semibold text-ink hover:text-crimson"
                      >
                        <Highlight text={hit.product.name} query={q} />
                      </Link>
                      <span className="text-small text-ink-muted">
                        {hit.product.size}
                        {hit.category && ` · ${hit.category.name}`}
                      </span>
                    </div>
                    <Price
                      cents={hit.product.priceCents}
                      jmdPerUsd={settings.jmdPerUsd}
                      size="sm"
                      className="ml-24 sm:ml-0"
                    />
                    <div className="ml-auto sm:ml-0">
                      {hit.product.status === 'visible' ? (
                        <AddToBasket kind="product" id={hit.product.id} name={hit.product.name} />
                      ) : (
                        <Badge>Out of stock</Badge>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
            <p className="text-small text-ink-muted">
              Not what you need?{' '}
              <Link
                href={requests ? '/request' : '/contact'}
                className="font-semibold text-crimson underline underline-offset-2"
              >
                {requests ? 'Ask us to find it' : 'Ask us about it'}
              </Link>
              .
            </p>
          </section>
        ) : (
          <section aria-labelledby="no-results" className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <h2 id="no-results" className="sr-only">
              No results
            </h2>
            <EmptyState icon={<SearchX aria-hidden />} title={`Nothing found for “${q}”`}>
              Check the spelling or try a shorter word, like “rice” instead of “brown rice 5 lb”.
              You can also browse a category above.
            </EmptyState>
            <div className="flex flex-col items-start gap-4 rounded-xl bg-crimson p-card-lg text-white">
              <span className="grid size-12 place-items-center rounded-full bg-crimson-800 text-blush">
                <PackagePlus className="size-6" aria-hidden />
              </span>
              <h3 className="text-h3">We don’t list it? Ask us.</h3>
              <p className="text-on-crimson-muted">
                {requests
                  ? 'Tell us the item, the brand and the size. We check the stores in Jamaica and send you a price, and you only pay once you accept it.'
                  : 'Tell us the item, the brand and the size, and we’ll let you know if we can buy it for you.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href={ask.href} variant="onDark">
                  {ask.label}
                </ButtonLink>
                <ButtonLink
                  href="/shop"
                  variant="ghost"
                  className="text-white hover:bg-crimson-700"
                >
                  Browse the shop
                </ButtonLink>
              </div>
            </div>
          </section>
        )}
      </Container>
    </>
  )
}

function SearchSkeleton() {
  return (
    <div aria-hidden>
      <div className="bg-crimson-50">
        <Container className="flex flex-col gap-4 pt-6 pb-10 sm:pb-14">
          <Skeleton className="h-13 max-w-2xl" />
          <Skeleton className="h-11 max-w-md" />
        </Container>
      </div>
      <Container className="section-sm">
        <Skeleton className="h-64" />
      </Container>
    </div>
  )
}
