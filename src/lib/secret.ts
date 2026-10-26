import 'server-only'
import { isDemoMode } from '@/lib/env'

/** Key for signing cookies (basket, demo orders). Required once the site is live. */
export function cookieSecret(): string {
  const value = process.env.BASKET_SECRET
  if (value && value.length >= 32) return value
  if (isDemoMode() || process.env.NODE_ENV !== 'production') {
    return 'demo-only-basket-secret-not-for-production'
  }
  throw new Error('BASKET_SECRET must be set (32+ characters) once the site is live.')
}
