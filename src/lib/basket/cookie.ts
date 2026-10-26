import 'server-only'
import { cookies } from 'next/headers'
import { cookieSecret as secret } from '@/lib/secret'
import type { BasketState } from './state'
import { decodeBasket, encodeBasket } from './token'

const COOKIE = 'se_basket'
const THIRTY_DAYS = 60 * 60 * 24 * 30

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
