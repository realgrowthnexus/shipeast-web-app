import { createHmac, timingSafeEqual } from 'node:crypto'

/** `<base64url json>.<hmac>`: tamper-evident JSON for cookies. */

function mac(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function signJson(value: unknown, secret: string): string {
  const payload = Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${payload}.${mac(payload, secret)}`
}

/** The parsed JSON, or null when the token is missing, malformed or signed with another key. */
export function verifyJson(token: string | undefined, secret: string): unknown {
  if (!token) return null
  const [payload, given] = token.split('.')
  if (!payload || !given) return null
  const expected = Buffer.from(mac(payload, secret))
  const actual = Buffer.from(given)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return null
  }
}
