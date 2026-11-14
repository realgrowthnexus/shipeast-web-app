import { ChevronLeft, ShoppingBasket } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BuyBox } from '@/components/product/buy-box'
import { ProductBasketControl } from '@/components/product/product-basket-control'
import { ProductBaskets } from '@/components/product/product-baskets'
import { ProductBuyProvider } from '@/components/product/product-buy-provider'
import { ProductDetails } from '@/components/product/product-details'
import { ProductDock } from '@/components/product/product-dock'
import { RailSkeleton } from '@/components/product/product-skeleton'
import { ProductStage } from '@/components/product/product-stage'
import { Breadcrumb } from '@/components/shop/breadcrumb'
import { ListingHelpRow } from '@/components/shop/listing/listing-help-row'
import { ListingNavProvider } from '@/components/shop/listing/listing-nav'
import { MoreFromShop } from '@/components/shop/listing/more-from-shop'
import { departmentIcons } from '@/components/shop/product-image'
import { readBasket } from '@/lib/basket/cookie'
import { getAisles, getProduct, getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getSettings } from '@/lib/data/site'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { earliestCutoff } from '@/lib/home'
import { basketsWith, relatedProducts } from '@/lib/product-page'
import { defaultQuery, shopHref } from '@/lib/shop-filters'
import { site } from '@/lib/site'
import { atLeastOne } from '@/lib/static-params'
import type { Product } from '@/lib/types'
import { unitPriceLabel } from '@/lib/unit-price'

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
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      // ShipEast's own product picture when there is one, otherwise the brand card.
      images: [product.imagePath?.startsWith('/') ? product.imagePath : '/brand/og-default.png'],
    },
  }
}

/** This product's quantity in the basket cookie (0 when it isn't there). */
async function basketQuantity(productId: string) {
  const basket = await readBasket()
  return basket.lines.find((l) => l.kind === 'product' && l.id === productId)?.quantity ?? 0
}

/**
 * The product page, v2 (docs/product-v2/PLAN.md): a slim trail, the stage beside a sticky buy
 * box that answers "sold out? when? where? how will I know?" next to the button, the details,
 * the baskets that hold the item, more from its aisle, the help strip, and a buy bar on phones.
 */
