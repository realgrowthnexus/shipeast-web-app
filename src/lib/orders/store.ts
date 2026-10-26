import 'server-only'
import { cookies } from 'next/headers'
import type { BasketState } from '@/lib/basket/state'
import type { PricedBasket } from '@/lib/basket/pricing'
import { demoOrders } from '@/lib/demo/orders'
import { isDemoMode } from '@/lib/env'
import { cookieSecret } from '@/lib/secret'
import { signJson, verifyJson } from '@/lib/signed'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { CheckoutData } from './checkout-schema'
import type { PlaceOrderError, SenderOrder } from './types'

/**
 * Orders for the sender's pages. Live, they go through the `create_order` and
 * `order_for_sender` database functions. In demo mode nothing is saved: the order the reviewer
 * just "placed" lives in a signed cookie so the next pages can show it.
 */

const DEMO_COOKIE = 'se_demo_order'
const DEMO_TOKEN_PREFIX = 'demo-'

export type PlaceOrderResult =
  { ok: true; orderNo: string; token: string } | { ok: false; error: PlaceOrderError }

export async function placeOrder(input: {
  form: CheckoutData
  basket: BasketState
  priced: PricedBasket
  jmdPerUsd: number
  customerId?: string | null
}): Promise<PlaceOrderResult> {
  const { form, basket, priced } = input
  if (!priced.zone) return { ok: false, error: 'ZONE_CLOSED' }

  if (isDemoMode()) return placeDemoOrder(input)

  const { data, error } = await supabaseAdmin()
    .rpc('create_order', {
      p: {
        customer_id: input.customerId ?? null,
        sender: { name: form.senderName, email: form.senderEmail, phone: form.senderPhone ?? '' },
        recipient: {
          name: form.recipientName,
          phone: form.recipientPhone,
          street: form.street,
          community: form.community,
          landmark: form.landmark,
          notes: form.deliveryNotes ?? '',
        },
        zone_id: priced.zone.id,
        delivery_date: form.deliveryDate,
        substitution_rule: form.substitutionRule,
        gift_message: form.giftMessage ?? '',
        payment_method: form.paymentMethod,
        promo_code: priced.promo.status === 'applied' ? priced.promo.code : null,
        jmd_per_usd: input.jmdPerUsd,
        lines: basket.lines.map((l) => ({ kind: l.kind, id: l.id, quantity: l.quantity })),
        expect: {
          subtotal_cents: priced.subtotalCents,
          discount_cents: priced.discountCents,
          delivery_fee_cents: priced.deliveryCents ?? 0,
          total_cents: priced.totalCents,
        },
      },
    })
    .single<{ order_no: string; tracking_token: string }>()

  if (error || !data) {
    const code = error?.message as PlaceOrderError | undefined
    if (code && code !== 'UNKNOWN' && /^[A-Z_]+$/.test(code)) return { ok: false, error: code }
    console.error('create_order failed', error)
    return { ok: false, error: 'UNKNOWN' }
  }
  return { ok: true, orderNo: data.order_no, token: data.tracking_token }
}

