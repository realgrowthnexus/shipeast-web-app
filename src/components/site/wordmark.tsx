import { cn } from '@/lib/cn'

/** "ShipEast" with "East" in blush on dark, crimson on light, as in the client's documents. */
export function Wordmark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn('text-2xl font-black tracking-tight', onDark ? 'text-white' : 'text-ink')}
      >
        Ship<span className={onDark ? 'text-blush' : 'text-crimson'}>East</span>
      </span>
      <span
        className={cn(
          'mt-0.5 text-[11px] font-semibold',
          onDark ? 'text-on-crimson-muted' : 'text-ink-muted',
        )}
      >
        Shop &amp; Send
      </span>
    </span>
  )
}