export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const [settings, categories, zones, products, aisles, summaries] = await Promise.all([
    getSettings(),
    getCategories(),
    getActiveZones(),
    getProducts(),
    getAisles(product.categoryId),
    getBaskets(),
  ])
  const category = categories.find((c) => c.id === product.categoryId)
  const aisle = aisles.find((a) => a.id === product.aisleId)
  const departmentHref = category ? `/shop/${category.slug}` : '/shop'
  const aisleLink =
    aisle && category
      ? { name: aisle.name, href: shopHref(departmentHref, defaultQuery, { aisles: [aisle.slug] }) }
      : null
  // The buy box's chip and the out-of-stock note fall back to the department.
  const shelfLink = aisleLink ?? (category ? { name: category.name, href: departmentHref } : null)
  const inStock = product.status === 'visible'
  const unitPrice = unitPriceLabel(product.size, product.priceCents)
  const related = relatedProducts(product, products, 6)
  const baskets = basketsWith(product.id, summaries, products, 3)
  // Not awaited: read inside the Suspense boundaries of the controls that need it.
  const quantity = basketQuantity(product.id)

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
      <ListingNavProvider>
        <ProductBuyProvider
          productId={product.id}
          name={product.name}
          inStock={inStock}
          quantity={quantity}
        >
          <div>
            <div className="mx-auto w-full max-w-wide gutter">
              <div className="pt-2 pb-1 lg:pt-5 lg:pb-4">
                <Link
                  href={departmentHref}
                  className="-ml-2 inline-flex h-control items-center gap-1 rounded-md px-2 text-small font-medium text-ink-body transition-colors duration-200 hover:bg-surface-muted hover:text-crimson lg:hidden"
                >
                  <ChevronLeft className="size-icon" aria-hidden />
                  {category?.name ?? 'Shop'}
                </Link>
                <div className="hidden min-h-control items-center lg:flex">
                  <Breadcrumb
                    items={[
                      { href: '/shop', label: 'Shop' },
                      ...(category ? [{ href: departmentHref, label: category.name }] : []),
                      ...(aisleLink ? [{ href: aisleLink.href, label: aisleLink.name }] : []),
                      { label: product.name },
                    ]}
                  />
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8">
                <div className="lg:col-span-6">
                  <ProductStage product={product} />
                </div>
                <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
                  <BuyBox
                    product={product}
                    aisle={shelfLink}
                    unitPrice={unitPrice}
                    jmdPerUsd={settings.jmdPerUsd}
                    cutoff={earliestCutoff(zones)}
                    parishes={zones.map((z) => z.parish)}
                    control={
                      <Suspense
                        fallback={<div aria-busy="true" className="h-control w-full skeleton" />}
                      >
                        <ProductBasketControl
                          variant="full"
                          fallback={
                            shelfLink
                              ? { label: `See more ${shelfLink.name}`, href: shelfLink.href }
                              : { label: 'See more in the shop', href: '/shop' }
                          }
                        />
                      </Suspense>
                    }
                  />
                </div>
                <div className="lg:col-span-6 lg:row-start-2 lg:self-start">
                  <ProductDetails product={product} aisle={aisleLink} unitPrice={unitPrice} />
                </div>
              </div>

              <ProductBaskets baskets={baskets} name={product.name} />

              {related.products.length > 0 && (
                <Suspense fallback={<RailSkeleton />}>
                  <RelatedRail
                    products={related.products}
                    jmdPerUsd={settings.jmdPerUsd}
                    {...(aisleLink && related.fromAisle * 2 >= related.products.length
                      ? { title: `More from ${aisleLink.name}`, href: aisleLink.href }
                      : {
                          title: `More from ${category?.name ?? 'the shop'}`,
                          href: departmentHref,
                        })}
                  />
                </Suspense>
              )}

              <div className="pb-12 lg:pb-16">
                <ListingHelpRow
                  itemRequests={settings.features.item_requests}
                  whatsapp={settings.whatsapp}
                />
              </div>
            </div>

            {inStock && (
              <ProductDock>
                <DockSummary product={product} jmdPerUsd={settings.jmdPerUsd} />
              </ProductDock>
            )}
          </div>
        </ProductBuyProvider>
      </ListingNavProvider>
    </>
  )
}

/** The related rail, with each card's quantity from the basket cookie. */
async function RelatedRail({
  products,
  jmdPerUsd,
  title,
  href,
}: {
  products: Product[]
  jmdPerUsd: number
  title: string
  href: string
}) {
  const basket = await readBasket()
  const quantities = Object.fromEntries(
    products.map((p) => [
      p.id,
      basket.lines.find((l) => l.kind === 'product' && l.id === p.id)?.quantity ?? 0,
    ]),
  )
  return (
    <MoreFromShop
      products={products}
      jmdPerUsd={jmdPerUsd}
      quantities={quantities}
      title={title}
      href={href}
      linkLabel="See all"
      headingId="more-from-aisle"
    />
  )
}

/** The dock's left side: a small thumbnail, the name and the price. */
function DockSummary({ product, jmdPerUsd }: { product: Product; jmdPerUsd: number }) {
  const Icon = departmentIcons[product.categoryId] ?? ShoppingBasket
  const packShot = product.imagePath?.startsWith('/products/') ? product.imagePath : null
  return (
    <>
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-surface-muted">
        {packShot ? (
          <Image
            src={packShot}
            alt=""
            fill
            sizes="40px"
            className="object-contain p-1 mix-blend-multiply"
          />
        ) : (
          <Icon className="size-icon text-ink-muted" aria-hidden />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-small font-semibold text-ink">{product.name}</span>
        <span className="block truncate text-xs font-medium text-ink-muted tabular-nums">
          <span className="font-semibold text-ink">{formatUsd(product.priceCents)}</span> about{' '}
          {formatJmd(usdCentsToJmd(product.priceCents, jmdPerUsd))}
        </span>
      </span>
    </>
  )
}
