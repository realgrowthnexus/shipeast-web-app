import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Plain GET form to /search, so it works before JavaScript loads. */
export function SearchBox({
  defaultValue,
  className,
  autoFocus,
  id = 'q',
  compact = false,
}: {
  defaultValue?: string
  className?: string
  autoFocus?: boolean
  /** Unique per page: the header has its own box. */
  id?: string
  /** The shorter box in the site header: a white pill on crimson. */
  compact?: boolean
}) {
  return (
    <form action="/search" role="search" className={cn('relative w-full', className)}>
      <label htmlFor={id} className="sr-only">
        Search the shop
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted"
        aria-hidden
      />
      <input
        id={id}
        name="q"
        type="search"
        enterKeyHint="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="Rice, diapers, detergent…"
        maxLength={80}
        className={cn(
          'w-full pr-14 pl-12 text-body text-ink placeholder:text-ink-muted focus:outline-none sm:pr-28',
          compact
            ? 'min-h-12 rounded-full border-0 bg-white shadow-lift focus:ring-3 focus:ring-blush'
            : 'min-h-13 rounded-md border-[1.5px] border-line-strong bg-surface focus:border-crimson focus:ring-1 focus:ring-crimson',
        )}
      />
      <button
        type="submit"
        className={cn(
          'absolute top-1 right-1 bottom-1 grid min-w-11 place-items-center bg-crimson font-semibold text-white transition-colors hover:bg-crimson-deep sm:top-1.5 sm:right-1.5 sm:bottom-1.5 sm:px-5',
          compact ? 'rounded-full' : 'rounded-sm',
        )}
      >
        <Search className="size-5 sm:hidden" aria-hidden />
        <span className="sr-only sm:not-sr-only">Search</span>
      </button>
    </form>
  )
}
