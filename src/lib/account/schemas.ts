import { z } from 'zod'
import {
  community,
  jamaicanPhone,
  landmark,
  optionalText,
  personName,
  street,
} from '@/lib/orders/checkout-schema'

/** Every form in sign-in and My account. Validated on the server; the browser only helps. */

const email = z.email('Enter an email address like name@example.com.').max(200).toLowerCase()

/** Supabase stops reading passwords after 72 bytes, so longer ones are refused up front. */
const newPassword = z
  .string()
  .min(8, 'Use at least 8 characters.')
  .max(72, 'Keep it under 72 characters.')

/** Senders live overseas, so any country's number is fine here. */
const anyPhone = z
  .string()
  .trim()
  .max(30, 'Keep it under 30 characters.')
  .refine(
    (v) => !v || /^[+\d][\d\s().-]{6,}$/.test(v),
    'Enter a phone number, like +1 416 555 0123.',
  )
  .transform((v) => v || null)

export const signInSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password.').max(200),
})

export const signUpSchema = z.object({
  fullName: personName('Enter your name.'),
  email,
  phone: anyPhone,
  password: newPassword,
})

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z
  .object({ password: newPassword, confirm: z.string() })
  .refine((v) => v.password === v.confirm, {
    path: ['confirm'],
    message: 'The two passwords don’t match.',
  })

export const profileSchema = z.object({
  fullName: personName('Enter your name.'),
  phone: anyPhone,
  emailUpdates: z.boolean(),
  smsUpdates: z.boolean(),
})

export const emailChangeSchema = z.object({ email })

export const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .max(40, 'Keep it under 40 characters.')
    .transform((v) => v.replace(/\s+-\s+/, ' — ')),
  recipientName: personName('Enter the name of the person receiving it.'),
  phone: jamaicanPhone,
  street,
  community,
  parish: z.string().trim().min(1, 'Choose the parish.').max(40),
  landmark,
  notes: optionalText(300).transform((v) => v ?? ''),
  isDefault: z.boolean(),
})

export type AddressData = z.output<typeof addressSchema>

/** Field name → first error message, for showing under each field. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) errors[String(issue.path[0])] ??= issue.message
  return errors
}

/** Form state shared by every account form. `values` refill the form after an error. */
export type FormState =
  | { status: 'idle' }
  | { status: 'ok'; message: string }
  | {
      status: 'error'
      message?: string
      errors: Record<string, string>
      values: Record<string, string>
    }

export const idle: FormState = { status: 'idle' }

/** The text fields of a form, for refilling it. Passwords are never sent back. */
export function formValues(form: FormData, keys: string[]): Record<string, string> {
  return Object.fromEntries(keys.map((k) => [k, String(form.get(k) ?? '')]))
}
