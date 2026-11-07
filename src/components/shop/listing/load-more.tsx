'use client'

import { useEffect, useRef } from 'react'
import { buttonStyles } from '@/components/ui/button'
import { ListingLink, useListingNav, visible } from './listing-nav'

/**
 * "Showing 24 of 120 items" with a progress line and a "Show 24 more" link to the next batch
 * (`?page=n`, cumulative, so a shared link shows the same list). After loading, focus moves to
 * the first new tile's name.
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
    <div className="mt-10 flex flex-col items-center gap-3">
      <p className="text-small text-ink-muted tabular-nums">
        Showing {shown} of {total} items
      </p>
      <div role="presentation" className="h-1 w-60 overflow-hidden rounded-full bg-surface-strong">
        <div className="h-full bg-crimson" style={{ width: `${(shown / total) * 100}%` }} />
      </div>
      <ListingLink
        href={href}
        className={buttonStyles({ variant: 'outline' })}
        onClick={() => (clicked.current = true)}
      >
        Show {next} more
      </ListingLink>
    </div>
  )
}
