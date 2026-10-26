import { fromPayPalAmount, verifyWebhook } from '@/lib/payments/paypal'
import { supabaseAdmin } from '@/lib/supabase/admin'

/**
 * PayPal's server-to-server confirmation. It covers the cases where the sender closes the
 * window before our capture call returns, and later refunds or reversals. Every event is
 * verified with PayPal before anything is recorded; recording twice is harmless.
 */

interface CaptureEvent {
  event_type: string
  resource: { id: string; status: string; custom_id?: string; amount?: { value: string } }
}

const STATUS: Record<string, 'captured' | 'failed' | 'refunded' | undefined> = {
  'PAYMENT.CAPTURE.COMPLETED': 'captured',
  'PAYMENT.CAPTURE.DENIED': 'failed',
  'PAYMENT.CAPTURE.DECLINED': 'failed',
  'PAYMENT.CAPTURE.REFUNDED': 'refunded',
  'PAYMENT.CAPTURE.REVERSED': 'refunded',
}

export async function POST(request: Request) {
  const event = (await request.json().catch(() => null)) as CaptureEvent | null
  if (!event?.event_type) return new Response('Bad request', { status: 400 })

  let verified = false
  try {
    verified = await verifyWebhook(request.headers, event)
  } catch (error) {
    console.error('PayPal webhook verification failed', error)
    return new Response('Verification unavailable', { status: 503 })
  }
  if (!verified) return new Response('Unverified', { status: 401 })

  const status = STATUS[event.event_type]
  const orderNo = event.resource.custom_id
  if (!status || !orderNo || !event.resource.amount) return new Response('Ignored', { status: 200 })

  const { error } = await supabaseAdmin().rpc('record_payment', {
    p_order_no: orderNo,
    p_provider: 'paypal',
    p_provider_ref: event.resource.id,
    p_amount_cents: fromPayPalAmount(event.resource.amount.value),
    p_status: status,
    p_raw: event,
  })
  if (error) {
    console.error('PayPal webhook record failed', error)
    // A non-2xx makes PayPal retry later, which is what we want for a database hiccup.
    return new Response('Retry later', { status: 500 })
  }
  return new Response('OK', { status: 200 })
}
