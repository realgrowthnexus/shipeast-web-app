import { describe, expect, it } from 'vitest'
import { priceCheckLine, priceCheckRange } from './shop-front'

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
