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
      className={cn('inline-block h-auto w-6 shrink-0 rounded-sm', className)}
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
