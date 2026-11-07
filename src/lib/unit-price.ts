import { formatUsd } from '@/lib/format'

/**
 * Honest unit prices for shelf tags, read from a product's own size text in its own US unit.
 * Only when the size parses cleanly; anything else gets no unit price, never a guess.
 */

const num = String.raw`(\d+(?:\.\d+)?)`
const rules: { pattern: RegExp; unit: (n: number, cents: number) => string | null }[] = [
  // "15 oz can, 3 pack": per item
  { pattern: new RegExp(`${num}\\s*pack\\b`, 'i'), unit: (n, c) => (n > 1 ? each(c / n) : null) },
  // "200 count", "300 tablets": per item, or per 100 when one costs under 10 cents
  {
    pattern: new RegExp(`${num}\\s*(?:count|tablets|capsules)\\b`, 'i'),
    unit: (n, c) => (c / n < 10 ? `${money((c * 100) / n)} per 100` : each(c / n)),
  },
  // "30 double rolls", "12 rolls"
  {
    pattern: new RegExp(`${num}\\s*(?:double\\s+)?rolls\\b`, 'i'),
    unit: (n, c) => `${money(c / n)} per roll`,
  },
  // "10 lb bag"
  {
    pattern: new RegExp(`${num}\\s*lbs?\\b`, 'i'),
    unit: (n, c) => (n > 1 ? `${money(c / n)} per lb` : null),
  },
  // "150 fl oz" (before plain oz)
  {
    pattern: new RegExp(`${num}\\s*fl\\.?\\s*oz\\b`, 'i'),
    unit: (n, c) => `${money(c / n)} per fl oz`,
  },
  // "42 oz canister": weight, compared per pound
  { pattern: new RegExp(`${num}\\s*oz\\b`, 'i'), unit: (n, c) => `${money(c / (n / 16))} per lb` },
]

const money = (cents: number) => formatUsd(Math.round(cents))
const each = (cents: number) => `${money(cents)} each`

/** "USD$1.45 per lb", "USD$2.30 each", "USD$0.82 per roll", "USD$6.40 per 100", or null. */
export function unitPriceLabel(size: string, priceCents: number): string | null {
  if (!size || priceCents <= 0) return null
  for (const { pattern, unit } of rules) {
    const m = size.match(pattern)
    if (!m) continue
    const n = Number(m[1])
    return n > 0 ? unit(n, priceCents) : null
  }
  return null
}
