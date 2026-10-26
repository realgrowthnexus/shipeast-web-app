import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { legalPages, type LegalPage } from '@/lib/demo/legal'

export const LEGAL_SLUGS = [
  'terms',
  'privacy',
  'refunds',
  'substitutions',
  'delivery',
  'cookies',
] as const
export type LegalSlug = (typeof LEGAL_SLUGS)[number]

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  'use cache'
  cacheTag('legal')
  cacheLife('days')
  return legalPages.find((p) => p.slug === slug) ?? null
}
