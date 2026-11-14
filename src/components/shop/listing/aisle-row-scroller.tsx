'use client'

import { useEffect, useRef } from 'react'

/**
 * Brings the current aisle chip into view once, instantly, when it starts off-screen. Renders
 * an empty marker inside the rail; without JavaScript the rail still scrolls by hand.
 */
export function AisleRowScroller() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const rail = ref.current?.closest('ul')
    const current = rail?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!rail || !current) return
    const r = rail.getBoundingClientRect()
    const c = current.getBoundingClientRect()
    if (c.left < r.left || c.right > r.right) rail.scrollLeft += c.right - r.right + 16
  }, [])
  return <span ref={ref} hidden />
}
