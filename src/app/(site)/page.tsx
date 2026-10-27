import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { DepartmentRail } from '@/components/pages/home/departments'
import { HomeHero } from '@/components/pages/home/hero'
import { ProofBand } from '@/components/pages/home/proof-band'
import { DeliveryAndQuestions, pickHomeFaqs } from '@/components/pages/home/zones'
import { BasketCard } from '@/components/shop/product-card'
import {
  ProductShelf,
  shelfIsReady,
  shelfLeads,
  shelfProducts,
} from '@/components/shop/product-shelf'
import { CtaBand } from '@/components/site/cta-band'
import { Section } from '@/components/site/section'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getFaqs, getSettings } from '@/lib/data/site'
import { formatClockTime, formatDate, formatUsd } from '@/lib/format'
import type { Product } from '@/lib/types'

/** The most recent shelf-price check across these products, for one small trust line. */
function lastPriceCheck(products: Product[]) {
  const latest = products
    .map((p) => p.priceCheckedAt)
    .filter(Boolean)
    .sort()
    .at(-1)
  return latest ? `Shelf prices checked ${formatDate(latest)}` : undefined
}

export default async function HomePage() {
  const [settings, zones, categories, baskets, faqs, products] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
    getBaskets({ featured: true }),
    getFaqs(),
    getProducts(),
  ])
  const parishes = zones.map((z) => z.parish).join(' and ')
  const cutoff = zones[0]?.cutoffTime ?? '13:00'
  const feeFrom = zones.length ? formatUsd(Math.min(...zones.map((z) => z.feeCents))) : undefined
  const cutoffTime = formatClockTime(cutoff).replace(' ', '\u00a0')
  const waDigits = settings.whatsapp?.replace(/\D/g, '')

  // Each department's shelf, kept off the home page until it has enough real photos
  const shelves = categories
    .map((c) => ({ category: c, items: shelfProducts(products, c.id) }))
    .filter((s) => s.items.length && shelfIsReady(s.items))
  const [first, ...rest] = shelves

  const shelf = (s: (typeof shelves)[number], i: number, note?: string) => (
    <ProductShelf
      key={s.category.id}
      id={`shelf-${s.category.slug}`}
      title={s.category.name}
      lead={shelfLeads[s.category.slug] ?? s.category.description}
      note={note}
      href={`/shop/${s.category.slug}`}
      products={s.items}
      jmdPerUsd={settings.jmdPerUsd}
      divided={i > 0}
    />
  )

  // One calm near-white store. Red fills only the header, the hero button, the proof band and
  // the closing panel.
  return (
    <div className="bg-surface">
      {/* 1. Compact hero: live cut-off, the promise, one action */}
      <HomeHero parishes={parishes} cutoff={cutoff} feeFrom={feeFrom} />

      {/* 2. Departments as round photo tiles */}
      <DepartmentRail categories={categories} />

      {/* 3. The first shelf, with when prices were last checked */}
      {first && shelf(first, 0, lastPriceCheck(products))}

      {/* 4. Ready-made baskets: the store's real savings */}
      {baskets.length > 0 && (
        <Section tone="surface" size="sm" wide aria-labelledby="bsk-h" className="pt-0!">
          <div className="border-t border-line pt-8 sm:pt-12">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <div className="min-w-0">
                <h2 id="bsk-h" className="text-title text-ink">
                  Ready-made baskets
                </h2>
                <p className="mt-1 hidden text-ink-body sm:block">
                  Cheaper than buying the items one by one.
                </p>
              </div>
              <Link
                href="/baskets"
                className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-crimson hover:underline"
              >
                <span className="sm:hidden">See all</span>
                <span className="hidden sm:inline">See all baskets</span>
                <ArrowRight
                  className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </div>
            <ul
              className={`-mx-4 grid snap-x scroll-px-4 auto-cols-[80%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:auto-cols-[45%] lg:mx-0 lg:auto-cols-auto lg:grid-flow-row lg:gap-4 lg:overflow-visible lg:px-0 ${baskets.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
            >
              {baskets.slice(0, 4).map(({ basket, itemCount, separateCents }) => (
                <li key={basket.id} className="flex snap-start [&>article]:flex-1">
                  <BasketCard
                    basket={basket}
                    jmdPerUsd={settings.jmdPerUsd}
                    itemCount={itemCount}
                    separateCents={separateCents}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* 5. How it works and the proof on every order (the one crimson band) */}
      <ProofBand jmdPerUsd={settings.jmdPerUsd} />

      {/* 6. The rest of the store */}
      {rest.map((s, i) => shelf(s, i))}

      {/* 7. Where we deliver, beside the questions a first-time sender asks */}
      <DeliveryAndQuestions zones={zones} faqs={pickHomeFaqs(faqs)} />

      {/* 8. Closing panel */}
      <CtaBand
        title={<>Order by {cutoffTime} Jamaica time. At their door today.</>}
        photo="homeDoorWelcome"
        footnote={
          <>
            Full refund until our driver starts shopping.
            {waDigits && (
              <>
                {' '}
                Questions?{' '}
                <a
                  href={`https://wa.me/${waDigits}`}
                  className="font-semibold text-white underline underline-offset-2"
                >
                  WhatsApp us
                </a>
              </>
            )}
          </>
        }
      >
        Same-day delivery in {parishes}, with a receipt photo and a doorstep photo.
      </CtaBand>
    </div>
  )
}
