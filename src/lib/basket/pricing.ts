import { formatUsd } from '@/lib/format'
import type { Basket, DeliveryZone, Product, PromoCode } from '@/lib/types'
import type { BasketLine, BasketState } from './state'

export interface PricedLine extends BasketLine {
  name: string
  detail: string
  href: string
  categoryId: string | null
  imagePath: string | null
  unitCents: number
  totalCents: number
  /** False when the item is out of stock or hidden; it isn't charged and must be removed. */
  available: boolean
}

export type PromoResult =
  | { status: 'none' }
  | { status: 'applied'; code: string; description: string; discountCents: number }
  | { status: 'rejected'; code: string; reason: string }

export interface PricedBasket {
  lines: PricedLine[]
  itemCount: number
  subtotalCents: number
  promo: PromoResult
  discountCents: number
  zone: DeliveryZone | null
  /** Null until a parish is chosen. */
  deliveryCents: number | null
  totalCents: number
  /** How much more the sender must add to reach the parish minimum; 0 when met. */
  shortOfMinimumCents: number
  hasUnavailable: boolean
  canCheckout: boolean
}

export interface Catalogue {
  products: Product[]
  baskets: Basket[]
  zones: DeliveryZone[]
  promos: PromoCode[]
}

function priceLine(line: BasketLine, catalogue: Catalogue): PricedLine | null {
  if (line.kind === 'product') {
    const p = catalogue.products.find((x) => x.id === line.id)
    if (!p) return null
    const available = p.status === 'visible'
    return {
      ...line,
      name: p.name,
      detail: p.size,
      href: `/product/${p.slug}`,
      categoryId: p.categoryId,
      imagePath: p.imagePath,
      unitCents: p.priceCents,
      totalCents: available ? p.priceCents * line.quantity : 0,
      available,
    }
  }
  const b = catalogue.baskets.find((x) => x.id === line.id)
  if (!b) return null
  const byId = new Map(catalogue.products.map((p) => [p.id, p]))
  // A ready-made basket can only be bought when every item in it can be bought.
  const available = b.items.every((i) => byId.get(i.productId)?.status === 'visible')
  return {
    ...line,
    name: b.name,
    detail: `${b.items.reduce((n, i) => n + i.quantity, 0)} items, ready-made basket`,
    href: `/baskets/${b.slug}`,
    categoryId: null,
    imagePath: b.imagePath,
    unitCents: b.priceCents,
    totalCents: available ? b.priceCents * line.quantity : 0,
    available,
  }
}

export function checkPromo(
  code: string | null,
  subtotalCents: number,
  promos: PromoCode[],
  now: Date,
): PromoResult {
  if (!code) return { status: 'none' }
  const promo = promos.find((p) => p.code === code.trim().toUpperCase())
  const reject = (reason: string): PromoResult => ({ status: 'rejected', code, reason })
  if (!promo || !promo.active) return reject('We don’t recognise that code.')
  if (promo.startsAt && now < new Date(promo.startsAt)) return reject('That code isn’t open yet.')
  if (promo.endsAt && now >= new Date(promo.endsAt)) return reject('That code has ended.')
  if (subtotalCents < promo.minOrderCents) {
    return reject(`This code needs ${formatUsd(promo.minOrderCents)} or more of shopping.`)
  }
  const raw =
    promo.percentOff !== null
      ? Math.round((subtotalCents * promo.percentOff) / 100)
      : (promo.amountOffCents ?? 0)
  return {
    status: 'applied',
    code: promo.code,
    description: promo.description,
    discountCents: Math.min(raw, subtotalCents),
  }
}

/**
 * Prices a basket from the live catalogue. The same function runs on the basket page and again
 * at checkout, so what the sender sees is what they pay. Promo codes come off the goods, not
 * the delivery fee.
 */
export function priceBasket(
  state: BasketState,
  catalogue: Catalogue,
  now: Date = new Date(),
): PricedBasket {
  const lines = state.lines
    .map((l) => priceLine(l, catalogue))
    .filter((l): l is PricedLine => l !== null)
  const subtotalCents = lines.reduce((sum, l) => sum + l.totalCents, 0)
  const promo = checkPromo(state.promoCode, subtotalCents, catalogue.promos, now)
  const discountCents = promo.status === 'applied' ? promo.discountCents : 0
  const zone = catalogue.zones.find((z) => z.id === state.zoneId && z.active) ?? null
  const deliveryCents = zone && lines.length ? zone.feeCents : null
  const shortOfMinimumCents = zone ? Math.max(0, zone.minOrderCents - subtotalCents) : 0
  const hasUnavailable = lines.some((l) => !l.available)

  return {
    lines,
    itemCount: lines.reduce((n, l) => n + (l.available ? l.quantity : 0), 0),
    subtotalCents,
    promo,
    discountCents,
    zone,
    deliveryCents,
    totalCents: subtotalCents - discountCents + (deliveryCents ?? 0),
    shortOfMinimumCents,
    hasUnavailable,
    canCheckout: subtotalCents > 0 && zone !== null && shortOfMinimumCents === 0 && !hasUnavailable,
  }
}
