import { Clock } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatClockTime } from '@/lib/format'
import { CutoffCountdown } from './cutoff-countdown'

const tones = {
  /** On crimson: blush icon. */
  onDark: { text: 'text-on-dark', icon: 'text-blush' },
  /** On the photo overlay: blush is only 4.1:1 there, so the icon stays on-dark. */
  onPhoto: { text: 'text-on-dark', icon: 'text-on-dark' },
  light: { text: 'text-ink-body', icon: 'text-crimson' },
} as const

/**
 * "Same-day delivery when you order by 1:00 PM Jamaica time." The sentence is server text; the
 * visitor's local time and the countdown are added by a small client child after mount.
 */
export function CutoffNote({
  cutoff,
  tone = 'light',
  className,
}: {
  /** `HH:MM`, Jamaica time. */
  cutoff: string
  tone?: keyof typeof tones
  className?: string
}) {
  const t = tones[tone]
  return (
    <p className={cn('flex items-start gap-2 text-small', t.text, className)}>
      <Clock className={cn('mt-0.5 size-icon shrink-0', t.icon)} aria-hidden />
      <span>
        Same-day delivery when you order by{' '}
        <strong className="font-bold tabular-nums">{formatClockTime(cutoff)}</strong> Jamaica time.
        <CutoffCountdown cutoff={cutoff} />
      </span>
    </p>
  )
}
