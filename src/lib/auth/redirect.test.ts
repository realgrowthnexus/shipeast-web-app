import { describe, expect, it } from 'vitest'
import { safeNext, withNext } from './redirect'

describe('safeNext', () => {
  it('keeps paths on this site', () => {
    expect(safeNext('/account/orders')).toBe('/account/orders')
    expect(safeNext('/checkout?x=1')).toBe('/checkout?x=1')
  })
  it('refuses other sites and odd values', () => {
    expect(safeNext('https://evil.example')).toBe('/account')
    expect(safeNext('//evil.example')).toBe('/account')
    expect(safeNext('/\\evil.example')).toBe('/account')
    expect(safeNext('/a\nb')).toBe('/account')
    expect(safeNext(undefined)).toBe('/account')
    expect(safeNext(['/x'])).toBe('/account')
  })
})

describe('withNext', () => {
  it('only adds next when it is not the default', () => {
    expect(withNext('/signin', '/account')).toBe('/signin')
    expect(withNext('/signin', '/checkout')).toBe('/signin?next=%2Fcheckout')
  })
})
