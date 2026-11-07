import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Plain GET form to /search, so it works before JavaScript loads. */
export function SearchBox({
  defaultValue,
  className,
  autoFocus,
  id = 'q',
  compact = false,
  tone = 'light',
}: {
  defaultValue?: string
  className?: string
  autoFocus?: boolean
  /** Unique per page: the header has its own box. */
  id?: string
  /** The pill in the light header: a 52px field with a line-strong border and a 44px button. */
  compact?: boolean
  /** `onDark`: a white field on crimson with a blush focus ring. `compact` wins if both are set. */
  tone?: 'light' | 'onDark'
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
            ? 'min-h-control-lg rounded-full border-control border-line-strong bg-surface hover:border-ink-muted focus:border-crimson focus:ring-1 focus:ring-crimson'
            : tone === 'onDark'
              ? 'min-h-control-lg rounded-md border-0 bg-surface shadow-none focus:ring-3 focus:ring-blush'
              : 'min-h-control-lg rounded-md border-control border-line-strong bg-surface focus:border-crimson focus:ring-1 focus:ring-crimson',
        )}
      />
      <button
        type="submit"
        className={cn(
          'absolute top-1 right-1 bottom-1 grid min-w-11 place-items-center bg-crimson font-semibold text-on-dark transition-colors hover:bg-crimson-deep sm:px-5',
          // The 52px field leaves a 44px button at a 4px inset, in both modes.
          compact ? 'rounded-full' : 'rounded-sm',
        )}
      >
        <Search className="size-5 sm:hidden" aria-hidden />
        <span className="sr-only sm:not-sr-only">Search</span>
      </button>
    </form>
  )
}
