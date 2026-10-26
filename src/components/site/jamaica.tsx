import { cn } from '@/lib/cn'

/**
 * The Jamaican flag, drawn flat in the flag tokens: a gold saltire with green above and below
 * and black at the sides. Size it with a width class; the 2:1 shape is kept by the viewBox.
 * Pass `label` when the flag carries meaning on its own; otherwise it is decorative.
 */
export function JamaicaFlag({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 12 6"
      className={cn('inline-block h-auto w-6 shrink-0 rounded-xs', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="12" height="6" className="fill-jm-black" />
      <path d="M0 0h12L6 3zM0 6h12L6 3z" className="fill-jm-green" />
      <path d="M0 0l12 6M12 0L0 6" className="stroke-jm-gold" strokeWidth="1" />
    </svg>
  )
}

/** A small pill with the flag, for eyebrows and hero badges. */
export function FlagBadge({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-9 items-center gap-2.5 rounded-full px-3.5 text-small font-semibold',
        onDark ? 'bg-crimson-800 text-white' : 'border border-line bg-surface text-ink',
        className,
      )}
    >
      <JamaicaFlag className="w-6" />
      {children}
    </span>
  )
}
