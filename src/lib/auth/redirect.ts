/**
 * Where to go after signing in. Only paths on this site are allowed, so a crafted
 * `?next=https://evil.example` link can't bounce someone off to another site.
 */
export function safeNext(value: unknown, fallback = '/account'): string {
  if (typeof value !== 'string') return fallback
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback
  if (/[\r\n]/.test(value)) return fallback
  return value
}

export function withNext(path: string, next: string | undefined): string {
  return next && next !== '/account' ? `${path}?next=${encodeURIComponent(next)}` : path
}

/** One value from a search param that may repeat. */
export const param = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value
