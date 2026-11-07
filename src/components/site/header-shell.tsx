'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * The sticky header bar: a light (white) bar with a 1px line edge, so it sits crisply on every
 * first band, dark or light. Once the page scrolls past 8px it gains the lift shadow. On phones,
 * at the top of the page, the line moves to the search row below so the two read as one block.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'sticky top-0 z-header border-b border-line bg-surface transition-[box-shadow] duration-(--duration-slow) ease-out-soft print:hidden',
        'max-md:[&:not([data-scrolled]):has(+[data-header-row])]:border-transparent',
        scrolled && 'shadow-lift',
      )}
    >
      {children}
    </header>
  )
}
