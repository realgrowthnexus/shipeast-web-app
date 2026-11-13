import { cn } from '@/lib/cn'

/** The home wordmark: "ShipEast" in the display face, with the service name beside it. */
export function HomeWordmark({
  onDark = false,
  className,
}: {
  onDark?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-baseline gap-2 leading-none', className)}>
      <span
        className={cn(
          'font-display text-[1.75rem] font-extrabold tracking-tight',
          onDark ? 'text-on-dark' : 'text-ink',
        )}
      >
        Ship<span className={onDark ? 'text-blush' : 'text-crimson'}>East</span>
      </span>
      <span
        className={cn(
          'hidden rounded-full px-2 py-1 text-xs font-bold lg:inline',
          onDark ? 'bg-crimson-deep text-on-dark' : 'bg-surface-selected text-crimson-deep',
        )}
      >
        Shop &amp; Send
      </span>
    </span>
  )
}
