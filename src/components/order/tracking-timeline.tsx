import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatDateTime } from '@/lib/format'
import { ORDER_STATUS, TRACKER_STAGES, trackerIndex, type TrackerStage } from '@/lib/order-status'
import type { OrderStatus } from '@/lib/types'

/**
 * The seven-stage tracker the sender and their family see. Times come from the order's
 * audit trail; stages not reached yet stay quiet.
 */
export function TrackingTimeline({
  status,
  times = {},
}: {
  status: OrderStatus
  times?: Partial<Record<TrackerStage, string>>
}) {
  const current = trackerIndex(status)
  return (
    <ol className="flex flex-col">
      {TRACKER_STAGES.map((stage, i) => {
        const done = i < current || (i === current && status === 'closed')
        const active = i === current && !done
        const last = i === TRACKER_STAGES.length - 1
        return (
          <li key={stage.key} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className={cn(
                  'absolute top-8 bottom-0 left-[15px] w-0.5',
                  i < current ? 'bg-crimson' : 'bg-line',
                )}
              />
            )}
            <span
              className={cn(
                'relative grid size-8 shrink-0 place-items-center rounded-full border-2 text-small font-bold',
                done && 'border-crimson bg-crimson text-white',
                active && 'border-signal bg-surface text-signal',
                !done && !active && 'border-line bg-surface text-ink-muted',
              )}
            >
              {done ? <Check className="size-4" aria-hidden /> : i + 1}
              {active && (
                <span className="absolute -top-0.5 -right-0.5 size-2.5 animate-ping rounded-full bg-signal motion-reduce:animate-none" />
              )}
            </span>
            <div className="flex flex-col pt-1">
              <span
                className={cn('font-semibold', !done && !active ? 'text-ink-muted' : 'text-ink')}
              >
                {stage.label}
                {active && <span className="sr-only"> (current step)</span>}
              </span>
              {active && (
                <span className="text-small text-ink">{ORDER_STATUS[status].senderText}</span>
              )}
              {times[stage.key] && (
                <span className="text-small text-ink-muted tabular-nums">
                  {formatDateTime(times[stage.key]!)}
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
