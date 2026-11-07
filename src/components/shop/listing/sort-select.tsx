'use client'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/field'
import { cn } from '@/lib/cn'
import { type Sort, SORTS } from '@/lib/shop-filters'
import { useHydrated, useListingNav } from './listing-nav'

/**
 * Sort as a small GET form: a "Sort" button for no-JS visitors, and a change that navigates
 * at once (back to the first batch) once enhanced.
 */
export function SortSelect({
  action,
  params,
  value,
  id,
  labelClassName,
  className,
}: {
  action: string
  /** The other active params (not sort, not page), as hidden fields. */
  params: [string, string][]
  value: Sort
  id: string
  labelClassName?: string
  className?: string
}) {
  const { navigate } = useListingNav()
  const enhanced = useHydrated()

  return (
    <form
      method="get"
      action={action}
      className={cn('flex items-center gap-3', className)}
      onSubmit={(e) => e.preventDefault()}
    >
      {params.map(([name, v], i) => (
        <input key={`${name}-${i}`} type="hidden" name={name} value={v} />
      ))}
      <label
        htmlFor={id}
        className={cn('shrink-0 text-small font-semibold text-ink', labelClassName)}
      >
        Sort by
      </label>
      <div className="min-w-0 flex-1">
        <Select
          key={value}
          id={id}
          name="sort"
          defaultValue={value}
          className="min-h-control"
          onChange={(e) => {
            const search = new URLSearchParams(params)
            if (e.target.value !== 'popular') search.set('sort', e.target.value)
            const s = search.toString()
            navigate(action + (s ? `?${s}` : ''))
          }}
        >
          {Object.entries(SORTS).map(([v, label]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      {!enhanced && (
        <Button type="submit" variant="secondary" size="sm">
          Sort
        </Button>
      )}
    </form>
  )
}
