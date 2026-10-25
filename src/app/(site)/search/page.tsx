import { SearchX } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Highlight } from '@/components/shop/highlight'
import { ProductImage } from '@/components/shop/product-image'
import { SearchBox } from '@/components/shop/search-box'
import { Container } from '@/components/site/page-intro'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { Price } from '@/components/ui/price'
import { searchCatalogue } from '@/lib/data/catalogue'
import { getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false },
}

export default function SearchPage({ searchParams }: PageProps<'/search'>) {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <h1 className="text-4xl font-black tracking-tight text-ink">Search the shop</h1>
      <Suspense fallback={<SearchSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </Container>
  )
}

async function Results({ searchParams }: { searchParams: PageProps<'/search'>['searchParams'] }) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : (raw ?? '')).trim().slice(0, 80)
  const [settings, hits] = await Promise.all([getSettings(), searchCatalogue(q)])
  const requests = settings.features.item_requests

  return (
    <>
      <SearchBox defaultValue={q} autoFocus={!q} className="max-w-2xl" />

      {!q ? (
        <p className="text-ink-muted">
          Search by name, like “rice”, “diapers” or “pain relief”, or{' '}
          <Link href="/shop" className="font-semibold text-crimson underline underline-offset-2">
            browse the shop
          </Link>
          .
        </p>
      ) : hits.length ? (
        <section aria-labelledby="results" className="flex flex-col gap-4">
          <h2 id="results" className="text-lg font-bold text-ink" aria-live="polite">
            {hits.length} {hits.length === 1 ? 'result' : 'results'} for “{q}”
          </h2>
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-blush-100">
            {hits.map((hit) =>
              hit.kind === 'basket' ? (
                <li
                  key={hit.basket.id}
                  className="flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap"
                >
                  <div className="grid aspect-[4/3] w-20 shrink-0 place-items-center rounded-md bg-crimson text-xs font-bold text-white">
                    Basket
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/baskets/${hit.basket.slug}`}
                      className="font-semibold text-ink hover:text-crimson"
                    >
                      <Highlight text={hit.basket.name} query={q} />
                    </Link>
                    <span className="text-sm text-ink-muted">Ready-made basket</span>
                  </div>
                  <Price cents={hit.basket.priceCents} jmdPerUsd={settings.jmdPerUsd} size="sm" />
                  <ButtonLink
                    href={`/baskets/${hit.basket.slug}`}
                    variant="secondary"
                    size="sm"
                    className="min-h-10"
                  >
                    View
                  </ButtonLink>
                </li>
              ) : (
                <li
                  key={hit.product.id}
                  className="flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap"
                >
                  <ProductImage
                    src={hit.product.imagePath}
                    alt=""
                    categoryId={hit.product.categoryId}
                    sizes="80px"
                    className="w-20 shrink-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/product/${hit.product.slug}`}
                      className="font-semibold text-ink hover:text-crimson"
                    >
                      <Highlight text={hit.product.name} query={q} />
                    </Link>
                    <span className="text-sm text-ink-muted">
                      {hit.product.size}
                      {hit.category && ` · ${hit.category.name}`}
                    </span>
                  </div>
                  <Price cents={hit.product.priceCents} jmdPerUsd={settings.jmdPerUsd} size="sm" />
                  {hit.product.status === 'visible' ? (
                    <AddToBasket kind="product" id={hit.product.id} name={hit.product.name} />
                  ) : (
                    <Badge>Out of stock</Badge>
                  )}
                </li>
              ),
            )}
          </ul>
          <p className="text-sm text-ink-muted">
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
        <EmptyState
          icon={<SearchX aria-hidden />}
          title={`Nothing found for “${q}”`}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <ButtonLink href="/shop" variant="outline">
                Browse the shop
              </ButtonLink>
              <ButtonLink href={requests ? '/request' : '/contact'}>
                {requests ? 'Request it' : 'Ask us about it'}
              </ButtonLink>
            </div>
          }
        >
          Check the spelling or try a shorter word. If we don’t list it, tell us and we’ll see if we
          can buy it for you.
        </EmptyState>
      )}
    </>
  )
}

function SearchSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <Skeleton className="h-13 max-w-2xl" />
      <Skeleton className="h-64" />
    </div>
  )
}
