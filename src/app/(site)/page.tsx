import { HomeBaskets } from '@/components/pages/home/baskets'
import { HomeClosing } from '@/components/pages/home/closing'
import { HomeCoverage } from '@/components/pages/home/coverage'
import { HomeDepartments } from '@/components/pages/home/departments'
import { HomeHero } from '@/components/pages/home/hero'
import { HomeProof } from '@/components/pages/home/proof'
import { HomeQuestions } from '@/components/pages/home/questions'
import { HomeSteps } from '@/components/pages/home/steps'
import { HomeWhy } from '@/components/pages/home/why'
import { buildBasketRows } from '@/lib/baskets'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getCategories, getFaqs, getSettings } from '@/lib/data/site'
import { buildReceipt, earliestCutoff, joinParishes, pickHomeFaqs } from '@/lib/home'

/** The basket printed on the hero receipt; the first featured basket if it is gone. */
const RECEIPT_BASKET = 'family-food-basket'

/**
 * The home page tells one order's story: what we do (with the receipt as proof), how, the
 * shop, what you and your family receive, why us, where, the doubts, and one last ask.
 * Every loader is cached, so the body prerenders; the basket count and the visitor's clock are
 * the only runtime parts, both isolated.
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
  const featured = allBaskets.filter((b) => b.basket.featured)
  const cutoff = earliestCutoff(zones)
  const parishList = joinParishes(zones.map((z) => z.parish))
  const receiptBasket =
    allBaskets.find((b) => b.basket.slug === RECEIPT_BASKET)?.basket ?? featured[0]?.basket
  const receipt = receiptBasket ? buildReceipt(receiptBasket, products, settings.jmdPerUsd) : null
  const homeFaqs = pickHomeFaqs(faqs)
  const bankTransfer = Boolean(settings.bankTransfer.bankName)

  return (
    <>
      <HomeHero parishList={parishList} earliestCutoff={cutoff} receipt={receipt} />
      <HomeSteps payLine={bankTransfer ? 'PayPal or card, or bank transfer' : 'PayPal or card'} />
      {categories.length > 0 && <HomeDepartments categories={categories} />}
      {featured.length > 0 && (
        <HomeBaskets
          baskets={featured}
          jmdPerUsd={settings.jmdPerUsd}
          unavailableIds={buildBasketRows(featured, products)
            .filter((r) => r.unavailable.length > 0)
            .map((r) => r.summary.basket.id)}
        />
      )}
      <HomeProof />
      <HomeWhy bankTransfer={bankTransfer} />
      <HomeCoverage zones={zones} parishList={parishList} earliestCutoff={cutoff} />
      {homeFaqs.length >= 3 && (
        <HomeQuestions
          faqs={homeFaqs}
          email={settings.email}
          whatsapp={settings.whatsapp.replace(/\D/g, '')}
        />
      )}
      <HomeClosing parishList={parishList} earliestCutoff={cutoff} />
    </>
  )
}
