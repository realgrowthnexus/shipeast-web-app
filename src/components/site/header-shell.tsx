'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * The sticky header bar: always crimson, so at the top of the home page it reads as one block
 * with the hero. Once the page scrolls past 8px it gains a deep border and the lift shadow.
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
        'sticky top-0 z-header border-b bg-crimson on-dark-focus transition-[box-shadow,border-color] duration-(--duration-slow) ease-out-soft print:hidden',
        scrolled ? 'border-crimson-deep shadow-lift' : 'border-transparent',
      )}
    >
      {children}
    </header>
  )
}
