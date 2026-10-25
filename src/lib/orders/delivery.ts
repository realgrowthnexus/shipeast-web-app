import type { DeliveryZone } from '@/lib/types'

/**
 * Which delivery days a sender can pick. Everything runs on Jamaica's clock (no daylight
 * saving), so a sender in London or Toronto sees the same cut-off as the driver.
 */

const TIME_ZONE = 'America/Jamaica'

const partsFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Jamaica's calendar date (`2026-10-25`) and clock time (`13:05`) for an instant. */
export function jamaicaClock(now: Date): { date: string; time: string } {
  const p = Object.fromEntries(partsFmt.formatToParts(now).map((x) => [x.type, x.value]))
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` }
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

const dayFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

export interface DeliveryOption {
  date: string
  /** `Today`, `Tomorrow` or the weekday. */
  day: string
  /** `October 26` */
  dateLabel: string
  sameDay: boolean
}

/**
 * Same-day zones get today until the cut-off, then tomorrow onwards. Next-day zones start
 * tomorrow, scheduled zones the day after. Three choices are offered.
 */
export function deliveryOptions(
  zone: Pick<DeliveryZone, 'speed' | 'cutoffTime'>,
  now: Date,
  count = 3,
): DeliveryOption[] {
  const { date: today, time } = jamaicaClock(now)
  const firstOffset =
    zone.speed === 'same_day' ? (time < zone.cutoffTime ? 0 : 1) : zone.speed === 'next_day' ? 1 : 2
  return Array.from({ length: count }, (_, i) => {
    const offset = firstOffset + i
    const date = addDays(today, offset)
    const [weekday, dateLabel] = dayFmt.format(new Date(`${date}T12:00:00Z`)).split(', ')
    const day = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : weekday
    return { date, day, dateLabel, sameDay: offset === 0 }
  })
}
