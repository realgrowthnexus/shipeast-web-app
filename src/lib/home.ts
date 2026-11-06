import { usdCentsToJmd } from '@/lib/format'
import type { Basket, DeliveryZone, Faq, Product } from '@/lib/types'

/**
 * Pure helpers for the home page: everything it derives from the loaders, kept out of the
 * components so it can be tested without rendering.
 */

/** `["St. Thomas"]` → `St. Thomas`; two → `A and B`; more → `A, B and C`. Empty → `''`. */
export function joinParishes(parishes: string[]): string {
  if (parishes.length <= 1) return parishes[0] ?? ''
  return `${parishes.slice(0, -1).join(', ')} and ${parishes.at(-1)}`
}

/** The earliest same-day cut-off across the active zones (`HH:MM`), or null with no zones. */
export function earliestCutoff(zones: Pick<DeliveryZone, 'cutoffTime'>[]): string | null {
  if (!zones.length) return null
  // Pad `9:00` to `09:00` so a plain string compare orders the times.
  const pad = (t: string) => t.padStart(5, '0')
  return zones.map((z) => z.cutoffTime).reduce((a, b) => (pad(b) < pad(a) ? b : a))
}

export interface ReceiptLine {
  qty: number
  name: string
  /** Whole Jamaican dollars at the admin-set rate. */
  jmd: number
}

export interface Receipt {
  basketName: string
  lines: ReceiptLine[]
  /** Items beyond the lines shown. */
  more: number
  /** Sum of every line, shown or not, in whole Jamaican dollars. */
  totalJmd: number
}

/** How many lines the drawn receipt shows before "and N more items". */
export const RECEIPT_MAX_LINES = 7

/**
 * The example till receipt in the hero: a real basket's items, priced in J$ at the live rate.
 * Items whose product is missing (hidden or deleted) are left off. Returns null when nothing is
 * left to print.
 */
export function buildReceipt(
  basket: Pick<Basket, 'name' | 'items'>,
  products: Pick<Product, 'id' | 'name' | 'priceCents'>[],
  jmdPerUsd: number,
  max = RECEIPT_MAX_LINES,
): Receipt | null {
  const byId = new Map(products.map((p) => [p.id, p]))
  const all = basket.items.flatMap((item) => {
    const product = byId.get(item.productId)
    if (!product || item.quantity < 1) return []
    return [
      {
        qty: item.quantity,
        name: product.name,
        jmd: usdCentsToJmd(product.priceCents * item.quantity, jmdPerUsd),
      },
    ]
  })
  if (!all.length) return null
  return {
    basketName: basket.name,
    lines: all.slice(0, max),
    more: Math.max(0, all.length - max),
    totalJmd: all.reduce((sum, l) => sum + l.jmd, 0),
  }
}

/** The questions the home page answers first, in this order. */
export const HOME_FAQ_IDS = ['faq-1', 'faq-8', 'faq-9', 'faq-6', 'faq-4']

/** The five home questions: the preferred ids in order, then the lowest `sort` to fill gaps. */
export function pickHomeFaqs(faqs: Faq[], ids = HOME_FAQ_IDS, count = 5): Faq[] {
  const picked = ids.flatMap((id) => faqs.filter((f) => f.id === id))
  const rest = [...faqs].sort((a, b) => a.sort - b.sort).filter((f) => !picked.includes(f))
  return [...picked, ...rest].slice(0, count)
}

const occasionPhrases: Record<Basket['occasion'], string> = {
  everyday: 'the weekly shop',
  baby: 'a new baby',
  christmas: 'Christmas',
  pharmacy: 'the medicine cabinet',
  school: 'back to school',
}

/** The baskets lead, built from the occasions actually featured. */
export function basketsLead(occasions: Basket['occasion'][]): string {
  const phrases = [...new Set(occasions)].map((o) => occasionPhrases[o])
  if (!phrases.length) return 'Put together for the usual needs. Add one in a tap.'
  return `Put together for the usual needs: ${phrases.join(', ')}. Add one in a tap.`
}
