import { cn } from '@/lib/cn'
import { type ListingAisle, type ShopQuery, shopHref } from '@/lib/shop-filters'
import { AisleRowScroller } from './aisle-row-scroller'
import { ListingLink } from './listing-nav'

const chip =
  'inline-flex h-control shrink-0 items-center gap-1.5 rounded-md border px-3.5 text-small font-medium whitespace-nowrap transition-colors duration-200'
const idle = 'border-line bg-surface text-ink hover:border-line-hover hover:bg-surface-muted'
const current = 'border-crimson bg-surface-selected text-crimson-deep'

/**
 * Phones and tablets, department pages: the aisles as one row of chips, one tap each, with
 * counts that respect the price, stock and find filters. Links behave exactly like the
 * sidebar's (pending state, focus to the count). Hidden at 1024+, where the sidebar shows them.
 */
export function AisleRow({
  basePath,
  query,
  aisles,
  counts,
  departmentName,
  total,
}: {
  basePath: string
  query: ShopQuery
  aisles: ListingAisle[]
  counts: Record<string, number>
  departmentName: string
  /** Items matching everything but the aisle filter. */
  total: number
}) {
  const items = [
    {
      key: 'all',
      name: `All ${departmentName}`,
      count: total,
      href: shopHref(basePath, query, { aisles: [], page: 1 }),
      isCurrent: query.aisles.length === 0,
    },
    ...aisles.map((a) => ({
      key: a.slug,
      name: a.name,
      count: counts[a.slug] ?? 0,
      href: shopHref(basePath, query, { aisles: [a.slug], page: 1 }),
      isCurrent: query.aisles.length === 1 && query.aisles[0] === a.slug,
    })),
  ]
  return (
    <nav aria-label={`Aisles in ${departmentName}`} className="mx-auto max-w-wide pt-3 lg:hidden">
      <ul className="relative -my-1.5 rail scroll-px-4 gap-2 gutter py-1.5">
        {items.map((it) => (
          <li key={it.key}>
            {it.count === 0 && !it.isCurrent ? (
              <span
                aria-disabled="true"
                className={cn(chip, 'border-dashed border-line bg-surface text-ink-muted')}
              >
                {it.name}
                <span className="text-xs tabular-nums">0</span>
              </span>
            ) : (
              <ListingLink
                href={it.href}
                aria-current={it.isCurrent ? 'true' : undefined}
                className={cn(chip, it.isCurrent ? current : idle)}
              >
                {it.name}
                <span
                  className={cn(
                    'text-xs tabular-nums',
                    it.isCurrent ? 'text-crimson-deep' : 'text-ink-muted',
                  )}
                >
                  <span className="sr-only">, </span>
                  {it.count}
                </span>
              </ListingLink>
            )}
          </li>
        ))}
        <li aria-hidden className="w-px">
          <AisleRowScroller />
        </li>
      </ul>
    </nav>
  )
}
