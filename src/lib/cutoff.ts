import { formatClockTime } from '@/lib/format'

/** Cut-offs are stored in Jamaica time, which has no daylight saving. */
export const JAMAICA_TIME_ZONE = 'America/Jamaica'

/** Minutes past midnight for `date` in a time zone. */
export function minutesIn(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return get('hour') * 60 + get('minute')
}

/** `13:00` → 780. */
export function clockMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Minutes left before today's cut-off in Jamaica; 0 or less once it has passed. */
export function minutesToCutoff(hhmm: string, now: Date) {
  return clockMinutes(hhmm) - minutesIn(now, JAMAICA_TIME_ZONE)
}

/** `13:00` Jamaica time today, as the visitor's own clock time (`2:00 PM`). */
export function cutoffInLocalTime(hhmm: string, now: Date) {
  const offset = minutesIn(now, JAMAICA_TIME_ZONE) - (now.getHours() * 60 + now.getMinutes())
  const local = (((clockMinutes(hhmm) - offset) % 1440) + 1440) % 1440
  return formatClockTime(`${Math.floor(local / 60)}:${local % 60}`)
}

/** 192 → `3h 12m`, 45 → `45m`. */
export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h}h ${m}m` : `${m}m`
}
