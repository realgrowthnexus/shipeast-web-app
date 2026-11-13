import { HomeBaskets } from '@/components/home/baskets'
import { HomeClosing } from '@/components/home/closing'
import { HomeDepartments } from '@/components/home/departments'
import { HomeHero } from '@/components/home/hero'
import { HomeJamaica } from '@/components/home/jamaica'
import { HomeProof } from '@/components/home/proof'
import { HomeQuestions } from '@/components/home/questions'
import { HomeShelf } from '@/components/home/shelf'
import { HomeSteps } from '@/components/home/steps'
import { hasProductPhoto } from '@/components/shop/product-image'
import { buildBasketRows } from '@/lib/baskets'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getFaqs, getSettings } from '@/lib/data/site'
import {
  buildReceipt,
  earliestCutoff,
  joinParishes,
  pickFeaturedBaskets,
  pickHomeFaqs,
  pickShelf,
} from '@/lib/home'

/** The basket printed on the example receipt; the first featured basket if it is gone. */
const RECEIPT_BASKET = 'family-food-basket'

/**
 * The home page is a shop window (docs/home-v3/PLAN.md): what we are and the food, the
 * departments, a shelf you can buy from, the baskets, then the proof, the steps, where we
 * deliver, the doubts and one last ask. Every loader is cached, so the body prerenders.
 */
export default async function HomePage() {
  const [settings, zones, categories, allBaskets, products, faqs] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
    getBaskets(),
    getProducts(),
    getFaqs(),
  ])
  const unavailableIds = new Set(
    buildBasketRows(allBaskets, products)
      .filter((r) => r.unavailable.length > 0)
      .map((r) => r.summary.basket.id),
  )
  const featured = pickFeaturedBaskets(allBaskets, unavailableIds)
  const cutoff = earliestCutoff(zones)
  const parishList = joinParishes(zones.map((z) => z.parish))
  const receiptBasket =
    allBaskets.find((b) => b.basket.slug === RECEIPT_BASKET)?.basket ?? featured[0]?.basket
  const receipt = receiptBasket ? buildReceipt(receiptBasket, products, settings.jmdPerUsd) : null
  const homeFaqs = pickHomeFaqs(faqs)
  const bankTransfer = Boolean(settings.bankTransfer.bankName)
  const groceries = categories.find((c) => c.slug === 'groceries') ?? categories[0]
  const shelf = groceries
    ? pickShelf(
        products.filter((p) => p.categoryId === groceries.id),
        hasProductPhoto,
      )
    : []

  return (
    <>
      <HomeHero
        parishList={parishList}
        zones={zones}
        cutoff={cutoff}
        fromBasketCents={
          featured.length ? Math.min(...featured.map((b) => b.basket.priceCents)) : null
        }
        receipt={receipt}
      />
      {categories.length > 0 && <HomeDepartments categories={categories} />}
      {groceries && shelf.length >= 3 && (
        <HomeShelf
          products={shelf}
          jmdPerUsd={settings.jmdPerUsd}
          allHref={`/shop/${groceries.slug}`}
          allLabel={`All ${groceries.name.toLowerCase()}`}
        />
      )}
      {featured.length > 0 && (
        <HomeBaskets baskets={featured} products={products} jmdPerUsd={settings.jmdPerUsd} />
      )}
      <HomeProof receipt={receipt} />
      <HomeSteps payLine={bankTransfer ? 'PayPal, a card or bank transfer' : 'PayPal or a card'} />
      <HomeJamaica zones={zones} parishList={parishList} />
      {homeFaqs.length >= 3 && (
        <HomeQuestions
          faqs={homeFaqs}
          email={settings.email}
          whatsapp={settings.whatsapp.replace(/\D/g, '')}
        />
      )}
      <HomeClosing parishList={parishList} cutoff={cutoff} />
    </>
  )
}
