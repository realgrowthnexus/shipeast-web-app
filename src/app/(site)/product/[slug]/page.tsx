import { CircleCheck, Clock, Repeat } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Breadcrumb, deliveryPromise } from '@/components/shop/breadcrumb'
import { ProductGrid } from '@/components/shop/product-grid'
import { ProductImage } from '@/components/shop/product-image'
import { Container } from '@/components/site/page-intro'
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
          <div className="relative">
            <ProductImage
              src={product.imagePath}
              alt={product.name}
              categoryId={product.categoryId}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={inStock ? 'rounded-lg' : 'rounded-lg opacity-60 grayscale-[40%]'}
            />
            {!inStock && <Badge className="absolute top-3 left-3">Out of stock</Badge>}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-h1 text-balance text-ink">{product.name}</h1>
              <p className="text-lead text-ink-body">{product.size}</p>
            </div>

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

            <p className="text-ink">{product.description}</p>

            <ul className="flex flex-col gap-3 border-t border-line pt-6 text-small text-ink">
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                {zones.length
                  ? deliveryPromise(zones, cutoff)
                  : 'Delivery is paused for now. Check back soon.'}
              </li>
              <li className="flex gap-3">
                <Repeat className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                If the store has run out on the day, you choose at checkout: a similar item, a call
                first, or leave it out and get that amount back.
              </li>
              <li className="flex gap-3">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                You get a photo of the store receipt and a photo at the door.
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-6 border-t border-line pt-10">
            <h2 id="related" className="mb-5 text-h2 text-ink">
              Also in {category?.name ?? 'the shop'}
            </h2>
            <ProductGrid products={related} jmdPerUsd={settings.jmdPerUsd} />
          </section>
        )}
      </Container>
    </>
  )
}
