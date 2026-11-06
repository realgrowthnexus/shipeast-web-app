import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Built on <details>, so it works without JavaScript and is searchable with Ctrl+F. With
 * `anchors`, each item takes its own `id` (e.g. `faq-1`) and stops below the sticky header when
 * linked to.
 */
export function Accordion({
  items,
  anchors = false,
}: {
  items: { id: string; title: string; body: ReactNode }[]
  anchors?: boolean
}) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-surface">
      {items.map((item) => (
        <details
          key={item.id}
          id={anchors ? item.id : undefined}
          className={cn(
            'group last:[&:not([open])>summary]:rounded-b-lg first:[&>summary]:rounded-t-lg',
            anchors && 'scroll-mt-header',
          )}
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink transition-colors duration-150 hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
            {item.title}
            <Plus
              className="size-5 shrink-0 text-crimson transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="px-5 pb-5 text-ink-body">{item.body}</div>
        </details>
      ))}
    </div>
  )
}
