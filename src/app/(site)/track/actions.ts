'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { findOrderToken } from '@/lib/orders/store'

const schema = z.object({
  orderNo: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^SE-\d{5,}$/, 'Order numbers look like SE-10428.'),
  email: z.email('Enter the email you ordered with.').trim().toLowerCase(),
})

export type TrackState =
  | { status: 'idle' }
  | {
      status: 'error'
      errors: { orderNo?: string; email?: string; form?: string }
      values: Record<string, string>
    }

export async function findOrder(_prev: TrackState, form: FormData): Promise<TrackState> {
  const values = {
    orderNo: String(form.get('orderNo') ?? ''),
    email: String(form.get('email') ?? ''),
  }
  const parsed = schema.safeParse(values)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message
    return { status: 'error', errors, values }
  }
  const token = await findOrderToken(parsed.data.orderNo, parsed.data.email)
  if (!token) {
    return {
      status: 'error',
      errors: {
        form: 'We couldn’t find that order. Check the order number and use the email you ordered with.',
      },
      values,
    }
  }
  redirect(`/track/${token}`)
}
