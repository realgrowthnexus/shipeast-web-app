'use client'

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Accessible tabs with arrow-key navigation (WAI-ARIA tabs pattern). */
export function Tabs({
  tabs,
  label,
}: {
  label: string
  tabs: { id: string; title: ReactNode; count?: number; body: ReactNode }[]
}) {
  const [active, setActive] = useState(0)
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    const next = (active + delta + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKey}
        className="flex gap-1 overflow-x-auto border-b-2 border-line"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              '-mb-0.5 flex min-h-11 items-center gap-2 border-b-2 px-4 font-semibold whitespace-nowrap transition-colors',
              i === active
                ? 'border-crimson text-crimson'
                : 'border-transparent text-ink-muted hover:text-ink',
            )}
          >
            {t.title}
            {t.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs tabular-nums',
                  i === active ? 'bg-crimson text-white' : 'bg-surface-tint text-ink',
                )}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={i !== active}
          className="pt-5"
        >
          {t.body}
        </div>
      ))}
    </div>
  )
}
