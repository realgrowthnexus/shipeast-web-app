import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'
import { cn } from '@/lib/cn'

type CategoryLink = { id: string; slug: string; name: string; description: string; count: number }

/** Quick links to each category, as pills. `onDark` for crimson bands. */
export function CategoryChips({
  categories,
  onDark = false,
  className,
}: {
  categories: Pick<CategoryLink, 'id' | 'slug' | 'name'>[]
  onDark?: boolean
  className?: string
}) {
  if (!categories.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((c) => (
        <li key={c.id}>
          <Link
            href={`/shop/${c.slug}`}
            className={cn(
              'inline-flex min-h-control items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors duration-150 [&_svg]:size-4',
              onDark
                ? 'bg-crimson-deep text-on-dark hover:bg-oxblood'
                : 'border border-line bg-surface text-ink hover:border-line-hover hover:bg-surface-muted',
            )}
          >
            <span className={onDark ? 'text-blush' : 'text-crimson'}>
              <CategoryIcon slug={c.slug} />
            </span>
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
