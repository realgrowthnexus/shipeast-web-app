import { cn } from '@/lib/cn'
import { formatUsd } from '@/lib/format'

/** "Save USD$10.20": the small gold tag used on the board and the basket cards. */
export function SavingTag({ cents, className }: { cents: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink tabular-nums',
        className,
      )}
    >
      Save {formatUsd(cents)}
    </span>
  )
}
