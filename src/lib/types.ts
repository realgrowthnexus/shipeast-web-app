/**
 * Domain types shared by the site, driver app and admin. They mirror the tables in
 * `supabase/migrations/`; keep both in step. Money is always integer US cents.
 */

export type ProductStatus = 'visible' | 'hidden' | 'out_of_stock'

export type SubstitutionRule = 'allow_similar' | 'ask_first' | 'leave_out'

export type PaymentMethod = 'paypal' | 'card' | 'bank_transfer'

export type DeliverySpeed = 'same_day' | 'next_day' | 'scheduled'

/** Internal order status. See the lifecycle table in docs/PLAN.md. */
export type OrderStatus =
  | 'awaiting_payment'
  | 'payment_failed'
  | 'paid'
  | 'confirmed'
  | 'awaiting_driver'
  | 'driver_assigned'
  | 'shopping'
  | 'shopped'
  | 'out_for_delivery'
  | 'delivered'
  | 'closed'
  | 'cancelled'
  | 'failed_delivery'
  | 'refunded'

export type Role = 'customer' | 'driver' | 'staff' | 'admin'

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  sort: number
}

export interface Product {
  id: string
  slug: string
  name: string
  size: string
  description: string
  categoryId: string
  priceCents: number
  status: ProductStatus
  /** Storage path in the `products` bucket; null shows the branded placeholder. */
  imagePath: string | null
  priceCheckedAt: string
  featured: boolean
}

export interface BasketItem {
  productId: string
  quantity: number
}

export interface Basket {
  id: string
  slug: string
  name: string
  description: string
  priceCents: number
  occasion: 'everyday' | 'baby' | 'pharmacy' | 'school' | 'christmas'
  items: BasketItem[]
  imagePath: string | null
  featured: boolean
}

export interface DeliveryZone {
  id: string
  parish: string
  active: boolean
  feeCents: number
  speed: DeliverySpeed
  /** Same-day cut-off in Jamaica time, `HH:MM`. */
  cutoffTime: string
  minOrderCents: number
  sort: number
}

export interface Faq {
  id: string
  group: 'Ordering' | 'Payment' | 'Substitutions' | 'Delivery' | 'Refunds' | 'Account'
  question: string
  answer: string
  sort: number
}

export interface SiteSettings {
  jmdPerUsd: number
  whatsapp: string
  phone: string
  email: string
  bankTransferHoursToPay: number
  features: {
    monthly_orders: boolean
    auto_offers: boolean
    item_requests: boolean
    cms: boolean
    advanced_reports: boolean
  }
}

export interface PromoCode {
  code: string
  description: string
  /** Exactly one of `percentOff` and `amountOffCents` is set. */
  percentOff: number | null
  amountOffCents: number | null
  minOrderCents: number
  startsAt: string | null
  endsAt: string | null
  active: boolean
}
