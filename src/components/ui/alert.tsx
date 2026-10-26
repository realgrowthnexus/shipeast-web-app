import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const styles = {
  info: { box: 'border-info/25 bg-info-tint text-info', Icon: Info },
  ok: { box: 'border-ok/25 bg-ok-tint text-ok', Icon: CircleCheck },
  warn: { box: 'border-warn/25 bg-warn-tint text-warn', Icon: TriangleAlert },
  danger: { box: 'border-danger/25 bg-danger-tint text-danger', Icon: CircleAlert },
}

export function Alert({
  tone = 'info',
  title,
  children,
  action,
  className,
}: {
  tone?: keyof typeof styles
  title: string
  children?: ReactNode
  action?: ReactNode
  className?: string
}) {
  const { box, Icon } = styles[tone]
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-md border p-4', box, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-semibold">{title}</p>
        {children && <div className="text-sm text-ink">{children}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  )
}
