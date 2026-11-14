import { parseShopQuery, type ListingAisle } from '@/lib/shop-filters'
import { FindInList } from './find-in-list'

/**
 * The band's "Find in Groceries" field (1024+). It reads the URL so it keeps the other active
 * filters, so the band wraps it in its own Suspense boundary with an empty copy as fallback.
 */
export async function BandFind({
  action,
  label,
  aisles,
  searchParams,
}: {
  action: string
  label: string
  aisles: ListingAisle[]
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = parseShopQuery(await searchParams, { aisles })
  return <FindInList action={action} label={label} query={query} idPrefix="band" tone="onCrimson" />
}
