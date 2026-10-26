'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * The sticky header frame. Once the page scrolls it gains a solid background and a soft shadow,
 * so it reads as floating over the content.
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
        'sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out-soft print:hidden',
        scrolled ? 'border-line bg-surface shadow-lift' : 'border-transparent bg-canvas',
      )}
    >
      {children}
    </header>
  )
}
