import { signJson, verifyJson } from '@/lib/signed'
import { basketSchema, emptyBasket, type BasketState } from './state'

/**
 * Guests keep their basket in a cookie. It's signed so a tampered cookie is thrown away rather
 * than trusted, though prices never come from it anyway.
 */

export function encodeBasket(state: BasketState, secret: string): string {
  return signJson(state, secret)
}

export function decodeBasket(token: string | undefined, secret: string): BasketState {
  const parsed = basketSchema.safeParse(verifyJson(token, secret))
  return parsed.success ? parsed.data : emptyBasket
}
