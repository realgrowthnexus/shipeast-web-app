import 'server-only'
import { isDemoMode } from '@/lib/env'
import type { PaymentMethod, SiteSettings } from '@/lib/types'

export function paypalConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
}

export function bankTransferConfigured(settings: SiteSettings): boolean {
  const b = settings.bankTransfer
  return Boolean(b.bankName && b.accountName && b.accountNumber)
}

/**
 * Payment methods the sender may choose. A method appears only once it can actually take
 * money; demo mode shows them all so the pages can be reviewed.
 */
export function availablePaymentMethods(settings: SiteSettings): PaymentMethod[] {
  const demo = isDemoMode()
  return [
    ...(demo || paypalConfigured() ? (['paypal', 'card'] as const) : []),
    ...(demo || bankTransferConfigured(settings) ? (['bank_transfer'] as const) : []),
  ]
}
