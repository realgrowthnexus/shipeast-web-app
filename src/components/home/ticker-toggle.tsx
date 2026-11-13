'use client'

import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

/**
 * Stops and restarts the news ticker (WCAG 2.2.2: anything that moves for more than five
 * seconds needs a pause that works by touch and keyboard, not only on hover).
 */
export function TickerToggle({ targetId }: { targetId: string }) {
  const [paused, setPaused] = useState(false)
  function toggle() {
    const next = !paused
    document.getElementById(targetId)?.toggleAttribute('data-paused', next)
    setPaused(next)
  }
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-controls={targetId}
      aria-label="Pause the news"
      onClick={toggle}
      className="grid size-control shrink-0 cursor-pointer place-items-center rounded-full text-on-dark transition-colors duration-150 hover:bg-crimson-deep motion-reduce:hidden"
    >
      {paused ? (
        <Play className="size-icon-sm" aria-hidden />
      ) : (
        <Pause className="size-icon-sm" aria-hidden />
      )}
    </button>
  )
}
