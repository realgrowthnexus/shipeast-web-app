import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('keeps the named type scale beside a text colour', () => {
    expect(cn('text-h1 text-ink')).toBe('text-h1 text-ink')
  })

  it('keeps the control border width beside a border colour', () => {
    expect(cn('border-control border-crimson', 'w-full')).toBe(
      'border-control border-crimson w-full',
    )
  })
})
