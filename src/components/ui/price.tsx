import { cn } from '@/lib/cn'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'

/**
 * Price in US dollars with the Jamaican dollar amount alongside, so the sender and their
 * family read the same number. `jmdPerUsd` comes from the admin-set exchange rate.
 */
export function Price({
  cents,
  jmdPerUsd,
  size = 'md',
  was,
  className,
}: {
  cents: number
  jmdPerUsd: number
  size?: 'sm' | 'md' | 'lg'
  /** Price before a basket saving, shown struck through. */
  was?: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex flex-col leading-tight', className)}>
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-extrabold text-ink tabular-nums',
            size === 'sm' && 'text-body',
            size === 'md' && 'text-lead',
            size === 'lg' && 'text-h2',
          )}
        >
          {formatUsd(cents)}
        </span>
        {was !== undefined && was > cents && (
          <s className="text-small text-ink-muted tabular-nums">
            <span className="sr-only">was </span>
            {formatUsd(was)}
          </s>
        )}
      </span>
      <span className={cn('text-ink-muted tabular-nums', size === 'lg' ? 'text-body' : 'text-xs')}>
        about {formatJmd(usdCentsToJmd(cents, jmdPerUsd))}
      </span>
    </span>
  )
}
