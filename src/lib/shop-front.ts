import { formatDate } from '@/lib/format'
import type { Product } from '@/lib/types'

/**
 * The honest line about when shelf prices were last checked in store (the shop's edge strip).
 */

/** Earliest and latest price-check dates of the products a sender can see (not hidden). */
export function priceCheckRange(
  products: Pick<Product, 'priceCheckedAt' | 'status'>[],
): { from: string; to: string } | null {
  const times = products
    .filter((p) => p.status !== 'hidden' && p.priceCheckedAt)
    .map((p) => p.priceCheckedAt)
    .filter((t) => !Number.isNaN(new Date(t).getTime()))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  if (!times.length) return null
  return { from: times[0], to: times.at(-1)! }
}

/** "Prices checked in store on October 20, 2026." or "… between A and B." (Jamaica days). */
export function priceCheckLine(range: { from: string; to: string }): string {
  const from = formatDate(range.from)
  const to = formatDate(range.to)
  return from === to
    ? `Prices checked in store on ${from}.`
    : `Prices checked in store between ${from} and ${to}.`
}
