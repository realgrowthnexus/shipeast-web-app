import type { LucideIcon } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/cn'

export type Step = { title: string; body: string; icon?: LucideIcon }

/**
 * A numbered row of steps (big signal numerals) for light bands. Three across on wide screens,
 * stacked on phones. `compact` keeps them in one column, for use beside a photo.
 */
export function Steps({ steps, compact = false }: { steps: Step[]; compact?: boolean }) {
  return (
    <Stagger
      as="ol"
      className={cn('grid gap-5', !compact && 'md:grid-cols-3 md:gap-6', compact && 'gap-4')}
    >
      {steps.map(({ title, body, icon: Icon }, i) => (
        <StaggerItem
          key={title}
          className={cn(
            'flex rounded-lg border border-line bg-surface p-card-lg',
            compact ? 'items-start gap-5' : 'flex-col gap-4',
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <span
              className={cn('text-numeral text-signal', compact && 'w-9 shrink-0 text-center')}
              aria-hidden
            >
              {i + 1}
            </span>
            {Icon && !compact && <Icon className="size-7 text-crimson" aria-hidden />}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-h3 text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {title}
            </h3>
            <p className="text-ink-body">{body}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
