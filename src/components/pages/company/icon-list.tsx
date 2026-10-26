import type { LucideIcon } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/cn'

export type IconPoint = { icon: LucideIcon; title: string; body: string }

/**
 * A grid of short points, each with an icon, title and one or two sentences. `onDark` for
 * oxblood and crimson bands; cards otherwise.
 */
export function IconList({
  points,
  onDark = false,
  columns = 3,
}: {
  points: IconPoint[]
  onDark?: boolean
  columns?: 2 | 3 | 4
}) {
  return (
    <Stagger
      className={cn(
        'grid gap-5 sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        columns === 4 && 'lg:grid-cols-4',
      )}
    >
      {points.map(({ icon: Icon, title, body }) => (
        <StaggerItem
          key={title}
          className={cn(
            'flex flex-col gap-3 rounded-lg p-card-lg',
            onDark ? 'bg-crimson-800' : 'border border-line bg-surface',
          )}
        >
          <span
            className={cn(
              'grid size-12 place-items-center rounded-full',
              onDark ? 'bg-crimson text-blush' : 'bg-surface-tint text-crimson',
            )}
          >
            <Icon className="size-6" aria-hidden />
          </span>
          <h3 className={cn('text-h3', onDark ? 'text-white' : 'text-ink')}>{title}</h3>
          <p className={onDark ? 'text-on-crimson-muted' : 'text-ink-body'}>{body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
