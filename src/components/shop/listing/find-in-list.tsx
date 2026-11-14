import { Search } from 'lucide-react'
import Form from 'next/form'
import { cn } from '@/lib/cn'
import type { ShopQuery } from '@/lib/shop-filters'

/**
 * "Find in Groceries": filters this list only (the header search covers the whole shop). A
 * GET form (`next/form`: a client navigation once loaded, a normal submit before) that keeps
 * the other active filters as hidden fields and starts again from the first batch.
 */
export function FindInList({
  action,
  label,
  query,
  idPrefix,
  hiddenLabel = false,
  tone = 'light',
  className,
}: {
  action: string
  label: string
  query: ShopQuery
  idPrefix: string
  /** In the one-line tablet toolbar the label is for screen readers; the placeholder shows it. */
  hiddenLabel?: boolean
  /** `onCrimson`: the department band's field, white on the band with an oxblood button. */
  tone?: 'light' | 'onCrimson'
  className?: string
}) {
  const id = `${idPrefix}-q`
  const onCrimson = tone === 'onCrimson'
  return (
    <Form
      action={action}
      scroll={false}
      role="search"
      className={cn('flex flex-col gap-1.5', className)}
    >
      {query.aisles.map((a) => (
        <input key={a} type="hidden" name="aisle" value={a} />
      ))}
      {query.price !== 'any' && <input type="hidden" name="price" value={query.price} />}
      {query.inStock && <input type="hidden" name="stock" value="1" />}
      {query.sort !== 'popular' && <input type="hidden" name="sort" value={query.sort} />}
      <label
        htmlFor={id}
        className={cn(
          'text-small',
          onCrimson ? 'font-medium text-on-crimson-muted' : 'font-semibold text-ink',
          hiddenLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      {onCrimson ? (
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-icon -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              key={query.q}
              id={id}
              name="q"
              type="search"
              enterKeyHint="search"
              maxLength={80}
              defaultValue={query.q}
              placeholder="Rice, ackee, diapers…"
              className="h-12 w-full min-w-0 rounded-md border-0 bg-surface pr-3.5 pl-11 text-body text-ink placeholder:text-ink-muted focus-visible:outline-3 focus-visible:outline-offset-2"
            />
          </div>
          <button
            type="submit"
            className="btn-slide inline-flex h-12 shrink-0 cursor-pointer items-center rounded-md bg-oxblood px-5 text-small font-semibold text-on-dark [--slide:var(--color-ink)] active:translate-y-px"
          >
            Find
          </button>
        </div>
      ) : (
        <div className="flex">
          <input
            key={query.q}
            id={id}
            name="q"
            type="search"
            enterKeyHint="search"
            maxLength={80}
            defaultValue={query.q}
            placeholder={hiddenLabel ? label : 'Rice, ackee, diapers…'}
            className="min-h-control w-full min-w-0 rounded-l-md border-control border-r-0 border-line-strong bg-surface px-3.5 text-body text-ink placeholder:text-ink-muted hover:border-ink-muted focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none"
          />
          <button
            type="submit"
            className="grid size-control shrink-0 cursor-pointer place-items-center rounded-r-md bg-crimson text-on-dark transition-colors duration-150 hover:bg-crimson-deep"
          >
            <Search className="size-5" aria-hidden />
            <span className="sr-only">Find</span>
          </button>
        </div>
      )}
    </Form>
  )
}
