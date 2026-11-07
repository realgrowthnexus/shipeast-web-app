import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'

/**
 * One department as an aisle sign over a Jamaican supermarket: solid oxblood, the name in heavy
 * type, the real item count and the first products on that shelf.
 */
export function AisleSign({
  slug,
  name,
  count,
  sample,
}: {
  slug: string
  name: string
  count: number
  /** "Long Grain Rice, Vegetable Cooking Oil, All-Purpose Flour and more"; empty hides it. */
  sample: string
}) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="group flex min-h-40 w-full flex-col gap-3 rounded-xl bg-oxblood p-4 text-on-dark transition-colors duration-150 hover:bg-crimson-deep active:bg-oxblood sm:p-card lg:min-h-56 lg:p-card-lg"
    >
      <span className="flex items-start justify-between">
        <span className="grid size-control place-items-center rounded-full bg-crimson text-blush [&_svg]:size-icon">
          <CategoryIcon slug={slug} />
        </span>
        <ArrowRight
          className="size-icon text-blush transition-transform duration-200 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
          aria-hidden
        />
      </span>
      <span className="mt-auto text-title text-balance decoration-2 underline-offset-4 group-hover:underline sm:text-h2">
        {name}
      </span>
      <span className="text-small font-semibold text-blush tabular-nums">
        {count > 0 ? `${count} ${count === 1 ? 'item' : 'items'}` : 'Being stocked'}
      </span>
      {sample && (
        <span className="line-clamp-2 hidden text-small text-on-oxblood-muted md:block">
          {sample}
        </span>
      )}
    </Link>
  )
}
