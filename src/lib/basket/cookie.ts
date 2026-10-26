import 'server-only'
import { cookies } from 'next/headers'
import { isDemoMode } from '@/lib/env'
import type { BasketState } from './state'
import { decodeBasket, encodeBasket } from './token'

const COOKIE = 'se_basket'
const THIRTY_DAYS = 60 * 60 * 24 * 30

function secret(): string {
  const value = process.env.BASKET_SECRET
  if (value && value.length >= 32) return value
  if (isDemoMode() || process.env.NODE_ENV !== 'production')
    return 'demo-only-basket-secret-not-for-production'
  throw new Error('BASKET_SECRET must be set (32+ characters) once the site is live.')
}

export async function readBasket(): Promise<BasketState> {
  return decodeBasket((await cookies()).get(COOKIE)?.value, secret())
}

export async function writeBasket(state: BasketState): Promise<void> {
  const jar = await cookies()
  if (!state.lines.length && !state.zoneId && !state.promoCode) {
    jar.delete(COOKIE)
    return
  }
  jar.set(COOKIE, encodeBasket(state, secret()), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: THIRTY_DAYS,
  })
}
