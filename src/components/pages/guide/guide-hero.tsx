import type { ReactNode } from 'react'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'
import { FlagStripe } from '@/components/site/jamaica'

/**
 * Top of the guide pages: a solid crimson block with the page title, and a large photo beside it
 * on wide screens (below it on phones). The title and photo use CSS `animate-rise`, never
 * Reveal, so neither waits for JavaScript.
 */
export function GuideHero({
  eyebrow,
  title,
  lead,
  photo,
  aspect = 'aspect-4/3 sm:aspect-video lg:aspect-4/3',
  children,
}: {
  eyebrow: string
  title: string
  lead: ReactNode
  photo?: StockPhotoKey
  /** Tailwind aspect classes for the photo frame. */
  aspect?: string
  /** Actions or facts under the lead. */
  children?: ReactNode
}) {
  return (
    <section className="bg-crimson text-white">
      <div
        className={cn(
          'mx-auto grid w-full max-w-wide items-center gap-10 gutter section lg:gap-16',
          photo && 'lg:grid-cols-12',
        )}
      >
        <div className={cn('animate-rise', photo ? 'lg:col-span-7' : 'max-w-3xl')}>
          <p className="mb-4 eyebrow text-blush">{eyebrow}</p>
          <h1 className="text-h1 text-balance sm:text-display">{title}</h1>
          <div className="mt-5 max-w-2xl text-lead text-on-crimson-muted">{lead}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {photo && (
          <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
            <StockPhoto
              name={photo}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              className={cn('rounded-2xl bg-crimson-700', aspect)}
            />
          </div>
        )}
      </div>
      <FlagStripe className="h-1.5" />
    </section>
  )
}
