import type { TrackerStage } from '@/lib/order-status'
import type { Basket, BasketItem, DeliveryZone, Product } from '@/lib/types'

/**
 * Pure helpers for How it works: the one example order the page follows. Everything that is
 * not live data here is shown on the page labelled "Example".
 */

/** The basket the example order is built from; the first featured basket if it is gone. */
export const EXAMPLE_BASKET = 'family-food-basket'

/** The parish the example order goes to, when it is an active zone. */
const EXAMPLE_PARISH = 'St. Thomas'

/**
 * Example clock times (Jamaica time, `HH:MM`) for each tracker stage. `closed` has none: refund
 * timing is not promised. Paid sits before any sensible same-day cut-off.
 */
export const EXAMPLE_TIMES: Record<TrackerStage, string | null> = {
  paid: '09:12',
  confirmed: '09:20',
  shopping: '10:35',
  shopped: '11:48',
  out_for_delivery: '12:05',
  delivered: '12:52',
  closed: null,
}

export interface ExampleOrder {
  basketName: string
  basketCents: number
  parish: string
  feeCents: number
  /** Basket plus delivery. */
  totalCents: number
  /** The item the driver could not find, and its refund (one unit). */
  missing: { productId: string; name: string; cents: number } | null
}

/**
 * The example order: a real basket, delivered to St. Thomas (or the first active zone), with
 * the basket's first item that still has a product shown as out of stock. Null when there is
 * no zone to deliver to.
 */
export function buildExampleOrder(
  basket: Pick<Basket, 'name' | 'priceCents' | 'items'>,
  products: Pick<Product, 'id' | 'name' | 'priceCents'>[],
  zones: Pick<DeliveryZone, 'parish' | 'feeCents'>[],
): ExampleOrder | null {
  const zone = zones.find((z) => z.parish === EXAMPLE_PARISH) ?? zones[0]
  if (!zone) return null
  const byId = new Map(products.map((p) => [p.id, p]))
  const first = basket.items.map((i) => byId.get(i.productId)).find((p) => p !== undefined)
  return {
    basketName: basket.name,
    basketCents: basket.priceCents,
    parish: zone.parish,
    feeCents: zone.feeCents,
    totalCents: basket.priceCents + zone.feeCents,
    missing: first ? { productId: first.id, name: first.name, cents: first.priceCents } : null,
  }
}

/**
 * The basket as the driver actually bought it: one unit of the missing item taken off, so the
 * drawn receipts never show the item the example says was out of stock.
 */
export function shoppedItems(
  items: BasketItem[],
  missing: Pick<NonNullable<ExampleOrder['missing']>, 'productId'> | null,
): BasketItem[] {
  if (!missing) return items
  let done = false
  return items.flatMap((item) => {
    if (done || item.productId !== missing.productId) return [item]
    done = true
    return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []
  })
}

/**
 * The questions this page answers, in order: cancelling, paying, bank transfer, stores, gift
 * message. The page drops faq-5 when bank transfer is off.
 */
export const HOW_IT_WORKS_FAQ_IDS = ['faq-10', 'faq-4', 'faq-5', 'faq-2', 'faq-3']
