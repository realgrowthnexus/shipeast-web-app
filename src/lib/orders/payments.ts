import 'server-only'
import { isDemoMode } from '@/lib/env'
import {
  capturePayPalOrder,
  createPayPalOrder,
  PayPalError,
  type CaptureResult,
} from '@/lib/payments/paypal'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { PaymentMethod } from '@/lib/types'
import { getSenderOrder, updateDemoOrder } from './store'
import type { SenderOrder } from './types'

/** Paying for an order that has been placed. Totals always come from the saved order. */

const PAYABLE: SenderOrder['status'][] = ['awaiting_payment', 'payment_failed']

export const confirmedPath = (o: Pick<SenderOrder, 'orderNo' | 'token'>) =>
  `/order/${o.orderNo}/confirmed?t=${encodeURIComponent(o.token)}`
export const failedPath = (o: Pick<SenderOrder, 'orderNo' | 'token'>) =>
  `/order/${o.orderNo}/payment-failed?t=${encodeURIComponent(o.token)}`
export const payPath = (o: Pick<SenderOrder, 'orderNo' | 'token'>) =>
  `/checkout/pay/${o.orderNo}?t=${encodeURIComponent(o.token)}`
export const bankPath = (o: Pick<SenderOrder, 'orderNo' | 'token'>) =>
  `/checkout/bank-transfer/${o.orderNo}?t=${encodeURIComponent(o.token)}`

async function payableOrder(token: string): Promise<SenderOrder> {
  const order = await getSenderOrder(token)
  if (!order) throw new PaymentFlowError('NOT_FOUND')
  if (!PAYABLE.includes(order.status)) throw new PaymentFlowError('ALREADY_PAID')
  return order
}

export class PaymentFlowError extends Error {
  constructor(readonly code: 'NOT_FOUND' | 'ALREADY_PAID' | 'WRONG_METHOD' | 'MISMATCH') {
    super(code)
  }
}

/** Creates the PayPal order the buttons approve. */
export async function startPayPalPayment(token: string): Promise<string> {
  const order = await payableOrder(token)
  if (order.paymentMethod === 'bank_transfer') throw new PaymentFlowError('WRONG_METHOD')
  return createPayPalOrder({ orderNo: order.orderNo, totalCents: order.totalCents })
}

async function recordPayment(
  orderNo: string,
  ref: string,
  amountCents: number,
  status: 'captured' | 'pending' | 'failed',
  raw: unknown,
) {
  const { error } = await supabaseAdmin().rpc('record_payment', {
    p_order_no: orderNo,
    p_provider: 'paypal',
    p_provider_ref: ref,
    p_amount_cents: amountCents,
    p_status: status,
    p_raw: raw ?? null,
  })
  if (error) throw new Error(`record_payment failed: ${error.message}`)
}

const captureStatus = (s: CaptureResult['status']) =>
  s === 'COMPLETED' ? 'captured' : s === 'PENDING' ? 'pending' : 'failed'

/** Captures an approved PayPal order and returns where the sender goes next. */
export async function finishPayPalPayment(token: string, paypalOrderId: string): Promise<string> {
  const order = await payableOrder(token)
  try {
    const capture = await capturePayPalOrder(paypalOrderId)
    if (capture.orderNo !== order.orderNo) throw new PaymentFlowError('MISMATCH')
    const status = captureStatus(capture.status)
    await recordPayment(order.orderNo, capture.captureId, capture.amountCents, status, capture.raw)
    return status === 'failed' ? failedPath(order) : confirmedPath(order)
  } catch (error) {
    if (error instanceof PayPalError) {
      await recordPayment(order.orderNo, `failed-${paypalOrderId}`, order.totalCents, 'failed', {
        issue: error.issue,
        status: error.status,
      })
      return `${failedPath(order)}&reason=${encodeURIComponent(error.issue ?? 'declined')}`
    }
    throw error
  }
}

/** Demo mode only: pretend the payment went through, or was declined. */
export async function simulatePayment(token: string, outcome: 'paid' | 'failed'): Promise<string> {
  if (!isDemoMode()) throw new Error('Simulated payments only run in demo mode.')
  const order = await payableOrder(token)
  const now = new Date().toISOString()
  await updateDemoOrder(token, {
    status: outcome === 'paid' ? 'paid' : 'payment_failed',
    paymentStatus: outcome === 'paid' ? 'captured' : 'failed',
    paidAt: outcome === 'paid' ? now : null,
    events: [...order.events, { status: outcome === 'paid' ? 'paid' : 'payment_failed', at: now }],
  })
  return outcome === 'paid'
    ? confirmedPath(order)
    : `${failedPath(order)}&reason=INSTRUMENT_DECLINED`
}

/** Switches an unpaid order to another payment method and returns the page to pay on. */
export async function changePaymentMethod(token: string, method: PaymentMethod): Promise<string> {
  const order = await payableOrder(token)
  if (isDemoMode()) {
    await updateDemoOrder(token, {
      paymentMethod: method,
      status: 'awaiting_payment',
      paymentStatus: 'pending',
    })
  } else {
    const { error } = await supabaseAdmin().rpc('change_payment_method', {
      p_token: token,
      p_method: method,
    })
    if (error) throw new Error(`change_payment_method failed: ${error.message}`)
  }
  return method === 'bank_transfer' ? bankPath(order) : payPath(order)
}
