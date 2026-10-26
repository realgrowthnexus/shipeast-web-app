import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Dashboard number. Only render it for metrics the system really tracks: no fake numbers. */
export function StatTile({
  label,
  value,
  hint,
  icon,
  attention,
}: {
  label: string
  value: ReactNode
  hint?: string
  icon?: ReactNode
  /** Highlight when the number needs someone to act (unassigned orders, transfers to confirm). */
  attention?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-lg border bg-surface p-4',
        attention ? 'border-signal/40 bg-surface' : 'border-line',
      )}
    >
      <div className="flex items-center justify-between gap-2 text-small font-semibold text-ink-muted">
        {label}
        {icon && (
          <span className={cn('[&_svg]:size-5', attention ? 'text-signal' : 'text-crimson')}>
            {icon}
          </span>
        )}
      </div>
      <div className="text-h2 whitespace-nowrap text-ink tabular-nums">{value}</div>
      {hint && <p className="text-small text-ink-muted">{hint}</p>}
    </div>
  )
}
