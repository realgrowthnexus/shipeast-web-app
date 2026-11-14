'use client'

import { useEffect, useRef } from 'react'
import { ListingLink, useListingNav, visible } from './listing-nav'

/**
 * "Showing 24 of 67" over a "Show 24 more" link to the next batch (`?page=n`, cumulative, so a
 * shared link shows the same list). After loading, focus moves to the first new card's name.
 */
export function LoadMore({ shown, total, href }: { shown: number; total: number; href: string }) {
  const { announce } = useListingNav()
  const clicked = useRef(false)
  const next = Math.min(24, total - shown)

  useEffect(() => {
    if (!clicked.current) return
    clicked.current = false
    visible('[data-first-new] h3 a')?.focus()
    announce(`Showing ${shown} of ${total} items`)
  }, [shown, total, announce])

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-small text-ink-muted tabular-nums">
        Showing {shown} of {total}
      </p>
      <ListingLink
        href={href}
        className="btn-slide inline-flex h-control items-center justify-center rounded-md border-2 border-crimson bg-surface px-6 text-small font-semibold text-crimson transition-colors duration-250 [--slide:var(--color-crimson)] hover:text-on-dark focus-visible:text-on-dark active:translate-y-px"
        onClick={() => (clicked.current = true)}
      >
        {next === total - shown && next < 24 ? `Show the last ${next}` : `Show ${next} more`}
      </ListingLink>
    </div>
  )
}
