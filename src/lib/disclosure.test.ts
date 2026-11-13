import { describe, expect, it } from 'vitest'
import { toggleOpen } from './disclosure'

describe('toggleOpen', () => {
  it('opens a closed item', () => {
    expect(toggleOpen(new Set(), 'a').has('a')).toBe(true)
  })

  it('closes an open item and leaves the others open', () => {
    expect(toggleOpen(new Set(['a', 'b']), 'a')).toEqual(new Set(['b']))
  })

  it('does not change the set it was given', () => {
    const open = new Set(['a'])
    toggleOpen(open, 'b')
    expect(open).toEqual(new Set(['a']))
  })
})
