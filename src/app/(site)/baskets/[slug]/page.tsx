import { CalendarSync, Gift } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Breadcrumb } from '@/components/shop/breadcrumb'
import { ProductImage } from '@/components/shop/product-image'
import { Container } from '@/components/site/page-intro'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { getBasket } from '@/lib/data/catalogue'
import { getBaskets, getSettings } from '@/lib/data/site'
import { formatUsd } from '@/lib/format'

export async function generateStaticParams() {
  return (await getBaskets()).map(({ basket }) => ({ slug: basket.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/baskets/[slug]'>): Promise<Metadata> {
  const found = await getBasket((await params).slug)
  if (!found) return {}
  return {
    title: found.basket.name,
    description: `${found.basket.description} ${found.itemCount} items for one price, delivered in Jamaica.`,
    alternates: { canonical: `/baskets/${found.basket.slug}` },
  }
}

export default async function BasketPage({ params }: PageProps<'/baskets/[slug]'>) {
  const found = await getBasket((await params).slug)
  if (!found) notFound()
  const settings = await getSettings()
  const { basket, contents, itemCount, separateCents } = found
  const missing = contents.filter((c) => c.product.status !== 'visible')
  const saving = separateCents - basket.priceCents

  return (
    <Container className="flex flex-col gap-8 py-8 sm:py-12">
      <Breadcrumb items={[{ href: '/baskets', label: 'Baskets' }, { label: basket.name }]} />

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-black tracking-tight text-balance text-ink sm:text-4xl">
              {basket.name}
            </h1>
            <p className="text-lg text-ink-muted">{basket.description}</p>
          </div>

          <section aria-labelledby="inside">
            <h2 id="inside" className="mb-3 text-lg font-bold text-ink">
              What’s inside ({itemCount} items)
            </h2>
            <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-blush-100">
              {contents.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-4 p-3">
                  <ProductImage
                    src={product.imagePath}
                    alt=""
                    categoryId={product.categoryId}
                    sizes="64px"
                    className="w-16 shrink-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-semibold text-ink hover:text-crimson"
                    >
                      {product.name}
                    </Link>
                    <span className="text-sm text-ink-muted">{product.size}</span>
                  </div>
                  {product.status !== 'visible' && <Badge tone="warn">Out of stock</Badge>}
                  <span className="font-bold whitespace-nowrap text-ink tabular-nums">
                    × {quantity}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-5 self-start rounded-lg bg-premium p-6 text-white shadow-lift lg:sticky lg:top-24">
          <Price
            cents={basket.priceCents}
            jmdPerUsd={settings.jmdPerUsd}
            was={separateCents}
            size="lg"
            className="[&_*]:text-white [&_s]:text-white/60 [&>span:last-child]:text-blush"
          />
          {saving > 0 && (
            <p className="text-sm text-blush">
              You save {formatUsd(saving)} compared with buying the items one by one.
            </p>
          )}

          {missing.length ? (
            <div className="rounded-md bg-white p-4 text-sm text-ink">
              <p className="font-semibold">Not available right now</p>
              <p className="mt-1">
                {missing.map((m) => m.product.name).join(', ')}{' '}
                {missing.length === 1 ? 'is' : 'are'} out of stock, so this basket can’t be ordered
                today. You can add the other items one by one from the shop.
              </p>
              <ButtonLink href="/shop" variant="outline" size="sm" className="mt-3">
                Go to the shop
              </ButtonLink>
            </div>
          ) : (
            <div className="rounded-md bg-white p-4 text-ink">
              <AddToBasket kind="basket" id={basket.id} name={basket.name} variant="full" />
            </div>
          )}

          <p className="flex gap-3 text-sm text-white/85">
            <Gift className="mt-0.5 size-5 shrink-0 text-blush" aria-hidden />
            Add a gift message at checkout and we’ll print it and hand it over with the basket.
          </p>
          {settings.features.monthly_orders && (
            <p className="flex gap-3 text-sm text-white/85">
              <CalendarSync className="mt-0.5 size-5 shrink-0 text-blush" aria-hidden />
              <span>
                Want this every month?{' '}
                <Link
                  href="/monthly"
                  className="font-semibold text-white underline underline-offset-2"
                >
                  Set up a monthly order
                </Link>
              </span>
            </p>
          )}
        </aside>
      </div>
    </Container>
  )
}
