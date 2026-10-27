import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const tones = {
  canvas: '',
  surface: 'bg-surface',
  tint: 'bg-surface-tint',
  crimson: 'bg-crimson text-white',
  oxblood: 'bg-oxblood text-white',
} as const

export type SectionTone = keyof typeof tones

/** A full-width band of the page. Alternate tones so sections read as separate chapters. */
export function Section({
  tone = 'canvas',
  size = 'md',
  className,
  innerClassName,
  wide = false,
  children,
  ...props
}: {
  tone?: SectionTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  innerClassName?: string
  /** 80rem instead of the 72rem page column, for photo-led bands. */
  wide?: boolean
  children: ReactNode
  'aria-labelledby'?: string
  id?: string
}) {
  return (
    <section
      className={cn(
        tones[tone],
        { sm: 'section-sm', md: 'section', lg: 'section-lg' }[size],
        className,
      )}
      {...props}
    >
      <div
        className={cn('mx-auto w-full gutter', wide ? 'max-w-wide' : 'max-w-page', innerClassName)}
      >
        {children}
      </div>
    </section>
  )
}

/**
 * Eyebrow, title and optional lead. Not animated: headings are in the first paint, so a slow
 * phone never shows a blank section while JavaScript loads. `onDark` for crimson and oxblood bands.
 * `action` sits at the right on wide screens (a "See all" link).
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  action,
  onDark = false,
  align = 'start',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  action?: ReactNode
  onDark?: boolean
  align?: 'start' | 'center'
  className?: string
}) {
  const center = align === 'center'
  return (
    <header
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-8 gap-y-4',
        center && 'flex-col items-center text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', center && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('mb-3 eyebrow', onDark ? 'text-blush' : 'text-crimson')}>{eyebrow}</p>
        )}
        <h2 id={id} className={cn('text-h2 text-balance', !onDark && 'text-ink')}>
          {title}
        </h2>
        {lead && (
          <p className={cn('mt-3 text-lead', onDark ? 'text-on-crimson-muted' : 'text-ink-body')}>
            {lead}
          </p>
        )}
      </div>
      {action}
    </header>
  )
}
