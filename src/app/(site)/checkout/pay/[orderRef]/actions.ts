'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { changePaymentMethod, simulatePayment } from '@/lib/orders/payments'

const token = z.string().min(8).max(128)

export async function simulatePaymentAction(form: FormData) {
  const t = token.parse(form.get('token'))
  const outcome = form.get('outcome') === 'failed' ? 'failed' : 'paid'
  redirect(await simulatePayment(t, outcome))
}

export async function changePaymentMethodAction(form: FormData) {
  const t = token.parse(form.get('token'))
  const method = z.enum(['paypal', 'card', 'bank_transfer']).parse(form.get('method'))
  redirect(await changePaymentMethod(t, method))
}
