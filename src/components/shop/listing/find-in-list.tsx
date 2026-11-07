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
  className,
}: {
  action: string
  label: string
  query: ShopQuery
  idPrefix: string
  /** In the one-line tablet toolbar the label is for screen readers; the placeholder shows it. */
  hiddenLabel?: boolean
  className?: string
}) {
  const id = `${idPrefix}-q`
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
        className={cn('text-small font-semibold text-ink', hiddenLabel && 'sr-only')}
      >
        {label}
      </label>
      <div className="flex">
        <input
          key={query.q}
          id={id}
          name="q"
          type="search"
          enterKeyHint="search"
          maxLength={80}
          defaultValue={query.q}
          placeholder={hiddenLabel ? label : 'Rice, oats, bleach…'}
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
    </Form>
  )
}
