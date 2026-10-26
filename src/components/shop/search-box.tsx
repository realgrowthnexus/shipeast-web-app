import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Plain GET form to /search, so it works before JavaScript loads. */
export function SearchBox({
  defaultValue,
  className,
  autoFocus,
}: {
  defaultValue?: string
  className?: string
  autoFocus?: boolean
}) {
  return (
    <form action="/search" role="search" className={cn('relative w-full', className)}>
      <label htmlFor="q" className="sr-only">
        Search the shop
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted"
        aria-hidden
      />
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="Rice, diapers, detergent…"
        maxLength={80}
        className="min-h-13 w-full rounded-md border-[1.5px] border-line-strong bg-surface pr-28 pl-12 text-body text-ink placeholder:text-ink-muted focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-1.5 right-1.5 bottom-1.5 rounded-sm bg-crimson px-4 font-semibold text-white"
      >
        Search
      </button>
    </form>
  )
}
