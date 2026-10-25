import { finishPayPalPayment, PaymentFlowError } from '@/lib/orders/payments'
import { readToken, sameOrigin } from '@/lib/payments/request'

/** Captures the payment once the sender approves it in PayPal; says where to go next. */
export async function POST(request: Request, ctx: RouteContext<'/api/paypal/orders/[id]/capture'>) {
  const [{ id }, token] = await Promise.all([ctx.params, readToken(request)])
  if (!sameOrigin(request) || !token || !/^[A-Z0-9]{8,40}$/.test(id)) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }
  try {
    return Response.json({ redirect: await finishPayPalPayment(token, id) })
  } catch (error) {
    if (error instanceof PaymentFlowError) {
      return Response.json({ error: error.code }, { status: 409 })
    }
    console.error('PayPal capture failed', error)
    return Response.json({ error: 'PAYPAL_UNAVAILABLE' }, { status: 502 })
  }
}
