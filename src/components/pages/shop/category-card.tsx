import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { categoryPhotos } from '@/lib/stock-photos'

type CategoryLink = { id: string; slug: string; name: string; description: string; count: number }

/** A category as a photo card: photo on top, name, line and item count below. */
export function CategoryPhotoCard({ category }: { category: CategoryLink }) {
  const photo = categoryPhotos[category.slug]
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group flex h-full hover-lift flex-col overflow-hidden rounded-xl border border-line bg-surface hover:border-blush"
    >
      {photo ? (
        <StockPhoto
          name={photo}
          sizes="(min-width: 1024px) 280px, 50vw"
          className="aspect-4/3 rounded-none"
          zoom
        />
      ) : (
        <span className="grid aspect-4/3 place-items-center bg-crimson text-white [&_svg]:size-12">
          <CategoryIcon slug={category.slug} />
        </span>
      )}
      <span className="flex flex-1 flex-col gap-1 p-4 sm:p-card">
        <span className="flex items-center justify-between gap-3">
          <span className="font-bold text-ink sm:text-h3">{category.name}</span>
          <ArrowRight
            className="size-5 shrink-0 text-crimson transition-transform duration-200 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
        <span className="hidden text-small text-ink-body sm:block">{category.description}</span>
        <span className="mt-auto pt-2 text-xs font-semibold text-crimson">
          {category.count} {category.count === 1 ? 'item' : 'items'}
        </span>
      </span>
    </Link>
  )
}

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
              'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors duration-150 [&_svg]:size-4',
              onDark
                ? 'bg-crimson-800 text-white hover:bg-oxblood'
                : 'border border-line bg-surface text-ink hover:border-blush hover:bg-surface-tint',
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
