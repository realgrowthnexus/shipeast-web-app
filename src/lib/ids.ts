/**
 * Public IDs shown to people. Random (never sequential) and stable: they never change when a
 * name, email or phone changes. The database generates the same shapes in SQL; these
 * helpers exist for demo data, tests and validation.
 */

/** Crockford base32 without I, L, O and U, so IDs read cleanly over the phone. */
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export type PublicIdKind = 'CUS' | 'DRV'

export function randomCode(length = 6): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

export function newPublicId(kind: PublicIdKind): string {
  return `SE-${kind}-${randomCode()}`
}

const PUBLIC_ID = /^SE-(CUS|DRV)-[0-9A-HJKMNP-TV-Z]{6}$/
const ORDER_NO = /^SE-\d{5,}$/

export function isPublicId(value: string, kind?: PublicIdKind): boolean {
  const match = PUBLIC_ID.exec(value)
  return match !== null && (kind === undefined || match[1] === kind)
}

export function isOrderNumber(value: string): boolean {
  return ORDER_NO.test(value)
}
