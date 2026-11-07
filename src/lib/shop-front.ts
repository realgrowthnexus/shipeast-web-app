import { formatDate } from '@/lib/format'
import type { Product } from '@/lib/types'

/**
 * Pure helpers for the shop's front door: what each aisle sign lists, and the honest line about
 * when shelf prices were last checked in store.
 */

/**
 * Names of the first `n` products a sender can buy today from a shelf that is already in shelf
 * order (`shelfProducts`). Out-of-stock and hidden products are skipped.
 */
export function aisleSample(shelf: Pick<Product, 'name' | 'status'>[], n = 3): string[] {
  return shelf
    .filter((p) => p.status === 'visible')
    .slice(0, n)
    .map((p) => p.name)
}

/** "A", "A and B", "A, B and C", with "and more" when the aisle holds more than the names shown. */
export function aisleSampleLine(names: string[], total: number): string {
  if (!names.length) return ''
  if (total > names.length) return `${names.join(', ')} and more`
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}

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
