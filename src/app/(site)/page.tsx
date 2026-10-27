import { BestBaskets } from '@/components/pages/home/best-baskets'
import { DepartmentGrid } from '@/components/pages/home/departments'
import { FeaturesStrip } from '@/components/pages/home/features-strip'
import { HomeHero } from '@/components/pages/home/hero'
import { PopularProducts, popularProducts } from '@/components/pages/home/popular-products'
import { PromoBanners } from '@/components/pages/home/promo-banners'
import { ProofBand } from '@/components/pages/home/proof-band'
import { DeliveryAndQuestions, pickHomeFaqs } from '@/components/pages/home/zones'
import { getProducts } from '@/lib/data/catalogue'
import {
  getActiveZones,
  getBaskets,
  getCategories,
  getFaqs,
  getSettings,
  type BasketSummary,
} from '@/lib/data/site'
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

/** A basket's real saving against buying its items one by one, as a whole percent. */
function saving({ basket, separateCents }: BasketSummary) {
  return separateCents > basket.priceCents
    ? Math.round(((separateCents - basket.priceCents) / separateCents) * 100)
    : 0
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
  const popular = popularProducts(products, categories)

  // The seasonal basket leads the promo row; the everyday ones are the best-value block
  const hamper = baskets.find((b) => b.basket.occasion === 'christmas')
  const everyday = baskets.filter((b) => b !== hamper)
  const hamperSaving = hamper ? saving(hamper) : 0

  // One calm store on a near-white page. Crimson fills only the header, the hero button, the
  // proof band and the baskets lead tile.
  return (
    <div className="bg-surface">
      {/* 1. Promise and the live same-day countdown */}
      <HomeHero
        parishes={parishes}
        cutoff={cutoff}
        zones={zones.map((z) => ({ id: z.id, parish: z.parish, fee: formatUsd(z.feeCents) }))}
      />

      {/* 2. Six square aisles */}
      <DepartmentGrid categories={categories} />

      {/* 3. What to send this season */}
      <PromoBanners
        banners={[
          ...(hamper
            ? [
                {
                  href: `/baskets/${hamper.basket.slug}`,
                  title: 'Christmas, sent home',
                  body: `The ${hamper.basket.name}: ${hamper.basket.description.toLowerCase()} ${formatUsd(hamper.basket.priceCents)}, delivered.`,
                  cta: 'Shop the hamper',
                  photo: 'basketChristmas' as const,
                  saving: hamperSaving ? `Save ${hamperSaving}%` : undefined,
                },
              ]
            : []),
          {
            href: '/gifts',
            title: 'A gift for any day',
            body: 'Birthdays, back to school or a new baby. Add a message at checkout and we print it for them.',
            cta: 'Shop gifts',
            photo: 'giftBirthday' as const,
          },
        ]}
      />

      {/* 4. The store's main grid */}
      {popular.length > 0 && (
        <PopularProducts
          products={popular}
          categories={categories}
          jmdPerUsd={settings.jmdPerUsd}
          note={lastPriceCheck(products)}
        />
      )}

      {/* 5. How it works and the proof on every order (the one crimson band) */}
      <ProofBand jmdPerUsd={settings.jmdPerUsd} />

      {/* 6. Best value: ready-made baskets */}
      {everyday.length > 0 && (
        <BestBaskets
          baskets={everyday}
          jmdPerUsd={settings.jmdPerUsd}
          bestSaving={Math.max(...everyday.map(saving))}
        />
      )}

      {/* 7. Where we deliver, beside the questions a first-time sender asks */}
      <DeliveryAndQuestions zones={zones} faqs={pickHomeFaqs(faqs)} />

      {/* 8. The four promises behind every order */}
      <FeaturesStrip cutoffTime={formatClockTime(cutoff)} parishes={parishes} />
    </div>
  )
}
