import { describe, expect, it } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatJamaicanPhone,
  formatJmd,
  formatTime,
  formatUsd,
  toTitleCase,
  usdCentsToJmd,
} from './format'

describe('money', () => {
  it('formats US cents as USD$', () => {
    expect(formatUsd(3100)).toBe('USD$31')
    expect(formatUsd(3150)).toBe('USD$31.50')
    expect(formatUsd(5)).toBe('USD$0.05')
    expect(formatUsd(123456)).toBe('USD$1,234.56')
    expect(formatUsd(-1250)).toBe('-USD$12.50')
  })

  it('formats Jamaican dollars without decimals', () => {
    expect(formatJmd(3100)).toBe('J$3,100')
    expect(formatJmd(3100.4)).toBe('J$3,100')
  })

  it('converts USD to J$ rounded to the nearest J$10', () => {
    expect(usdCentsToJmd(3150, 157.5)).toBe(4960)
    expect(usdCentsToJmd(100, 157)).toBe(160)
  })
})

describe('dates', () => {
  // 14:12 UTC is 9:12 AM in Jamaica (UTC-5, no daylight saving).
  const when = '2026-07-31T14:12:00Z'

  it('uses the client format in Jamaica time', () => {
    expect(formatDate(when)).toBe('July 31, 2026')
    expect(formatTime(when)).toBe('9:12 AM')
    expect(formatDateTime(when)).toBe('July 31, 2026 at 9:12 AM')
  })

  it('rolls the date over in Jamaica time, not UTC', () => {
    expect(formatDate('2026-08-01T03:00:00Z')).toBe('July 31, 2026')
  })
})

describe('phones', () => {
  it('normalises Jamaican numbers', () => {
    expect(formatJamaicanPhone('8761231234')).toBe('1-876-123-1234')
    expect(formatJamaicanPhone('(876) 123-1234')).toBe('1-876-123-1234')
    expect(formatJamaicanPhone('+1 658 123 1234')).toBe('1-658-123-1234')
  })

  it('rejects numbers outside Jamaica', () => {
    expect(formatJamaicanPhone('2125551234')).toBeNull()
    expect(formatJamaicanPhone('876123')).toBeNull()
  })
})

describe('names', () => {
  it('uses Title Case', () => {
    expect(toTitleCase('chris BROWN')).toBe('Chris Brown')
    expect(toTitleCase("  mary-ann   o'connor ")).toBe("Mary-Ann O'Connor")
    expect(toTitleCase('donovan mcdonald')).toBe('Donovan McDonald')
  })
})
