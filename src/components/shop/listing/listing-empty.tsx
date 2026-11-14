import { PackageOpen, PackageSearch } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ListingLink } from './listing-nav'

const card = 'rounded-xl border border-line bg-surface p-card-lg text-center'
const well = 'mx-auto grid size-12 place-items-center rounded-md bg-surface-muted text-crimson'
const title = 'mt-4 font-display text-title font-semibold text-ink text-balance'
const body = 'mx-auto mt-1.5 max-w-[48ch] text-small text-ink-body'
const textLink =
  'inline-flex min-h-control items-center text-small font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep'

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
    <div className={card}>
      <span className={well}>
        <PackageSearch className="size-icon-lg" aria-hidden />
      </span>
      <h3 className={title}>Nothing matches these filters</h3>
      <p className={body}>Remove a filter, or search the whole shop.</p>
      <div className="mt-5 flex flex-col items-center gap-3 [&_ul]:justify-center">
        {chips}
        <ListingLink
          href={clearHref}
          className="btn-slide inline-flex h-control items-center justify-center rounded-md bg-crimson px-6 text-small font-semibold text-on-dark [--slide:var(--color-oxblood)] active:translate-y-px"
        >
          Clear all filters
        </ListingLink>
        {query && (
          <Link href={`/search?q=${encodeURIComponent(query)}`} className={textLink}>
            Search the whole shop for “{query}”
          </Link>
        )}
        <Link href={request.href} className={textLink}>
          {request.label}
        </Link>
      </div>
    </div>
  )
}

/** A department with nothing listed yet: say so plainly and point to the others. */
export function EmptyDepartment({
  name,
  request,
  departments,
}: {
  name: string
  request: { href: string; label: string }
  departments: { href: string; name: string }[]
}) {
  return (
    <div className={card}>
      <span className={well}>
        <PackageOpen className="size-icon-lg" aria-hidden />
      </span>
      <h3 className={title}>Nothing in {name} yet</h3>
      <p className={body}>
        We’re stocking this department. Tell us what they need and we’ll look for it in store.
      </p>
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {departments.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="inline-flex h-control items-center rounded-md border border-line bg-surface px-3.5 text-small font-medium text-ink transition-colors duration-200 hover:border-line-hover hover:bg-surface-muted"
            >
              {d.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={request.href} className={`${textLink} mt-3`}>
        {request.label}
      </Link>
    </div>
  )
}
