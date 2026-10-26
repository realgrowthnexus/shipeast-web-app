import { Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Breadcrumb, deliveryPromise } from '@/components/shop/breadcrumb'
import { ProductImage } from '@/components/shop/product-image'
import { TrustRow } from '@/components/pages/shop/shop-promises'
import { StaggerProductGrid } from '@/components/pages/shop/stagger-product-grid'
import { Container } from '@/components/site/page-intro'
import { Section, SectionHeader } from '@/components/site/section'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { getProduct, getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getCategories, getSettings } from '@/lib/data/site'
import { formatClockTime } from '@/lib/format'
import { site } from '@/lib/site'
import { atLeastOne } from '@/lib/static-params'

export async function generateStaticParams() {
  return atLeastOne(
    'slug',
    (await getProducts()).map((p) => p.slug),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/product/[slug]'>): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product) return {}
  return {
    title: `${product.name}, ${product.size}`,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: product.name, description: product.description, type: 'website' },
  }
}

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const [settings, categories, zones, products] = await Promise.all([
    getSettings(),
    getCategories(),
    getActiveZones(),
    getProducts(),
  ])
  const category = categories.find((c) => c.id === product.categoryId)
  const related = products
    .filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id && p.status === 'visible',
    )
    .slice(0, 4)
  const inStock = product.status === 'visible'
  const cutoff = formatClockTime(zones[0]?.cutoffTime ?? '13:00')
  const sameDay = zones.length
    ? deliveryPromise(zones, cutoff)
    : 'Delivery is paused for now. Check back soon.'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: category?.name,
    offers: {
      '@type': 'Offer',
      url: `${site.url}/product/${product.slug}`,
      priceCurrency: 'USD',
      price: (product.priceCents / 100).toFixed(2),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      areaServed: zones.map((z) => z.parish),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Container className="flex flex-col gap-8 section-sm">
        <Breadcrumb
          items={[
            { href: '/shop', label: 'Shop' },
            ...(category ? [{ href: `/shop/${category.slug}`, label: category.name }] : []),
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <ProductImage
              src={product.imagePath}
              alt={product.name}
              categoryId={product.categoryId}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={inStock ? 'rounded-xl' : 'rounded-xl opacity-60 grayscale-[40%]'}
            />
            {!inStock && <Badge className="absolute top-3 left-3">Out of stock</Badge>}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex animate-rise flex-col gap-2">
              {category && <p className="eyebrow text-crimson">{category.name}</p>}
              <h1 className="text-h1 text-balance text-ink">{product.name}</h1>
              <p className="text-lead text-ink-body">{product.size}</p>
            </div>

            <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-card">
              <Price cents={product.priceCents} jmdPerUsd={settings.jmdPerUsd} size="lg" />

              {inStock ? (
                <AddToBasket kind="product" id={product.id} name={product.name} variant="full" />
              ) : (
                <div className="flex flex-col gap-3 rounded-md bg-warn-tint p-4 text-ink">
                  <p className="font-semibold">Out of stock right now</p>
                  <p className="text-small">
                    We restock often. In the meantime, have a look at similar items.
                  </p>
                  {category && (
                    <ButtonLink
                      href={`/shop/${category.slug}`}
                      variant="outline"
                      size="sm"
                      className="self-start"
                    >
                      More in {category.name}
                    </ButtonLink>
                  )}
                </div>
              )}

              <p className="flex gap-3 border-t border-line pt-4 text-small text-ink-body">
                <Clock className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                {sameDay}
              </p>
            </div>

            <section aria-labelledby="about-item" className="flex flex-col gap-2">
              <h2 id="about-item" className="text-h3 text-ink">
                About this item
              </h2>
              <p className="text-ink-body">{product.description}</p>
            </section>
          </div>
        </div>

        <section aria-labelledby="every-order" className="flex flex-col gap-4">
          <h2 id="every-order" className="text-h3 text-ink">
            With every order
          </h2>
          <TrustRow />
        </section>
      </Container>

      {related.length > 0 && (
        <Section tone="surface" size="sm" aria-labelledby="related">
          <SectionHeader
            id="related"
            eyebrow="You might also need"
            title={`Also in ${category?.name ?? 'the shop'}`}
            className="mb-8"
            action={
              category && (
                <Link
                  href={`/shop/${category.slug}`}
                  className="inline-flex min-h-11 items-center font-semibold text-crimson underline-offset-4 hover:underline"
                >
                  See all {category.name}
                </Link>
              )
            }
          />
          <StaggerProductGrid products={related} jmdPerUsd={settings.jmdPerUsd} />
        </Section>
      )}
    </>
  )
}
