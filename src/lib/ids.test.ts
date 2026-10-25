import { describe, expect, it } from 'vitest'
import { isOrderNumber, isPublicId, newPublicId } from './ids'

describe('public ids', () => {
  it('generates SE-CUS and SE-DRV ids', () => {
    const cus = newPublicId('CUS')
    expect(cus).toMatch(/^SE-CUS-[0-9A-Z]{6}$/)
    expect(isPublicId(cus, 'CUS')).toBe(true)
    expect(isPublicId(cus, 'DRV')).toBe(false)
    expect(isPublicId(newPublicId('DRV'), 'DRV')).toBe(true)
  })

  it('never uses ambiguous letters', () => {
    for (let i = 0; i < 200; i++) expect(newPublicId('CUS').slice(7)).not.toMatch(/[ILOU]/)
  })

  it('is not sequential', () => {
    const ids = new Set(Array.from({ length: 500 }, () => newPublicId('CUS')))
    expect(ids.size).toBe(500)
  })

  it('validates order numbers', () => {
    expect(isOrderNumber('SE-10428')).toBe(true)
    expect(isOrderNumber('SE-CUS-ABC123')).toBe(false)
  })
})
