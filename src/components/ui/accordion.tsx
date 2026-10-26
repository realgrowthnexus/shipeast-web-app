import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

/** Built on <details>, so it works without JavaScript and is searchable with Ctrl+F. */
export function Accordion({ items }: { items: { id: string; title: string; body: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-surface">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.title}
            <Plus
              className="size-5 shrink-0 text-crimson transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="px-5 pb-5 text-ink-muted">{item.body}</div>
        </details>
      ))}
    </div>
  )
}
