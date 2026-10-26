import { describe, expect, it } from 'vitest'
import * as demo from '@/lib/demo'
import { checkPromo, priceBasket, type Catalogue } from './pricing'
import {
  addLine,
  countItems,
  emptyBasket,
  MAX_LINES,
  MAX_QUANTITY,
  removeLine,
  setQuantity,
  type BasketState,
} from './state'
import { decodeBasket, encodeBasket } from './token'

const catalogue: Catalogue = {
  products: demo.products,
  baskets: demo.baskets,
  zones: demo.zones,
  promos: demo.promos,
}
const rice = demo.products.find((p) => p.slug === 'long-grain-rice-10lb')!
const coffee = demo.products.find((p) => p.slug === 'ground-coffee-24oz')!
const stThomas = demo.zones.find((z) => z.parish === 'St. Thomas')!
const portland = demo.zones.find((z) => z.parish === 'Portland')!
const now = new Date('2026-10-25T15:00:00Z')

const withRice = (quantity: number, extra: Partial<BasketState> = {}): BasketState => ({
  ...emptyBasket,
  lines: [{ kind: 'product', id: rice.id, quantity }],
  ...extra,
})

describe('basket lines', () => {
  it('merges the same item and caps the quantity', () => {
    let s = addLine(emptyBasket, { kind: 'product', id: rice.id, quantity: 2 })
    s = addLine(s, { kind: 'product', id: rice.id, quantity: 3 })
    expect(s.lines).toEqual([{ kind: 'product', id: rice.id, quantity: 5 }])
    s = addLine(s, { kind: 'product', id: rice.id, quantity: 99 })
    expect(s.lines[0].quantity).toBe(MAX_QUANTITY)
  })

  it('keeps a product and a basket with the same id apart', () => {
    let s = addLine(emptyBasket, { kind: 'product', id: 'x', quantity: 1 })
    s = addLine(s, { kind: 'basket', id: 'x', quantity: 1 })
    expect(s.lines).toHaveLength(2)
    expect(countItems(s)).toBe(2)
  })

  it('removes a line when the quantity goes to zero', () => {
    const s = setQuantity(withRice(3), { kind: 'product', id: rice.id }, 0)
    expect(s.lines).toEqual([])
    expect(removeLine(withRice(1), { kind: 'product', id: rice.id }).lines).toEqual([])
  })

  it('stops adding new lines at the limit', () => {
    let s = emptyBasket
    for (let i = 0; i < MAX_LINES + 5; i++)
      s = addLine(s, { kind: 'product', id: `p${i}`, quantity: 1 })
    expect(s.lines).toHaveLength(MAX_LINES)
  })
})

describe('basket cookie', () => {
  const secret = 'x'.repeat(32)

  it('round-trips', () => {
    const s = withRice(2, { zoneId: stThomas.id, promoCode: 'FAMILY10' })
    expect(decodeBasket(encodeBasket(s, secret), secret)).toEqual(s)
  })

  it('throws away a tampered or foreign cookie', () => {
    const token = encodeBasket(withRice(2), secret)
    const forged = Buffer.from(JSON.stringify(withRice(20))).toString('base64url')
    expect(decodeBasket(`${forged}.${token.split('.')[1]}`, secret)).toEqual(emptyBasket)
    expect(decodeBasket(token, 'y'.repeat(32))).toEqual(emptyBasket)
    expect(decodeBasket('garbage', secret)).toEqual(emptyBasket)
    expect(decodeBasket(undefined, secret)).toEqual(emptyBasket)
  })
})

describe('pricing', () => {
  it('adds goods and the parish delivery fee', () => {
    const p = priceBasket(withRice(2, { zoneId: stThomas.id }), catalogue, now)
    expect(p.subtotalCents).toBe(rice.priceCents * 2)
    expect(p.deliveryCents).toBe(stThomas.feeCents)
    expect(p.totalCents).toBe(rice.priceCents * 2 + stThomas.feeCents)
    expect(p.canCheckout).toBe(true)
  })

  it('needs an active parish before checkout', () => {
    expect(priceBasket(withRice(2), catalogue, now).canCheckout).toBe(false)
    const closed = priceBasket(withRice(2, { zoneId: portland.id }), catalogue, now)
    expect(closed.zone).toBeNull()
    expect(closed.canCheckout).toBe(false)
  })

  it('reports how far below the parish minimum the basket is', () => {
    const p = priceBasket(withRice(1, { zoneId: stThomas.id }), catalogue, now)
    expect(p.shortOfMinimumCents).toBe(stThomas.minOrderCents - rice.priceCents)
    expect(p.canCheckout).toBe(false)
  })

  it('does not charge out-of-stock items and blocks checkout until removed', () => {
    const s: BasketState = {
      ...withRice(2, { zoneId: stThomas.id }),
      lines: [...withRice(2).lines, { kind: 'product', id: coffee.id, quantity: 1 }],
    }
    const p = priceBasket(s, catalogue, now)
    expect(p.subtotalCents).toBe(rice.priceCents * 2)
    expect(p.hasUnavailable).toBe(true)
    expect(p.canCheckout).toBe(false)
  })

  it('marks a ready-made basket unavailable when one of its items is out', () => {
    const hamper = demo.baskets.find((b) => b.slug === 'christmas-hamper')!
    const p = priceBasket(
      { ...emptyBasket, lines: [{ kind: 'basket', id: hamper.id, quantity: 1 }] },
      catalogue,
      now,
    )
    expect(p.lines[0].available).toBe(false)
  })

  it('drops lines for items that no longer exist', () => {
    const s: BasketState = { ...emptyBasket, lines: [{ kind: 'product', id: 'gone', quantity: 1 }] }
    expect(priceBasket(s, catalogue, now).lines).toEqual([])
  })

  it('takes promo discounts off the goods only', () => {
    const p = priceBasket(
      withRice(4, { zoneId: stThomas.id, promoCode: 'family10' }),
      catalogue,
      now,
    )
    expect(p.discountCents).toBe(Math.round(rice.priceCents * 4 * 0.1))
    expect(p.totalCents).toBe(p.subtotalCents - p.discountCents + stThomas.feeCents)
  })
})

describe('promo codes', () => {
  it('rejects unknown, ended and below-minimum codes with a reason', () => {
    expect(checkPromo('NOPE', 10000, demo.promos, now)).toMatchObject({ status: 'rejected' })
    expect(checkPromo('SUMMER25', 10000, demo.promos, now)).toMatchObject({
      status: 'rejected',
      reason: 'That code has ended.',
    })
    expect(checkPromo('WELCOME5', 3999, demo.promos, now)).toMatchObject({
      status: 'rejected',
      reason: 'This code needs USD$40 or more of shopping.',
    })
  })

  it('never discounts more than the goods cost', () => {
    const promos = [{ ...demo.promos[0], minOrderCents: 0, amountOffCents: 5000 }]
    expect(checkPromo('WELCOME5', 1200, promos, now)).toMatchObject({ discountCents: 1200 })
  })
})
