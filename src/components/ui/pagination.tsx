import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export function Pagination({
  page,
  pages,
  href,
}: {
  page: number
  pages: number
  href: (page: number) => string
}) {
  if (pages <= 1) return null
  const item =
    'grid min-h-11 min-w-11 place-items-center rounded-md px-3 font-semibold tabular-nums transition-colors'
  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-1">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(item, 'text-crimson hover:bg-blush-200')}>
          <ChevronLeft className="size-5" aria-hidden />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : (
        <span className={cn(item, 'text-ink-muted/40')} aria-hidden>
          <ChevronLeft className="size-5" />
        </span>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === page ? 'page' : undefined}
          className={cn(item, n === page ? 'bg-crimson text-white' : 'text-ink hover:bg-blush-200')}
        >
          {n}
        </Link>
      ))}
      {page < pages ? (
        <Link href={href(page + 1)} className={cn(item, 'text-crimson hover:bg-blush-200')}>
          <ChevronRight className="size-5" aria-hidden />
          <span className="sr-only">Next page</span>
        </Link>
      ) : (
        <span className={cn(item, 'text-ink-muted/40')} aria-hidden>
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  )
}
