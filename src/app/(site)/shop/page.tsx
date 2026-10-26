import type { Metadata } from 'next'
import Link from 'next/link'
import { BasketCard, CategoryTile } from '@/components/shop/product-card'
import { ProductGrid } from '@/components/shop/product-grid'
import { SearchBox } from '@/components/shop/search-box'
import { CategoryIcon } from '@/components/site/category-icon'
import { Container, PageIntro } from '@/components/site/page-intro'
import { getProducts } from '@/lib/data/catalogue'
import { getBaskets, getCategories, getSettings } from '@/lib/data/site'
import { categoryPhotos } from '@/lib/stock-photos'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Groceries, household, pharmacy and baby items bought in Jamaica and delivered to your family the same day.',
}

export default async function ShopPage() {
  const [settings, categories, baskets, products] = await Promise.all([
    getSettings(),
    getCategories(),
    getBaskets({ featured: true }),
    getProducts(),
  ])
  const popular = products.filter((p) => p.featured && p.status === 'visible')

  return (
    <>
      <PageIntro eyebrow="The shop" title="Shop" aside={<SearchBox className="lg:w-96" />}>
        Prices are in US dollars with the Jamaican dollar amount alongside. We buy everything fresh
        on the day we deliver.
      </PageIntro>

      <Container className="flex flex-col gap-14 section-sm">
        <section aria-labelledby="categories">
          <h2 id="categories" className="mb-5 text-h2 text-ink">
            Shop by category
          </h2>
          {categories.length ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <CategoryTile
                    href={`/shop/${c.slug}`}
                    name={c.name}
                    description={c.description}
                    count={c.count}
                    icon={<CategoryIcon slug={c.slug} />}
                    photo={categoryPhotos[c.slug]}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-body">The shop is being stocked. Check back soon.</p>
          )}
        </section>

        {baskets.length > 0 && (
          <section aria-labelledby="baskets">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <h2 id="baskets" className="text-h2 text-ink">
                Ready-made baskets
              </h2>
              <Link
                href="/baskets"
                className="font-semibold text-crimson underline-offset-2 hover:underline"
              >
                All baskets
              </Link>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {baskets.map(({ basket, itemCount, separateCents }) => (
                <li key={basket.id} className="flex [&>article]:flex-1">
                  <BasketCard
                    basket={basket}
                    jmdPerUsd={settings.jmdPerUsd}
                    itemCount={itemCount}
                    separateCents={separateCents}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {popular.length > 0 && (
          <section aria-labelledby="popular">
            <h2 id="popular" className="mb-5 text-h2 text-ink">
              Everyday essentials
            </h2>
            <ProductGrid products={popular} jmdPerUsd={settings.jmdPerUsd} />
          </section>
        )}
      </Container>
    </>
  )
}
