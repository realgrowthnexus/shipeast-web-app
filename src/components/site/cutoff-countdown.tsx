'use client'

import { useEffect, useState } from 'react'
import {
  cutoffInLocalTime,
  formatDuration,
  JAMAICA_TIME_ZONE,
  minutesIn,
  minutesToCutoff,
} from '@/lib/cutoff'

/** Re-reads the clock every minute in the browser; `null` on the server and before mount. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = setInterval(tick, 60_000)
    return () => clearInterval(timer)
  }, [])
  return now
}

/**
 * The visitor's side of the cut-off line: their own clock time and how long is left, appended
 * after mount as inline text, so the server sentence never shifts and never mismatches.
 */
export function CutoffCountdown({ cutoff }: { cutoff: string }) {
  const now = useNow()
  if (!now) return null
  const left = minutesToCutoff(cutoff, now)
  if (left <= 0) {
    return (
      <span aria-live="off">
        {' '}
        Today&apos;s cut-off has passed, so orders placed now go out on the next delivery day.
      </span>
    )
  }
  const onJamaicaTime = minutesIn(now, JAMAICA_TIME_ZONE) === now.getHours() * 60 + now.getMinutes()
  return (
    <span aria-live="off">
      {' '}
      That&apos;s {onJamaicaTime ? '' : `${cutoffInLocalTime(cutoff, now)} where you are, `}
      {formatDuration(left)} from now.
    </span>
  )
}
