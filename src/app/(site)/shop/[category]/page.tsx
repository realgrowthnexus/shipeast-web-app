import { PackageSearch } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { CategoryChips } from '@/components/pages/shop/category-card'
import { HelpStrip } from '@/components/pages/shop/shop-promises'
import { StaggerProductGrid } from '@/components/pages/shop/stagger-product-grid'
import { CategoryIcon } from '@/components/site/category-icon'
import { Container } from '@/components/site/page-intro'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { Button, ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { Select } from '@/components/ui/field'
import { Pagination } from '@/components/ui/pagination'
import { getCategory, getProducts } from '@/lib/data/catalogue'
import { getCategories, getSettings } from '@/lib/data/site'
import {
  applyShopQuery,
  parseShopQuery,
  PRICE_BANDS,
  shopQueryString,
  SORTS,
} from '@/lib/shop-filters'
import { atLeastOne } from '@/lib/static-params'
import { categoryPhotos } from '@/lib/stock-photos'
import { FlagStripe } from '@/components/site/jamaica'

export async function generateStaticParams() {
  return atLeastOne(
    'category',
    (await getCategories()).map((c) => c.slug),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/shop/[category]'>): Promise<Metadata> {
  const category = await getCategory((await params).category)
  if (!category) return {}
  return {
    title: category.name,
    description: `${category.description} Bought in Jamaica and delivered the same day.`,
    alternates: { canonical: `/shop/${category.slug}` },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<'/shop/[category]'>) {
  const category = await getCategory((await params).category)
  if (!category) notFound()

  const [settings, categories] = await Promise.all([getSettings(), getCategories()])
  const photo = categoryPhotos[category.slug]
  const count = categories.find((c) => c.id === category.id)?.count
  const others = categories.filter((c) => c.id !== category.id)

  return (
    <>
      <section className="bg-crimson text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 gutter section-sm md:grid-cols-12 lg:gap-12">
          <div className="flex animate-rise flex-col gap-4 md:col-span-7">
            <nav aria-label="Breadcrumb" className="text-small">
              <ol className="flex flex-wrap items-center gap-2 text-on-crimson-muted">
                <li>
                  <Link
                    href="/shop"
                    className="underline-offset-2 hover:text-white hover:underline"
                  >
                    Shop
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold text-white">
                  {category.name}
                </li>
              </ol>
            </nav>
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-crimson-800 text-blush [&_svg]:size-6">
                <CategoryIcon slug={category.slug} />
              </span>
              <h1 className="text-h1 text-balance">{category.name}</h1>
            </div>
            <p className="max-w-2xl text-lead text-on-crimson-muted">{category.description}</p>
            {count !== undefined && (
              <p className="text-small font-semibold text-blush">
                {count} {count === 1 ? 'item' : 'items'}, bought fresh on the day we deliver
              </p>
            )}
          </div>
          {photo && (
            <StockPhoto
              name={photo}
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 40vw, 0px"
              className="hidden aspect-16/9 animate-rise rounded-2xl [animation-delay:120ms] md:col-span-5 md:block"
            />
          )}
        </div>
        <FlagStripe className="h-1.5" />
      </section>
      <Container className="section-sm">
        <Suspense fallback={<ResultsSkeleton />}>
          <Results categoryId={category.id} slug={category.slug} searchParams={searchParams} />
        </Suspense>
      </Container>
      <Section tone="surface" size="sm" aria-labelledby="help">
        <SectionHeader
          id="help"
          eyebrow="Need a hand?"
          title="We’re here before you order"
          className="mb-8"
        />
        <HelpStrip itemRequests={settings.features.item_requests} whatsapp={settings.whatsapp} />
        {others.length > 0 && (
          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8">
            <h3 className="text-h3 text-ink">Keep shopping</h3>
            <CategoryChips categories={others} />
          </div>
        )}
      </Section>
    </>
  )
}

async function Results({
  categoryId,
  slug,
  searchParams,
}: {
  categoryId: string
  slug: string
  searchParams: PageProps<'/shop/[category]'>['searchParams']
}) {
  const query = parseShopQuery(await searchParams)
  const [settings, products] = await Promise.all([getSettings(), getProducts()])
  const inCategory = products.filter((p) => p.categoryId === categoryId)
  const result = applyShopQuery(inCategory, query)
  const allOut = inCategory.length > 0 && inCategory.every((p) => p.status !== 'visible')

  return (
    <div className="flex flex-col gap-6">
      <form
        method="get"
        className="flex flex-wrap items-end gap-3 rounded-lg border border-line bg-surface p-3"
      >
        <label className="flex min-w-40 flex-1 flex-col gap-1 text-small font-semibold text-ink sm:flex-none">
          Sort by
          <Select name="sort" defaultValue={query.sort}>
            {Object.entries(SORTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </label>
        <label className="flex min-w-40 flex-1 flex-col gap-1 text-small font-semibold text-ink sm:flex-none">
          Price
          <Select name="price" defaultValue={query.price}>
            {Object.entries(PRICE_BANDS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </label>
        <label className="flex min-h-11 items-center gap-2 font-semibold text-ink">
          <input
            type="checkbox"
            name="stock"
            value="1"
            defaultChecked={query.inStock}
            className="size-5 accent-crimson"
          />
          In stock only
        </label>
        <Button type="submit" variant="secondary">
          Apply
        </Button>
        <p className="ml-auto self-center text-small text-ink-muted" aria-live="polite">
          {result.total} {result.total === 1 ? 'item' : 'items'}
        </p>
      </form>

      {allOut && (
        <p className="rounded-md bg-warn-tint p-4 text-small text-ink">
          Everything here is out of stock right now. We restock often, so check back soon.
        </p>
      )}

      {result.items.length ? (
        <StaggerProductGrid products={result.items} jmdPerUsd={settings.jmdPerUsd} />
      ) : (
        <EmptyState
          icon={<PackageSearch aria-hidden />}
          title={inCategory.length ? 'Nothing matches those filters' : 'Nothing here yet'}
          action={
            <ButtonLink href={inCategory.length ? `/shop/${slug}` : '/shop'} variant="outline">
              {inCategory.length ? 'Clear filters' : 'Back to the shop'}
            </ButtonLink>
          }
        >
          {inCategory.length
            ? 'Try a different price range, or include items that are out of stock.'
            : 'We’re adding items to this category. Have a look at the others in the meantime.'}
        </EmptyState>
      )}

      <Pagination
        page={result.page}
        pages={result.pages}
        href={(n) => `/shop/${slug}${shopQueryString(query, n)}`}
      />
    </div>
  )
}

function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <Skeleton className="h-20" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="aspect-[3/4]" />
        ))}
      </div>
    </div>
  )
}
