import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { departmentLooks } from '@/lib/departments'

/**
 * One switch tile in the department band: a thumbnail (the department's photo, or a grid icon
 * for "All"), the name and its real item count. The current one is cut out in white; the
 * others fill oxblood from the left on hover. Rises in once on first paint (CSS, no JS).
 */
export function DepartmentTile({
  href,
  name,
  count,
  current,
  slug,
  index,
}: {
  href: string
  name: string
  count: number
  current: boolean
  /** null for "All". */
  slug: string | null
  index: number
}) {
  const look = slug ? departmentLooks[slug] : undefined
  const items = `${count} ${count === 1 ? 'item' : 'items'}`
  return (
    <li
      className="w-44 shrink-0 animate-rise lg:w-auto"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        href={href}
        aria-current={current ? 'page' : undefined}
        className={cn(
          'group btn-slide flex h-16 w-full items-center gap-3 rounded-lg p-2 pr-4 text-left active:translate-y-px md:h-[4.5rem]',
          current
            ? 'cursor-default bg-surface text-ink [--slide:var(--color-surface)]'
            : 'bg-crimson-deep text-on-dark [--slide:var(--color-oxblood)]',
        )}
      >
        {look ? (
          <span
            className={cn(
              'relative size-12 shrink-0 overflow-hidden rounded-md md:size-14',
              !current &&
                '[&_img]:transition-transform [&_img]:duration-400 [&_img]:ease-hover group-hover:[&_img]:scale-[1.06] motion-reduce:[&_img]:transition-none',
            )}
          >
            <StockPhoto
              name={look.photo}
              alt=""
              sizes="56px"
              imgClassName={look.crop}
              className="photo-loading size-full rounded-md"
            />
          </span>
        ) : (
          <span
            className={cn(
              'grid size-12 shrink-0 place-items-center rounded-md md:size-14',
              current ? 'bg-surface-selected text-crimson' : 'bg-oxblood text-blush',
            )}
          >
            <LayoutGrid className="size-icon-lg" aria-hidden />
          </span>
        )}
        <span className="min-w-0">
          <span
            className={cn(
              'block truncate text-small font-semibold',
              current && 'text-crimson-deep',
            )}
          >
            {name}
          </span>
          <span
            className={cn(
              'block text-xs font-medium tabular-nums',
              current ? 'text-ink-muted' : 'text-on-crimson-muted',
            )}
          >
            <span className="sr-only">, </span>
            {items}
          </span>
        </span>
      </Link>
    </li>
  )
}
