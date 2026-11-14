import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { activeFilters, type ListingAisle, type ShopQuery, shopHref } from '@/lib/shop-filters'
import { ListingLink } from './listing-nav'

const chip =
  'group/chip inline-flex h-9 items-center gap-1 rounded-md bg-surface-selected pr-1 pl-3 text-small font-medium text-crimson-deep transition-colors duration-150 hover:bg-surface-strong'

/**
 * What is applied, above the results: one removable chip per value, plus "Clear all" (keeps
 * the sort) from two chips. Every chip is a link, so it works without JavaScript.
 */
export function ActiveFilters({
  basePath,
  query,
  aisles,
  className,
}: {
  basePath: string
  query: ShopQuery
  aisles: ListingAisle[]
  className?: string
}) {
  const chips = activeFilters(query, { aisles })
  if (!chips.length) return null
  return (
    <ul aria-label="Filters applied" className={cn('flex flex-wrap items-center gap-2', className)}>
      {chips.map((c) => (
        <li key={c.key}>
          <ListingLink href={shopHref(basePath, query, c.patch)} className={chip}>
            <span className="sr-only">Remove filter: </span>
            {c.label}
            <span className="grid size-7 place-items-center rounded-sm transition-colors duration-150 group-hover/chip:bg-surface">
              <X className="size-icon-sm" aria-hidden />
            </span>
          </ListingLink>
        </li>
      ))}
      {chips.length > 1 && (
        <li>
          <ListingLink
            href={shopHref(basePath, { ...query, q: '', aisles: [], price: 'any', inStock: false })}
            className="inline-flex h-9 items-center px-2 text-small font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep"
          >
            Clear all
          </ListingLink>
        </li>
      )}
    </ul>
  )
}
