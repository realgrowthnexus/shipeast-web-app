import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-lg border border-line bg-blush-100 shadow-card', className)}
      {...props}
    />
  )
}

/** For empty lists and search results. Always says what to do next. */
export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon: ReactNode
  title: string
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-line px-6 py-12 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-blush-200 text-crimson [&_svg]:size-7">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {children && <p className="max-w-sm text-ink-muted">{children}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-md bg-blush-200', className)} />
}
