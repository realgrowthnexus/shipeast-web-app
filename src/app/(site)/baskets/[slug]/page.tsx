import {
  Camera,
  CalendarSync,
  Clock3,
  Gift,
  MessageSquareText,
  Receipt,
  Repeat2,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { Breadcrumb } from '@/components/shop/breadcrumb'
import { ProductImage } from '@/components/shop/product-image'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { deliveryPromise } from '@/components/shop/breadcrumb'
import { BasketCard } from '@/components/shop/product-card'
import { Container } from '@/components/site/page-intro'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { getBasket } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getSettings } from '@/lib/data/site'
import { atLeastOne } from '@/lib/static-params'
import { formatClockTime, formatUsd } from '@/lib/format'
import { basketPhotos } from '@/lib/stock-photos'

export async function generateStaticParams() {
  return atLeastOne(
    'slug',
    (await getBaskets()).map(({ basket }) => basket.slug),
  )
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
  const [settings, zones, allBaskets] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getBaskets(),
  ])
  const { basket, contents, itemCount, separateCents } = found
  const missing = contents.filter((c) => c.product.status !== 'visible')
  const saving = separateCents - basket.priceCents
  const photo = basketPhotos[basket.slug]
  const others = allBaskets.filter((b) => b.basket.id !== basket.id).slice(0, 3)
  const facts = [
    {
      icon: Clock3,
      text: zones.length
        ? deliveryPromise(zones, formatClockTime(zones[0]?.cutoffTime ?? '13:00'))
        : 'Delivery is paused for now. Check back soon.',
    },
    {
      icon: Receipt,
      text: 'Our driver buys every item fresh and sends you a photo of the store receipt.',
    },
    { icon: Camera, text: 'You get a photo at the door when the basket is handed over.' },
    {
      icon: Repeat2,
      text: 'If the store has run out of something, you choose at checkout: a similar item, a call first, or leave it out and get that amount back.',
    },
    {
      icon: MessageSquareText,
      text: 'Your family gets a text when it’s on the way. They don’t need to install anything.',
    },
  ]

  return (
    <>
      <Container className="flex flex-col gap-8 section-sm">
        <Breadcrumb items={[{ href: '/baskets', label: 'Baskets' }, { label: basket.name }]} />

        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-x-12">
          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
            <div className="flex animate-rise flex-col gap-3">
              <p className="eyebrow text-crimson">{itemCount} items in one basket</p>
              <h1 className="text-h1 text-balance text-ink">{basket.name}</h1>
              <p className="text-lead text-ink-body">{basket.description}</p>
            </div>

            {photo && (
              <StockPhoto
                name={photo}
                sizes="(min-width: 1024px) 640px, 100vw"
                className="aspect-video rounded-2xl"
              />
            )}

            <section aria-labelledby="inside">
              <h2 id="inside" className="mb-3 text-h3 text-ink">
                What’s inside ({itemCount} items)
              </h2>
              <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
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
                      <span className="text-small text-ink-muted">{product.size}</span>
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

          <aside className="flex flex-col gap-5 self-start rounded-xl bg-crimson p-card text-white lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Price
              cents={basket.priceCents}
              jmdPerUsd={settings.jmdPerUsd}
              was={separateCents}
              size="lg"
              className="[&_*]:text-white [&_s]:text-on-crimson-muted [&>span:last-child]:text-blush"
            />
            {saving > 0 && (
              <p className="text-small text-blush">
                You save {formatUsd(saving)} compared with buying the items one by one.
              </p>
            )}

            {missing.length ? (
              <div className="rounded-md bg-surface p-4 text-small text-ink">
                <p className="font-semibold">Not available right now</p>
                <p className="mt-1">
                  {missing.map((m) => m.product.name).join(', ')}{' '}
                  {missing.length === 1 ? 'is' : 'are'} out of stock, so this basket can’t be
                  ordered today. You can add the other items one by one from the shop.
                </p>
                <ButtonLink href="/shop" variant="outline" size="sm" className="mt-3">
                  Go to the shop
                </ButtonLink>
              </div>
            ) : (
              <div className="rounded-md bg-surface p-4 text-ink">
                <AddToBasket kind="basket" id={basket.id} name={basket.name} variant="full" />
              </div>
            )}

            <p className="flex gap-3 text-small text-on-crimson-muted">
              <Gift className="mt-0.5 size-5 shrink-0 text-blush" aria-hidden />
              Add a gift message at checkout and we’ll print it and hand it over with the basket.
            </p>
            {settings.features.monthly_orders && (
              <p className="flex gap-3 text-small text-on-crimson-muted">
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

          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
            {saving > 0 && (
              <section aria-labelledby="compare">
                <Reveal className="flex flex-col gap-3">
                  <h2 id="compare" className="text-h3 text-ink">
                    Basket price compared with buying separately
                  </h2>
                  <dl className="grid grid-cols-3 overflow-hidden rounded-lg border border-line bg-surface">
                    <div className="flex flex-col gap-1 p-4">
                      <dt className="text-small text-ink-muted">One by one</dt>
                      <dd className="text-body font-bold text-ink-body tabular-nums sm:text-lead">
                        <s>{formatUsd(separateCents)}</s>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-line p-4">
                      <dt className="text-small text-ink-muted">This basket</dt>
                      <dd className="text-body font-extrabold text-ink tabular-nums sm:text-lead">
                        {formatUsd(basket.priceCents)}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-line bg-surface-tint p-4">
                      <dt className="text-small text-ink-muted">You save</dt>
                      <dd className="text-body font-extrabold text-crimson tabular-nums sm:text-lead">
                        {formatUsd(saving)}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-small text-ink-muted">
                    “One by one” is today’s shop price for the same items and quantities.
                  </p>
                </Reveal>
              </section>
            )}

            <section aria-labelledby="delivery-facts" className="flex flex-col gap-3">
              <h2 id="delivery-facts" className="text-h3 text-ink">
                Delivery and proof
              </h2>
              <Stagger className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-card">
                {facts.map(({ icon: Icon, text }) => (
                  <StaggerItem key={text} className="flex gap-3 text-ink-body">
                    <Icon className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                    {text}
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>
        </div>
      </Container>

      {others.length > 0 && (
        <Section tone="surface" size="sm" aria-labelledby="other-baskets">
          <SectionHeader
            id="other-baskets"
            eyebrow="More baskets"
            title="Other ready-made baskets"
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
            {others.map((b) => (
              <StaggerItem key={b.basket.id} className="flex [&>article]:flex-1">
                <BasketCard
                  basket={b.basket}
                  jmdPerUsd={settings.jmdPerUsd}
                  itemCount={b.itemCount}
                  separateCents={b.separateCents}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}
    </>
  )
}
