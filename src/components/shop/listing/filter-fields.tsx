import { cn } from '@/lib/cn'
import { type Facets, PRICE_BANDS, type PriceBand, type ShopQuery } from '@/lib/shop-filters'
import { ListingLink } from './listing-nav'

export interface DepartmentOption {
  key: string
  name: string
  count: number
  /** Precomputed, with the current find text, price, stock and sort carried over. */
  href: string
  current: boolean
}

const row =
  'flex min-h-control items-center gap-3 rounded-md px-3 text-small text-ink-body transition-colors duration-150 hover:bg-surface-muted lg:min-h-9'

const choice = cn(
  row,
  'cursor-pointer has-checked:font-semibold has-checked:text-ink has-disabled:cursor-default has-disabled:text-ink-muted has-disabled:hover:bg-transparent has-focus-visible:outline-3 has-focus-visible:outline-offset-1 has-focus-visible:outline-signal',
)

const input = 'size-5 shrink-0 accent-crimson focus-visible:outline-none'
const count = 'text-xs text-ink-muted tabular-nums'
const group =
  'mt-5 flex flex-col gap-1 border-t border-line pt-5 first:mt-0 first:border-t-0 first:pt-0'
const legend = 'mb-1 text-small font-bold text-ink'

/** Shown first; the rest go behind "Show all" so a long list stays scannable. */
const VISIBLE_AISLES = 8

/**
 * The filter groups, most general first: Department (links), Aisle (checkboxes), Price
 * (radios), Availability. Rendered twice, in the sidebar and in the phone sheet, with distinct
 * ids; only one copy is ever visible. Options that would show nothing are disabled unless
 * already chosen, so the list never jumps.
 */
export function FilterFields({
  idPrefix,
  departments,
  aisles,
  query,
  facets,
  hasOutOfStock,
}: {
  idPrefix: string
  departments: DepartmentOption[]
  /** Aisles in scope with at least one listed product; empty hides the group. */
  aisles: { slug: string; name: string }[]
  query: ShopQuery
  facets: Facets
  hasOutOfStock: boolean
}) {
  const aisleRow = (a: { slug: string; name: string }) => {
    const n = facets.aisles[a.slug] ?? 0
    const checked = query.aisles.includes(a.slug)
    const id = `${idPrefix}-aisle-${a.slug}`
    return (
      <label key={a.slug} htmlFor={id} className={choice}>
        <input
          id={id}
          type="checkbox"
          name="aisle"
          value={a.slug}
          defaultChecked={checked}
          disabled={!n && !checked}
          className={input}
        />
        <span className="flex-1">{a.name}</span>
        <span className={count}>{n}</span>
      </label>
    )
  }
  const shown = aisles.slice(0, VISIBLE_AISLES)
  const more = aisles.slice(VISIBLE_AISLES)

  return (
    <div className="flex flex-col">
      <nav aria-label="Departments in the shop" className={group}>
        <h3 className={legend}>Department</h3>
        <ul className="flex flex-col gap-1">
          {departments.map((d) => (
            <li key={d.key}>
              <ListingLink
                href={d.href}
                aria-current={d.current ? 'page' : undefined}
                className={cn(
                  row,
                  'justify-between aria-[current=page]:bg-surface-selected aria-[current=page]:font-bold aria-[current=page]:text-crimson-deep aria-[current=page]:shadow-[inset_3px_0_0_var(--color-crimson)]',
                )}
              >
                {d.name}
                <span className={count}>{d.count}</span>
              </ListingLink>
            </li>
          ))}
        </ul>
      </nav>

      {aisles.length > 0 && (
        <fieldset className={group}>
          <legend className={cn(legend, 'float-left w-full')}>Aisle</legend>
          {shown.map(aisleRow)}
          {more.length > 0 && (
            <details open={more.some((a) => query.aisles.includes(a.slug))}>
              <summary className="flex min-h-control cursor-pointer items-center px-3 text-small font-semibold text-crimson lg:min-h-9">
                Show all {aisles.length} aisles
              </summary>
              {more.map(aisleRow)}
            </details>
          )}
        </fieldset>
      )}

      <fieldset className={group}>
        <legend className={cn(legend, 'float-left w-full')}>Price</legend>
        {(Object.keys(PRICE_BANDS) as PriceBand[]).map((band) => {
          const n = facets.price[band]
          const checked = query.price === band
          const id = `${idPrefix}-price-${band}`
          return (
            <label key={band} htmlFor={id} className={choice}>
              <input
                id={id}
                type="radio"
                name="price"
                value={band}
                defaultChecked={checked}
                disabled={band !== 'any' && !n && !checked}
                className={input}
              />
              <span className="flex-1">{PRICE_BANDS[band]}</span>
              {band !== 'any' && <span className={count}>{n}</span>}
            </label>
          )
        })}
      </fieldset>

      {(hasOutOfStock || query.inStock) && (
        <fieldset className={group}>
          <legend className={cn(legend, 'float-left w-full')}>Availability</legend>
          <label htmlFor={`${idPrefix}-stock`} className={choice}>
            <input
              id={`${idPrefix}-stock`}
              type="checkbox"
              name="stock"
              value="1"
              defaultChecked={query.inStock}
              disabled={!facets.inStock && !query.inStock}
              className={input}
            />
            <span className="flex-1">In stock only</span>
            <span className={count}>{facets.inStock}</span>
          </label>
        </fieldset>
      )}

      <input type="hidden" name="q" value={query.q} />
      <input type="hidden" name="sort" value={query.sort} />
    </div>
  )
}
