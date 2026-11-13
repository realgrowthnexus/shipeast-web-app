import { BrandMark } from '@/components/site/brand-mark'
import { cn } from '@/lib/cn'

/** The logo lock-up: the door mark, "ShipEast" in the display face, and the service name. */
export function HomeWordmark({
  onDark = false,
  className,
}: {
  onDark?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2 leading-none', className)}>
      <BrandMark ring={onDark} />
      <span
        className={cn(
          'font-display text-2xl font-bold tracking-tight',
          onDark ? 'text-on-dark' : 'text-ink',
        )}
      >
        Ship<span className={onDark ? 'text-blush' : 'text-crimson'}>East</span>
      </span>
      <span
        className={cn(
          'hidden rounded-full px-2 py-1 text-xs font-semibold lg:inline',
          onDark ? 'bg-crimson-deep text-on-dark' : 'bg-surface-selected text-crimson-deep',
        )}
      >
        Shop &amp; Send
      </span>
    </span>
  )
}
