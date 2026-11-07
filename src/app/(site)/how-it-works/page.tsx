import type { Metadata } from 'next'
import { HomeClosing } from '@/components/pages/home/closing'
import { HomeQuestions } from '@/components/pages/home/questions'
import { HiwFamily } from '@/components/pages/how-it-works/hiw-family'
import { HiwHero } from '@/components/pages/how-it-works/hiw-hero'
import { HiwJourney } from '@/components/pages/how-it-works/hiw-journey'
import { HiwProof } from '@/components/pages/how-it-works/hiw-proof'
import { HiwSubstitutions } from '@/components/pages/how-it-works/hiw-substitutions'
import { HiwTiming } from '@/components/pages/how-it-works/hiw-timing'
import { getProducts } from '@/lib/data/catalogue'
import { getActiveZones, getBaskets, getFaqs, getSettings } from '@/lib/data/site'
import { buildReceipt, earliestCutoff, joinParishes, pickHomeFaqs } from '@/lib/home'
import {
  buildExampleOrder,
  EXAMPLE_BASKET,
  HOW_IT_WORKS_FAQ_IDS,
  shoppedItems,
} from '@/lib/how-it-works'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Follow one order from your laptop to a door in St. Thomas or Kingston: the seven steps you can track, the receipt and door photos, what happens if something is out of stock, and what your family gets by text.',
}

/** How many basket lines the drawn proof pair shows. */
const PROOF_LINES = 3

/**
 * One example order told in time order, with every proof and every choice placed at the moment
 * it happens. Every loader is cached, so the page prerenders; the cut-off countdown is the only
 * runtime part.
 */
export default async function HowItWorksPage() {
  const [settings, zones, allBaskets, products, faqs] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getBaskets(),
    getProducts(),
    getFaqs(),
  ])
  const cutoff = earliestCutoff(zones)
  const parishList = joinParishes(zones.map((z) => z.parish))
  const bankTransfer = Boolean(settings.bankTransfer.bankName)
  const basket =
    allBaskets.find((b) => b.basket.slug === EXAMPLE_BASKET)?.basket ??
    allBaskets.find((b) => b.basket.featured)?.basket
  const order = basket ? buildExampleOrder(basket, products, zones) : null
  // What the driver bought: the out-of-stock item is not on either drawn receipt.
  const bought = basket
    ? { ...basket, items: shoppedItems(basket.items, order?.missing ?? null) }
    : null
  const receipt = bought ? buildReceipt(bought, products, settings.jmdPerUsd) : null

  // The proof pair's lines, quantity applied, so it agrees with the mini receipt in S2.
  const byId = new Map(products.map((p) => [p.id, p]))
  const proofLines = (bought?.items ?? [])
    .flatMap((item) => {
      const p = byId.get(item.productId)
      return p && item.quantity > 0 ? [{ name: p.name, cents: p.priceCents * item.quantity }] : []
    })
    .slice(0, PROOF_LINES)

  const pageFaqs = pickHomeFaqs(
    faqs.filter((f) => bankTransfer || f.id !== 'faq-5'),
    HOW_IT_WORKS_FAQ_IDS,
  )

  return (
    <>
      <HiwHero parishList={parishList} earliestCutoff={cutoff} />
      <HiwJourney order={order} receipt={receipt} bankTransfer={bankTransfer} />
      <HiwProof lines={proofLines} jmdPerUsd={settings.jmdPerUsd} />
      <HiwSubstitutions missing={order?.missing ?? null} />
      <HiwFamily />
      <HiwTiming
        zones={zones}
        earliestCutoff={cutoff}
        bankTransfer={bankTransfer}
        hoursToPay={settings.bankTransferHoursToPay}
      />
      {pageFaqs.length >= 3 && (
        <HomeQuestions
          faqs={pageFaqs}
          email={settings.email}
          whatsapp={settings.whatsapp.replace(/\D/g, '')}
        />
      )}
      <HomeClosing parishList={parishList} earliestCutoff={cutoff} />
    </>
  )
}
