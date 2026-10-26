import { createHmac, timingSafeEqual } from 'node:crypto'
import { basketSchema, emptyBasket, type BasketState } from './state'

/**
 * Guests keep their basket in a cookie. It's signed so a tampered cookie is thrown away rather
 * than trusted, though prices never come from it anyway. Format: `<base64url json>.<hmac>`.
 */

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function encodeBasket(state: BasketState, secret: string): string {
  const payload = Buffer.from(JSON.stringify(state)).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function decodeBasket(token: string | undefined, secret: string): BasketState {
  if (!token) return emptyBasket
  const [payload, mac] = token.split('.')
  if (!payload || !mac) return emptyBasket
  const expected = Buffer.from(sign(payload, secret))
  const given = Buffer.from(mac)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return emptyBasket
  try {
    const parsed = basketSchema.safeParse(
      JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')),
    )
    return parsed.success ? parsed.data : emptyBasket
  } catch {
    return emptyBasket
  }
}
