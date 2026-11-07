import { PackageOpen, PackageSearch } from 'lucide-react'
import Link from 'next/link'
import { lightLink } from '@/components/site/links'
import { EmptyState } from '@/components/ui/card'
import { buttonStyles } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import { ListingLink } from './listing-nav'

/** Nothing matches the filters: the chips again, a way out, and the whole-shop search. */
export function NoMatches({
  chips,
  clearHref,
  query,
  request,
}: {
  chips: ReactNode
  clearHref: string
  /** The find text, for "Search the whole shop for …". */
  query: string
  request: { href: string; label: string }
}) {
  return (
    <EmptyState
      icon={<PackageSearch aria-hidden />}
      title="No items match these filters"
      action={
        <div className="flex flex-col items-center gap-3">
          {chips}
          <ListingLink href={clearHref} className={buttonStyles({ variant: 'primary' })}>
            Clear all filters
          </ListingLink>
          {query && (
            <Link href={`/search?q=${encodeURIComponent(query)}`} className={lightLink}>
              Search the whole shop for “{query}”
            </Link>
          )}
          <Link href={request.href} className={cn(lightLink, 'text-small')}>
            {request.label}
          </Link>
        </div>
      }
    >
      Remove a filter, or search the whole shop.
    </EmptyState>
  )
}

/** A department with nothing listed yet: point to the others. */
export function EmptyDepartment({
  departments,
}: {
  departments: { href: string; name: string }[]
}) {
  return (
    <EmptyState
      icon={<PackageOpen aria-hidden />}
      title="We’re stocking this department"
      action={
        <ul className="flex flex-wrap justify-center gap-2">
          {departments.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="inline-flex min-h-control items-center rounded-full border border-line-strong bg-surface px-4 text-small font-semibold text-ink transition-colors duration-150 hover:border-crimson hover:text-crimson"
              >
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      }
    >
      Nothing here yet. Have a look at the other departments in the meantime.
    </EmptyState>
  )
}
