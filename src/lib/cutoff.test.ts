import { describe, expect, it } from 'vitest'
import { clockMinutes, formatDuration, minutesToCutoff } from './cutoff'

describe('cut-off helpers', () => {
  it('reads a stored cut-off', () => {
    expect(clockMinutes('13:00')).toBe(780)
  })

  it('counts minutes to the cut-off in Jamaica time', () => {
    // 15:00 UTC is 10:00 AM in Jamaica (UTC-5 all year)
    expect(minutesToCutoff('13:00', new Date('2026-07-01T15:00:00Z'))).toBe(180)
    // 19:30 UTC is 2:30 PM in Jamaica, 90 minutes past a 1:00 PM cut-off
    expect(minutesToCutoff('13:00', new Date('2026-12-01T19:30:00Z'))).toBe(-90)
  })

  it('formats a duration', () => {
    expect(formatDuration(192)).toBe('3h 12m')
    expect(formatDuration(45)).toBe('45m')
  })
})
