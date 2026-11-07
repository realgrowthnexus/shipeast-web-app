'use client'

import { useEffect, useRef } from 'react'

/**
 * On a phone the department tabs scroll sideways inside the band. This brings the current tab
 * into view once, instantly, when it starts off-screen (Baby & Child). Renders an empty marker
 * inside the rail; without JS the rail still scrolls by hand.
 */
export function TabRailScroller() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const rail = ref.current?.closest('ul')
    const current = rail?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!rail || !current) return
    const r = rail.getBoundingClientRect()
    const c = current.getBoundingClientRect()
    if (c.left < r.left || c.right > r.right) rail.scrollLeft += c.right - r.right + 16
  }, [])
  return <span ref={ref} hidden />
}
