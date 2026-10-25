import { PaymentFlowError, startPayPalPayment } from '@/lib/orders/payments'
import { readToken, sameOrigin } from '@/lib/payments/request'

/** Creates the PayPal order for a ShipEast order the sender is about to pay. */
export async function POST(request: Request) {
  const token = await readToken(request)
  if (!sameOrigin(request) || !token)
    return Response.json({ error: 'Bad request' }, { status: 400 })
  try {
    return Response.json({ id: await startPayPalPayment(token) })
  } catch (error) {
    if (error instanceof PaymentFlowError) {
      return Response.json({ error: error.code }, { status: 409 })
    }
    console.error('PayPal create failed', error)
    return Response.json({ error: 'PAYPAL_UNAVAILABLE' }, { status: 502 })
  }
}
