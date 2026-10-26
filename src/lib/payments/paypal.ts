import 'server-only'

/**
 * PayPal Orders v2 over plain fetch. PayPal takes both PayPal-account and guest card
 * payments, so this one provider covers the "PayPal" and "Debit or credit card" choices.
 * Stripe was ruled out by the client; a second provider would sit beside this file.
 */

const BASE =
  process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

let cached: { token: string; expires: number } | null = null

async function accessToken(): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!id || !secret) throw new Error('PayPal keys are not set.')
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`)
  const data = (await res.json()) as { access_token: string; expires_in: number }
  cached = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 }
  return cached.token
}

async function call<T>(path: string, init: RequestInit & { idempotencyKey?: string }): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
      ...(init.idempotencyKey ? { 'PayPal-Request-Id': init.idempotencyKey } : {}),
      ...init.headers,
    },
    cache: 'no-store',
  })
  const body = (await res.json().catch(() => ({}))) as T
  if (!res.ok) {
    throw new PayPalError(res.status, body as { name?: string; details?: { issue?: string }[] })
  }
  return body
}

export class PayPalError extends Error {
  constructor(
    readonly status: number,
    readonly body: { name?: string; details?: { issue?: string }[] },
  ) {
    super(`PayPal ${status}: ${body.name ?? 'error'} ${body.details?.[0]?.issue ?? ''}`.trim())
  }
  /** The issue code PayPal gives for a declined card or account, e.g. INSTRUMENT_DECLINED. */
  get issue(): string | undefined {
    return this.body.details?.[0]?.issue
  }
}

/** `5410` → `"54.10"`, PayPal's amount format. */
export const toPayPalAmount = (cents: number) => (cents / 100).toFixed(2)

/** `"54.10"` → `5410`, without floating-point drift. */
export function fromPayPalAmount(value: string): number {
  const [whole, frac = ''] = value.split('.')
  return Number(whole) * 100 + Number(frac.padEnd(2, '0').slice(0, 2))
}

export async function createPayPalOrder(order: {
  orderNo: string
  totalCents: number
}): Promise<string> {
  const data = await call<{ id: string }>('/v2/checkout/orders', {
    method: 'POST',
    // Same ShipEast order and amount → PayPal returns the same order instead of a duplicate.
    idempotencyKey: `create-${order.orderNo}-${order.totalCents}`,
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: order.orderNo,
          custom_id: order.orderNo,
          invoice_id: order.orderNo,
          description: `ShipEast Shop & Send order ${order.orderNo}`,
          amount: { currency_code: 'USD', value: toPayPalAmount(order.totalCents) },
        },
      ],
      application_context: {
        brand_name: 'ShipEast Shop & Send',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    }),
  })
  return data.id
}

export interface CaptureResult {
  status: 'COMPLETED' | 'PENDING' | 'DECLINED' | 'FAILED'
  captureId: string
  amountCents: number
  orderNo: string
  raw: unknown
}

interface CaptureBody {
  purchase_units: {
    custom_id?: string
    reference_id?: string
    payments?: {
      captures?: {
        id: string
        status: CaptureResult['status']
        amount: { value: string }
        custom_id?: string
      }[]
    }
  }[]
}

export async function capturePayPalOrder(paypalOrderId: string): Promise<CaptureResult> {
  const data = await call<CaptureBody>(
    `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: 'POST',
      idempotencyKey: `capture-${paypalOrderId}`,
    },
  )
  return readCapture(data)
}

export function readCapture(data: CaptureBody): CaptureResult {
  const unit = data.purchase_units[0]
  const capture = unit?.payments?.captures?.[0]
  if (!capture) throw new Error('PayPal returned no capture.')
  return {
    status: capture.status,
    captureId: capture.id,
    amountCents: fromPayPalAmount(capture.amount.value),
    orderNo: capture.custom_id ?? unit.custom_id ?? unit.reference_id ?? '',
    raw: data,
  }
}

/** Asks PayPal whether a webhook really came from PayPal for our webhook id. */
export async function verifyWebhook(headers: Headers, event: unknown): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) return false
  const h = (name: string) => headers.get(name) ?? ''
  const data = await call<{ verification_status: string }>(
    '/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      body: JSON.stringify({
        auth_algo: h('paypal-auth-algo'),
        cert_url: h('paypal-cert-url'),
        transmission_id: h('paypal-transmission-id'),
        transmission_sig: h('paypal-transmission-sig'),
        transmission_time: h('paypal-transmission-time'),
        webhook_id: webhookId,
        webhook_event: event,
      }),
    },
  )
  return data.verification_status === 'SUCCESS'
}