async function placeDemoOrder({
  form,
  priced,
  jmdPerUsd,
}: Parameters<typeof placeOrder>[0]): Promise<PlaceOrderResult> {
  const now = new Date().toISOString()
  const order: SenderOrder = {
    orderNo: 'SE-10500',
    token: `${DEMO_TOKEN_PREFIX}preview-${Date.now().toString(36)}`,
    status: 'awaiting_payment',
    paymentMethod: form.paymentMethod,
    paymentStatus: 'pending',
    senderEmail: form.senderEmail,
    recipientName: form.recipientName,
    community: form.community,
    parish: priced.zone!.parish,
    deliveryDate: form.deliveryDate,
    substitutionRule: form.substitutionRule,
    giftMessage: form.giftMessage,
    subtotalCents: priced.subtotalCents,
    deliveryFeeCents: priced.deliveryCents ?? 0,
    discountCents: priced.discountCents,
    totalCents: priced.totalCents,
    jmdPerUsd,
    receiptTotalCents: null,
    receiverName: null,
    driverFirstName: null,
    createdAt: now,
    paidAt: null,
    deliveredAt: null,
    items: priced.lines
      .filter((l) => l.available)
      .map((l) => ({
        name: l.name,
        size: l.detail,
        quantity: l.quantity,
        unitPriceCents: l.unitCents,
        outcome: 'pending',
        substituteNote: null,
        refundCents: 0,
      })),
    events: [{ status: 'awaiting_payment', at: now }],
    photos: { receipt: null, door: null },
    preview: true,
  }
  ;(await cookies()).set(DEMO_COOKIE, signJson(order, cookieSecret()), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return { ok: true, orderNo: order.orderNo, token: order.token }
}

/** Updates the demo order (e.g. after a pretend payment). No-op when the site is live. */
export async function updateDemoOrder(token: string, patch: Partial<SenderOrder>) {
  const current = await getSenderOrder(token)
  if (!current?.preview || !token.startsWith(`${DEMO_TOKEN_PREFIX}preview-`)) return
  ;(await cookies()).set(DEMO_COOKIE, signJson({ ...current, ...patch }, cookieSecret()), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

interface OrderRow {
  order_no: string
  token: string
  status: SenderOrder['status']
  payment_method: SenderOrder['paymentMethod']
  payment_status: SenderOrder['paymentStatus']
  sender_email: string
  recipient_name: string
  community: string
  parish: string
  delivery_date: string
  substitution_rule: SenderOrder['substitutionRule']
  gift_message: string | null
  subtotal_cents: number
  delivery_fee_cents: number
  discount_cents: number
  total_cents: number
  jmd_per_usd: number
  receipt_total_cents: number | null
  receiver_name: string | null
  driver_first_name: string | null
  created_at: string
  paid_at: string | null
  delivered_at: string | null
  items: {
    name: string
    size: string
    quantity: number
    unit_price_cents: number
    outcome: SenderOrder['items'][number]['outcome']
    substitute_note: string | null
    refund_cents: number
  }[]
  events: { status: SenderOrder['status']; at: string }[]
  photos: { kind: 'receipt' | 'door'; path: string; at: string }[]
}

/** Photo links last an hour; the tracking page refreshes well within that. */
const PHOTO_URL_SECONDS = 60 * 60

async function signPhoto(
  photo: OrderRow['photos'][number] | undefined,
): Promise<{ url: string; at: string } | null> {
  if (!photo) return null
  const bucket = photo.kind === 'receipt' ? 'receipts' : 'door-photos'
  const { data } = await supabaseAdmin()
    .storage.from(bucket)
    .createSignedUrl(photo.path, PHOTO_URL_SECONDS)
  return data?.signedUrl ? { url: data.signedUrl, at: photo.at } : null
}

export async function getSenderOrder(token: string): Promise<SenderOrder | null> {
  if (!token || token.length > 128) return null

  if (isDemoMode() || token.startsWith(DEMO_TOKEN_PREFIX)) {
    if (!isDemoMode()) return null
    const placed = verifyJson(
      (await cookies()).get(DEMO_COOKIE)?.value,
      cookieSecret(),
    ) as SenderOrder | null
    if (placed?.token === token) return placed
    return demoOrders.find((o) => o.token === token) ?? null
  }

  const { data, error } = await supabaseAdmin().rpc('order_for_sender', { token })
  if (error) throw new Error(`order_for_sender failed: ${error.message}`)
  const o = data as OrderRow | null
  if (!o) return null

  // Newest photo of each kind wins (a driver may retake one).
  const [receipt, door] = await Promise.all([
    signPhoto(o.photos.find((p) => p.kind === 'receipt')),
    signPhoto(o.photos.find((p) => p.kind === 'door')),
  ])
  return {
    orderNo: o.order_no,
    token: o.token,
    status: o.status,
    paymentMethod: o.payment_method,
    paymentStatus: o.payment_status,
    senderEmail: o.sender_email,
    recipientName: o.recipient_name,
    community: o.community,
    parish: o.parish,
    deliveryDate: o.delivery_date,
    substitutionRule: o.substitution_rule,
    giftMessage: o.gift_message,
    subtotalCents: o.subtotal_cents,
    deliveryFeeCents: o.delivery_fee_cents,
    discountCents: o.discount_cents,
    totalCents: o.total_cents,
    jmdPerUsd: Number(o.jmd_per_usd),
    receiptTotalCents: o.receipt_total_cents,
    receiverName: o.receiver_name,
    driverFirstName: o.driver_first_name,
    createdAt: o.created_at,
    paidAt: o.paid_at,
    deliveredAt: o.delivered_at,
    items: o.items.map((i) => ({
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      unitPriceCents: i.unit_price_cents,
      outcome: i.outcome,
      substituteNote: i.substitute_note,
      refundCents: i.refund_cents,
    })),
    events: o.events,
    photos: { receipt, door },
  }
}

/** For the "Track an order" form. Returns the tracking token, or null if nothing matches. */
export async function findOrderToken(orderNo: string, email: string): Promise<string | null> {
  if (isDemoMode()) {
    const match = demoOrders.find((o) => o.orderNo === orderNo.trim().toUpperCase())
    return match?.token ?? null
  }
  const { data, error } = await supabaseAdmin().rpc('find_order_token', {
    p_order_no: orderNo,
    p_email: email,
  })
  if (error) throw new Error(`find_order_token failed: ${error.message}`)
  return (data as string | null) ?? null
}
