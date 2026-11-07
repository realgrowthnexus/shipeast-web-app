import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { activeFilters, type ListingAisle, type ShopQuery, shopHref } from '@/lib/shop-filters'
import { ListingLink } from './listing-nav'

const chip =
  'inline-flex min-h-control items-center gap-1.5 rounded-full border border-crimson bg-surface-selected pr-2.5 pl-3.5 text-small font-semibold text-crimson-deep transition-colors duration-150 hover:bg-surface-strong lg:min-h-9'

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
            <X className="size-icon-sm" aria-hidden />
          </ListingLink>
        </li>
      ))}
      {chips.length > 1 && (
        <li>
          <ListingLink
            href={shopHref(basePath, { ...query, q: '', aisles: [], price: 'any', inStock: false })}
            className="inline-flex min-h-control items-center px-2 text-small font-semibold text-crimson underline-offset-2 hover:underline lg:min-h-9"
          >
            Clear all
          </ListingLink>
        </li>
      )}
    </ul>
  )
}
