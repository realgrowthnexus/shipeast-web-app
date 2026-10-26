import type { ReactNode } from 'react'
import { Parallax } from '@/components/motion/parallax'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'
import { StockPhoto } from './stock-photo'

/**
 * Photo beside text: the workhorse of the marketing pages. The photo takes 5 of 12 columns on
 * wide screens and sits above the text on phones. `parallax` for at most one per page.
 */
export function PhotoFeature({
  photo,
  side = 'start',
  parallax = false,
  aspect = 'aspect-4/3 lg:aspect-4/5',
  children,
  className,
}: {
  photo: StockPhotoKey
  /** Which side the photo is on, on wide screens. */
  side?: 'start' | 'end'
  parallax?: boolean
  /** Tailwind aspect classes for the photo frame, written out in full (`aspect-4/3 lg:aspect-4/5`). */
  aspect?: string
  children: ReactNode
  className?: string
}) {
  const sizes = '(min-width: 1024px) 480px, 100vw'
  const frame = cn('rounded-2xl', aspect)
  return (
    <div className={cn('grid items-center gap-10 lg:grid-cols-12 lg:gap-16', className)}>
      <Reveal className={cn('lg:col-span-5', side === 'end' && 'lg:order-last')} y={0}>
        {parallax ? (
          <Parallax className={frame}>
            <StockPhoto name={photo} sizes={sizes} className="size-full rounded-none" />
          </Parallax>
        ) : (
          <StockPhoto name={photo} sizes={sizes} className={frame} />
        )}
      </Reveal>
      <Reveal className="lg:col-span-7" delay={0.1}>
        {children}
      </Reveal>
    </div>
  )
}
