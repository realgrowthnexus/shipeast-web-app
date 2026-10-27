'use client'

import { useEffect, useState } from 'react'
import { FlagBadge } from '@/components/site/jamaica'
import { formatClockTime } from '@/lib/format'

const JAMAICA = 'America/Jamaica'

/** Minutes past midnight for `date` in a time zone. */
function minutesIn(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return get('hour') * 60 + get('minute')
}

/** `13:00` Jamaica time today, as the visitor's own clock time (`2:00 PM`). */
function cutoffInLocalTime(hhmm: string, now: Date) {
  const [h, m] = hhmm.split(':').map(Number)
  const offset = minutesIn(now, JAMAICA) - (now.getHours() * 60 + now.getMinutes())
  const local = (((h * 60 + m - offset) % 1440) + 1440) % 1440
  return formatClockTime(`${Math.floor(local / 60)}:${local % 60}`)
}

/**
 * The same-day cut-off, always in Jamaica time (it has no daylight saving, so in summer 1:00 PM
 * there is 2:00 PM in New York and Toronto). The server renders the plain promise; in the
 * browser it adds the visitor's own time and switches once today's cut-off has passed.
 */
export function CutoffBadge({ cutoff, parishes }: { cutoff: string; parishes: string }) {
  const time = formatClockTime(cutoff)
  const [state, setState] = useState<{ open: boolean; local: string | null } | null>(null)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const [h, m] = cutoff.split(':').map(Number)
      const local = cutoffInLocalTime(cutoff, now)
      setState({ open: minutesIn(now, JAMAICA) < h * 60 + m, local: local === time ? null : local })
    }
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [cutoff, time])

  return (
    <FlagBadge>
      <span>
        {state && !state.open ? (
          <>Order now for the next delivery in {parishes}</>
        ) : (
          <>
            Order by {time} Jamaica time for delivery today
            {state?.local && <span className="text-ink-muted"> ({state.local} your time)</span>}
          </>
        )}
      </span>
    </FlagBadge>
  )
}
