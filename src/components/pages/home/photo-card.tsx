import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'

/**
 * A large photo card that is a link: the photo on top, the words below it (never on it).
 * Lifts and zooms the photo slightly on hover.
 */
export function PhotoCardLink({
  href,
  photo,
  title,
  body,
  meta,
  sizes,
  aspect = 'aspect-4/3',
}: {
  href: string
  photo?: StockPhotoKey
  title: string
  body: ReactNode
  /** A short line under the text, e.g. "48 items". */
  meta?: ReactNode
  sizes: string
  aspect?: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full hover-lift flex-col overflow-hidden rounded-xl border border-line bg-surface hover:border-blush"
    >
      {photo ? (
        <StockPhoto name={photo} sizes={sizes} className={cn('rounded-none', aspect)} zoom />
      ) : (
        <span className={cn('block bg-crimson', aspect)} aria-hidden />
      )}
      <span className="flex flex-1 flex-col gap-2 p-card">
        <span className="text-h3 text-ink">{title}</span>
        <span className="text-ink-body">{body}</span>
        <span className="mt-auto flex items-center gap-1.5 pt-3 text-small font-semibold text-crimson">
          {meta}
          <ArrowRight
            className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </span>
    </Link>
  )
}
