import type { Metadata } from 'next'
import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { CategoryChips, CategoryPhotoCard } from '@/components/pages/shop/category-card'
import { CantFindBanner, HowWeShop } from '@/components/pages/shop/shop-promises'
import { StaggerProductGrid } from '@/components/pages/shop/stagger-product-grid'
import { BasketCard } from '@/components/shop/product-card'
import { SearchBox } from '@/components/shop/search-box'
import { deliveryPromise } from '@/components/shop/breadcrumb'
import { CtaBand } from '@/components/site/cta-band'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getSettings } from '@/lib/data/site'
import { formatClockTime } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Groceries, household, pharmacy and baby items bought in Jamaica and delivered to your family the same day.',
}

export default async function ShopPage() {
  const [settings, categories, baskets, products, zones] = await Promise.all([
    getSettings(),
    getCategories(),
    getBaskets({ featured: true }),
    getProducts(),
    getActiveZones(),
  ])
  const popular = products.filter((p) => p.featured && p.status === 'visible')
  const sameDay = zones.length
    ? deliveryPromise(zones, formatClockTime(zones[0]?.cutoffTime ?? '13:00'))
    : 'Delivery is paused for now. Check back soon.'

  return (
    <>
      <section className="bg-crimson text-white">
        <div className="mx-auto grid w-full max-w-page items-center gap-10 gutter section lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="animate-rise">
              <p className="mb-3 eyebrow text-blush">The shop</p>
              <h1 className="text-h1 text-balance">Fill their basket from wherever you are</h1>
              <p className="mt-4 max-w-2xl text-lead text-on-crimson-muted">
                Prices are in US dollars with the Jamaican dollar amount alongside. We buy
                everything fresh on the day we deliver.
              </p>
            </div>
            <div className="flex animate-rise flex-col gap-4 [animation-delay:120ms]">
              <SearchBox className="max-w-xl" />
              <CategoryChips categories={categories} onDark />
            </div>
          </div>
          <StockPhoto
            name="shopProduce"
            sizes="(min-width: 1024px) 520px, 0px"
            className="hidden aspect-4/3 animate-rise rounded-2xl [animation-delay:200ms] lg:col-span-5 lg:block"
          />
        </div>
      </section>

      <Section aria-labelledby="categories" size="sm">
        <SectionHeader
          id="categories"
          eyebrow="Shop by category"
          title="What do they need this week?"
          className="mb-8"
        />
        {categories.length ? (
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((c) => (
              <StaggerItem key={c.id} className="flex [&>a]:flex-1">
                <CategoryPhotoCard category={c} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-ink-body">The shop is being stocked. Check back soon.</p>
        )}
      </Section>

      {baskets.length > 0 && (
        <Section tone="surface" aria-labelledby="baskets" size="sm">
          <SectionHeader
            id="baskets"
            eyebrow="Ready-made baskets"
            title="A full basket in one tap"
            lead="Put together by our team, and each one costs less than buying the items one by one."
            className="mb-8"
            action={
              <Link
                href="/baskets"
                className="inline-flex min-h-11 items-center font-semibold text-crimson underline-offset-4 hover:underline"
              >
                All baskets
              </Link>
            }
          />
          <Stagger className="grid gap-4 md:grid-cols-3">
            {baskets.map(({ basket, itemCount, separateCents }) => (
              <StaggerItem key={basket.id} className="flex [&>article]:flex-1">
                <BasketCard
                  basket={basket}
                  jmdPerUsd={settings.jmdPerUsd}
                  itemCount={itemCount}
                  separateCents={separateCents}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {popular.length > 0 && (
        <Section aria-labelledby="popular" size="sm">
          <SectionHeader
            id="popular"
            eyebrow="Popular items"
            title="Everyday essentials"
            className="mb-8"
          />
          <StaggerProductGrid products={popular} jmdPerUsd={settings.jmdPerUsd} />
        </Section>
      )}

      <HowWeShop sameDay={sameDay} />

      <CantFindBanner itemRequests={settings.features.item_requests} />

      <CtaBand
        title="Send a whole basket today"
        href="/baskets"
        label="See the baskets"
        secondary={{ href: '/how-it-works', label: 'How it works' }}
        photo="basketFood"
      >
        Ready-made baskets at one price. Add a gift message and we’ll print it and hand it over.
      </CtaBand>
    </>
  )
}
