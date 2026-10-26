import { describe, expect, it } from 'vitest'
import { addDays, deliveryOptions, jamaicaClock } from './delivery'

const sameDay = { speed: 'same_day' as const, cutoffTime: '13:00' }

describe('delivery days', () => {
  it('reads the clock in Jamaica time (UTC-5, no daylight saving)', () => {
    expect(jamaicaClock(new Date('2026-07-01T03:30:00Z'))).toEqual({
      date: '2026-06-30',
      time: '22:30',
    })
    expect(jamaicaClock(new Date('2026-12-01T17:59:00Z'))).toEqual({
      date: '2026-12-01',
      time: '12:59',
    })
  })

  it('offers today before the cut-off and tomorrow after it', () => {
    const before = deliveryOptions(sameDay, new Date('2026-10-26T17:59:00Z')) // 12:59 in Jamaica
    expect(before[0]).toEqual({
      date: '2026-10-26',
      day: 'Today',
      dateLabel: 'October 26',
      sameDay: true,
    })
    expect(before[1]).toMatchObject({ day: 'Tomorrow', dateLabel: 'October 27' })
    const after = deliveryOptions(sameDay, new Date('2026-10-26T18:00:00Z')) // 1:00 PM
    expect(after[0]).toMatchObject({ date: '2026-10-27', sameDay: false })
    expect(after).toHaveLength(3)
  })

  it('starts later for next-day and scheduled parishes', () => {
    const now = new Date('2026-10-26T14:00:00Z')
    expect(deliveryOptions({ speed: 'next_day', cutoffTime: '13:00' }, now)[0].date).toBe(
      '2026-10-27',
    )
    expect(deliveryOptions({ speed: 'scheduled', cutoffTime: '13:00' }, now)[0]).toMatchObject({
      day: 'Wednesday',
      dateLabel: 'October 28',
    })
  })

  it('crosses month and year ends', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29')
  })
})
