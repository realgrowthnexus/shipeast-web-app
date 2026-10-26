import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Title block at the top of inner pages: eyebrow, title, lead. `tone="crimson"` for the bolder
 * marketing pages.
 */
export function PageIntro({
  eyebrow,
  title,
  children,
  tone = 'plain',
  aside,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  tone?: 'plain' | 'crimson'
  aside?: ReactNode
}) {
  const dark = tone === 'crimson'
  return (
    <div className={cn(dark ? 'bg-crimson text-white' : 'border-b border-line')}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 gutter section-sm lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className={cn('mb-3 eyebrow', dark ? 'text-blush' : 'text-crimson')}>{eyebrow}</p>
          )}
          <h1 className={cn('text-h1 text-balance', !dark && 'text-ink')}>{title}</h1>
          {children && (
            <div className={cn('mt-4 text-lead', dark ? 'text-on-crimson-muted' : 'text-ink-body')}>
              {children}
            </div>
          )}
        </div>
        {aside}
      </div>
    </div>
  )
}

/** Standard page width and side padding. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl gutter', className)}>{children}</div>
}
