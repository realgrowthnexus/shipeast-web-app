import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ORDER_STATUS, type StatusTone } from '@/lib/order-status'
import type { OrderStatus } from '@/lib/types'

const tones: Record<StatusTone, string> = {
  neutral: 'bg-blush-200 text-ink',
  info: 'bg-info-tint text-info',
  progress: 'bg-blush text-crimson-deep',
  ok: 'bg-ok-tint text-ok',
  warn: 'bg-warn-tint text-warn',
  danger: 'bg-danger-tint text-danger',
}

const dots: Record<StatusTone, string> = {
  neutral: 'bg-ink-muted',
  info: 'bg-info',
  progress: 'bg-signal',
  ok: 'bg-ok',
  warn: 'bg-warn',
  danger: 'bg-danger',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: StatusTone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Order status with its specific label, the same in every part of the system. */
export function StatusPill({ status, className }: { status: OrderStatus; className?: string }) {
  const { label, tone } = ORDER_STATUS[status]
  return (
    <Badge tone={tone} className={className}>
      <span className={cn('size-1.5 rounded-full', dots[tone])} aria-hidden />
      {label}
    </Badge>
  )
}
