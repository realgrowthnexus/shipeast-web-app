import { describe, expect, it } from 'vitest'
import { aisleSample, aisleSampleLine, priceCheckLine, priceCheckRange } from './shop-front'

const p = (name: string, status: 'visible' | 'hidden' | 'out_of_stock' = 'visible') => ({
  name,
  status,
})

describe('aisleSample', () => {
  it('keeps shelf order and skips what cannot be bought', () => {
    const shelf = [
      p('Rice'),
      p('Coffee', 'out_of_stock'),
      p('Oil'),
      p('Secret', 'hidden'),
      p('Flour'),
      p('Sugar'),
    ]
    expect(aisleSample(shelf)).toEqual(['Rice', 'Oil', 'Flour'])
  })
})

describe('aisleSampleLine', () => {
  it('joins names in plain English', () => {
    expect(aisleSampleLine(['Rice'], 1)).toBe('Rice')
    expect(aisleSampleLine(['Rice', 'Oil'], 2)).toBe('Rice and Oil')
    expect(aisleSampleLine(['Rice', 'Oil', 'Flour'], 3)).toBe('Rice, Oil and Flour')
    expect(aisleSampleLine(['Rice', 'Oil', 'Flour'], 9)).toBe('Rice, Oil, Flour and more')
    expect(aisleSampleLine([], 0)).toBe('')
  })
})

describe('priceCheckRange and priceCheckLine', () => {
  const at = (priceCheckedAt: string, status: 'visible' | 'hidden' = 'visible') => ({
    priceCheckedAt,
    status,
  })

  it('says "on" for one day', () => {
    const range = priceCheckRange([at('2026-10-20T15:00:00Z'), at('2026-10-20T16:00:00Z')])
    expect(priceCheckLine(range!)).toBe('Prices checked in store on October 20, 2026.')
  })

  it('says "between" for two days and ignores hidden products', () => {
    const range = priceCheckRange([
      at('2026-10-20T15:00:00Z'),
      at('2026-10-14T15:00:00Z'),
      at('2026-09-01T15:00:00Z', 'hidden'),
    ])
    expect(priceCheckLine(range!)).toBe(
      'Prices checked in store between October 14, 2026 and October 20, 2026.',
    )
  })

  it('returns null with nothing to show', () => {
    expect(priceCheckRange([])).toBeNull()
    expect(priceCheckRange([at('not a date')])).toBeNull()
  })
})
