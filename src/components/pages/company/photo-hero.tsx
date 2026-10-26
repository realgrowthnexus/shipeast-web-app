import type { ReactNode } from 'react'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'

/**
 * The crimson opening band of the company pages: eyebrow, the page's h1 and lead on one side,
 * a photo beside them on wide screens (below on phones). The h1 and photo never wait for
 * JavaScript: they rise in with CSS (`animate-rise`), not `Reveal`.
 */
export function PhotoHero({
  eyebrow,
  title,
  lead,
  photo,
  actions,
  aspect = 'aspect-4/3',
}: {
  eyebrow: string
  title: string
  lead: ReactNode
  photo?: StockPhotoKey
  actions?: ReactNode
  /** Tailwind aspect classes for the photo, written out in full. */
  aspect?: string
}) {
  return (
    <section className="bg-crimson text-white">
      <div
        className={cn(
          'mx-auto grid w-full max-w-wide items-center gap-10 gutter section lg:gap-16',
          photo && 'lg:grid-cols-12',
        )}
      >
        <div className={cn('animate-rise', photo ? 'lg:col-span-6' : 'max-w-3xl')}>
          <p className="mb-4 eyebrow text-blush">{eyebrow}</p>
          <h1 className="text-h1 text-balance">{title}</h1>
          <div className="mt-5 max-w-2xl text-lead text-on-crimson-muted">{lead}</div>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {photo && (
          <div className="animate-rise [animation-delay:120ms] lg:col-span-6">
            <StockPhoto
              name={photo}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
              className={cn('rounded-2xl', aspect)}
            />
          </div>
        )}
      </div>
    </section>
  )
}
