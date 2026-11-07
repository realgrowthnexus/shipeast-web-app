'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * The phone and tablet toolbar (Filters and Sort), sticky right under the header. It gains the
 * lift shadow only while stuck: a 1px sentinel above it leaves the viewport below the header.
 */
export function StickyToolbar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const sentinel = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const header =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) *
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 64
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < header + 1),
      { rootMargin: `-${Math.round(header) + 1}px 0px 0px 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />
      <div data-stuck={stuck || undefined} className={cn(className)}>
        {children}
      </div>
    </>
  )
}
