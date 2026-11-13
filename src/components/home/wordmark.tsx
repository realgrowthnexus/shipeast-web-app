import { BrandMark } from '@/components/site/brand-mark'
import { cn } from '@/lib/cn'

/**
 * The logo lock-up: the Receipt E mark, "ShipEast" in the display face ("East" in crimson, or
 * blush on dark, echoing the E), and the service name. On dark the mark gets a blush ring.
 */
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
