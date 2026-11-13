'use client'

import { Plus } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { type ReactNode, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { toggleOpen } from '@/lib/disclosure'
import { panel } from '@/lib/motion'

/**
 * Questions that open smoothly (home v3.3, docs/home-v3/audits/motion.md §1). Each question is a
 * real button (`aria-expanded`, `aria-controls`) and each answer a region whose height glides
 * open and shut, so the rows below move instead of jumping. Items open independently, so a row
 * never slides away from under a finger; the first is open on load. Every answer stays in the
 * HTML; closed ones are `inert`. Without JavaScript, link to `/faq`, which uses `<details>`.
 */
export function FaqAccordion({
  items,
  defaultOpen = 0,
  anchors = false,
}: {
  items: { id: string; title: string; body: ReactNode }[]
  /** Index of the item open on load, or null for none. */
  defaultOpen?: number | null
  /** Give each item its own `id`, stopping below the sticky header when linked to. */
  anchors?: boolean
}) {
  const base = useId()
  const still = useReducedMotion()
  const first = defaultOpen === null ? undefined : items[defaultOpen]?.id
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(first ? [first] : []))

  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {items.map((item) => {
        const isOpen = open.has(item.id)
        const buttonId = `${base}-q-${item.id}`
        const panelId = `${base}-a-${item.id}`
        return (
          <div
            key={item.id}
            id={anchors ? item.id : undefined}
            className={cn(anchors && 'scroll-mt-header')}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen((s) => toggleOpen(s, item.id))}
                className={cn(
                  'flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-body font-semibold transition-colors duration-150 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-signal',
                  isOpen
                    ? 'text-crimson-deep'
                    : 'text-ink hover:bg-surface-muted active:bg-surface-strong',
                )}
              >
                {item.title}
                <Plus
                  className={cn(
                    'size-5 shrink-0 text-crimson transition-[rotate] duration-(--duration-panel) ease-out-soft motion-reduce:transition-none',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              transition={still ? { duration: 0 } : isOpen ? panel.open : panel.close}
              className="overflow-hidden"
            >
              {/* Padding sits inside the animated box, never on it, so the last frame never snaps. */}
              <div className="px-5 pb-5 text-small text-ink-body">{item.body}</div>
            </m.div>
          </div>
        )
      })}
    </div>
  )
}
