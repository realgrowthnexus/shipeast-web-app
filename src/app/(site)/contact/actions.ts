'use server'

import { z } from 'zod'
import { isDemoMode } from '@/lib/env'

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(100),
  email: z.email('Enter an email address like name@example.com.'),
  topic: z.enum(['order', 'delivery', 'payment', 'other'], 'Choose what your message is about.'),
  orderNo: z
    .string()
    .trim()
    .max(20)
    .regex(/^(SE-\d{5,})?$/i, 'Order numbers look like SE-10428.')
    .optional(),
  message: z.string().trim().min(10, 'Tell us a little more, at least 10 characters.').max(4000),
})

export type ContactState =
  | { status: 'idle' }
  | {
      status: 'error'
      errors: Partial<Record<keyof z.infer<typeof schema>, string>>
      values: Record<string, string>
    }
  | { status: 'sent'; preview: boolean }

export async function sendContactMessage(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(
    ['name', 'email', 'topic', 'orderNo', 'message'].map((k) => [k, String(form.get(k) ?? '')]),
  )
  const parsed = schema.safeParse({ ...values, orderNo: values.orderNo || undefined })
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      errors[key] ??= issue.message
    }
    return { status: 'error', errors, values }
  }

  if (isDemoMode()) return { status: 'sent', preview: true }

  // Phase 3+: store in contact_messages and email info@shipeastja.com through Resend.
  return { status: 'sent', preview: false }
}
