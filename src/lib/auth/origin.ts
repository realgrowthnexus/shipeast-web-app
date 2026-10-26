import 'server-only'
import { headers } from 'next/headers'
import { site } from '@/lib/site'

/**
 * This site's address, for the links in sign-up, reset and email-change emails. Production
 * always uses shipeastja.com; previews and local runs use the address they were opened on.
 */
export async function siteOrigin(): Promise<string> {
  if (process.env.VERCEL_ENV === 'production') return site.url
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  return host ? `${proto}://${host}` : site.url
}

/** Link that lands on /auth/confirm, then goes on to `next`. */
export async function confirmLink(next: string): Promise<string> {
  return `${await siteOrigin()}/auth/confirm?next=${encodeURIComponent(next)}`
}
