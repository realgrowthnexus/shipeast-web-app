import { z } from 'zod'
import { formatJamaicanPhone, toTitleCase } from '@/lib/format'

/** Everything the sender types at checkout. Prices never come from the form. */

export const personName = (message: string) =>
  z.string().trim().min(2, message).max(80, 'Keep it under 80 characters.').transform(toTitleCase)

export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep it under ${max} characters.`)
    .transform((v) => v || null)

export const jamaicanPhone = z.string().transform((v, ctx) => {
  const formatted = formatJamaicanPhone(v)
  if (!formatted) {
    ctx.addIssue({ code: 'custom', message: 'Enter a Jamaican number, like 876-123-1234.' })
    return z.NEVER
  }
  return formatted
})

export const street = z.string().trim().min(3, 'Enter the street address.').max(120)
export const community = z.string().trim().min(2, 'Enter the community or district.').max(80)
export const landmark = z
  .string()
  .trim()
  .min(3, 'Add a landmark the driver can look for, like “opposite the church”.')
  .max(160)

export const checkoutSchema = z.object({
  recipientName: personName('Enter the name of the person receiving it.'),
  recipientPhone: jamaicanPhone,
  street,
  community,
  landmark,
  deliveryNotes: optionalText(300),
  deliveryDate: z.iso.date('Choose a delivery day.'),
  substitutionRule: z.enum(
    ['allow_similar', 'ask_first', 'leave_out'],
    'Choose what we do if something is out of stock.',
  ),
  giftMessage: optionalText(250),
  senderName: personName('Enter your name.'),
  senderEmail: z.email('Enter an email address like name@example.com.').max(200).toLowerCase(),
  senderPhone: optionalText(30),
  paymentMethod: z.enum(['paypal', 'card', 'bank_transfer'], 'Choose how you want to pay.'),
  terms: z.literal('on', 'Please accept the terms to place your order.'),
})

export type CheckoutInput = z.input<typeof checkoutSchema>
export type CheckoutData = z.output<typeof checkoutSchema>
export type CheckoutField = keyof CheckoutData

export const CHECKOUT_FIELDS = Object.keys(checkoutSchema.shape) as CheckoutField[]
