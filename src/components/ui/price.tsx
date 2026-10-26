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
  tone = 'ink',
  className,
}: {
  cents: number
  jmdPerUsd: number
  size?: 'sm' | 'md' | 'lg'
  /** Price before a basket saving, shown struck through. */
  was?: number
  /** Text colour: `crimson` on product cards, `white` on crimson. */
  tone?: 'ink' | 'crimson' | 'white'
  className?: string
}) {
  const t = {
    ink: { main: 'text-ink', sub: 'text-ink-muted' },
    crimson: { main: 'text-crimson', sub: 'text-ink-muted' },
    white: { main: 'text-white', sub: 'text-on-crimson-muted' },
  }[tone]
  return (
    <span className={cn('inline-flex flex-col leading-tight', className)}>
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-extrabold tabular-nums',
            t.main,
            size === 'sm' && 'text-body',
            size === 'md' && 'text-lead',
            size === 'lg' && 'text-h2',
          )}
        >
          {formatUsd(cents)}
        </span>
        {was !== undefined && was > cents && (
          <s className={cn('text-small tabular-nums', t.sub)}>
            <span className="sr-only">was </span>
            {formatUsd(was)}
          </s>
        )}
      </span>
      <span className={cn('tabular-nums', t.sub, size === 'lg' ? 'text-body' : 'text-xs')}>
        about {formatJmd(usdCentsToJmd(cents, jmdPerUsd))}
      </span>
    </span>
  )
}
