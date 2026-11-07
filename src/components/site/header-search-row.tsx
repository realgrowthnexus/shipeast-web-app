'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Pages with their own search box (the shop listing has "Find in…"), or where the sender should stay on the task in hand. */
const hiddenOn = (path: string) =>
  path === '/search' ||
  path === '/shop' ||
  path.startsWith('/shop/') ||
  path === '/basket' ||
  path === '/checkout' ||
  path.startsWith('/checkout/')

/**
 * The phone search row under the sticky bar. It is not sticky, so it scrolls away and the bar
 * stays 64px. The search box itself is a server component passed in as children.
 */
export function HeaderSearchRow({ children }: { children: ReactNode }) {
  const path = usePathname()
  if (hiddenOn(path)) return null
  return <HeaderSearchRowFrame>{children}</HeaderSearchRowFrame>
}

export function HeaderSearchRowFrame({ children }: { children: ReactNode }) {
  return (
    <div data-header-row className="border-b border-line bg-surface md:hidden print:hidden">
      <div className="mx-auto max-w-wide gutter pb-3">{children}</div>
    </div>
  )
}
