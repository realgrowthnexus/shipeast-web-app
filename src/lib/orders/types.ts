import type { ItemOutcome, OrderStatus, PaymentMethod, SubstitutionRule } from '@/lib/types'

/** One order as the sender (and the family, through the tracking link) sees it. */
export interface SenderOrder {
  orderNo: string
  token: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'captured' | 'failed' | 'refunded' | 'partially_refunded'
  senderEmail: string
  recipientName: string
  community: string
  parish: string
  deliveryDate: string
  substitutionRule: SubstitutionRule
  giftMessage: string | null
  subtotalCents: number
  deliveryFeeCents: number
  discountCents: number
  totalCents: number
  jmdPerUsd: number
  receiptTotalCents: number | null
  receiverName: string | null
  driverFirstName: string | null
  createdAt: string
  paidAt: string | null
  deliveredAt: string | null
  items: {
    name: string
    size: string
    quantity: number
    unitPriceCents: number
    outcome: ItemOutcome
    substituteNote: string | null
    refundCents: number
  }[]
  events: { status: OrderStatus; at: string }[]
  photos: { receipt: { url: string; at: string } | null; door: { url: string; at: string } | null }
  /** True for demo-mode orders, which are never charged or delivered. */
  preview?: boolean
}

export type PlaceOrderError =
  | 'EMPTY'
  | 'ZONE_CLOSED'
  | 'DATE_PASSED'
  | 'ITEM_UNAVAILABLE'
  | 'BELOW_MINIMUM'
  | 'PROMO_INVALID'
  | 'PROMO_USED_UP'
  | 'PROMO_ALREADY_USED'
  | 'PRICE_CHANGED'
  | 'UNKNOWN'

/** What each refusal from the database means to the sender. */
export const PLACE_ORDER_ERRORS: Record<PlaceOrderError, string> = {
  EMPTY: 'Your basket is empty.',
  ZONE_CLOSED: 'We aren’t delivering to that parish right now.',
  DATE_PASSED: 'That delivery day has passed. Choose another day.',
  ITEM_UNAVAILABLE: 'Something in your basket just sold out. Check your basket and try again.',
  BELOW_MINIMUM: 'Your basket is below the minimum order for that parish.',
  PROMO_INVALID: 'Your promo code can’t be used on this order. Remove it and try again.',
  PROMO_USED_UP: 'That promo code has been fully used. Remove it and try again.',
  PROMO_ALREADY_USED: 'You’ve already used that promo code. Remove it and try again.',
  PRICE_CHANGED: 'A price changed while you were checking out. Check your basket and try again.',
  UNKNOWN: 'We couldn’t place your order. Nothing was charged. Please try again.',
}
