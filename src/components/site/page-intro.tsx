import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Title block at the top of inner pages. `tone="crimson"` for the bolder marketing pages. */
export function PageIntro({
  title,
  children,
  tone = 'plain',
  aside,
}: {
  title: string
  children?: ReactNode
  tone?: 'plain' | 'crimson'
  aside?: ReactNode
}) {
  const dark = tone === 'crimson'
  return (
    <div className={cn(dark ? 'bg-premium text-white' : 'border-b border-line')}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <h1
            className={cn(
              'text-4xl font-black tracking-tight text-balance sm:text-5xl',
              !dark && 'text-ink',
            )}
          >
            {title}
          </h1>
          {children && (
            <div className={cn('mt-4 text-lg', dark ? 'text-white/85' : 'text-ink-muted')}>
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
  return <div className={cn('mx-auto w-full max-w-6xl px-4', className)}>{children}</div>
}
