import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { duration, panel, rise, staggerStep } from './motion'

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

describe('home v3.3 tokens', () => {
  it('motion is quick and calm', () => {
    expect(duration.reveal).toBe(0.5)
    expect(duration.panel).toBe(0.3)
    expect(rise).toBe(12)
    expect(staggerStep).toBe(0.05)
    expect(panel.open.height.duration).toBe(0.3)
    expect(panel.close.height.duration).toBe(0.22)
  })

  it('css carries the new roles and no decorative loop', () => {
    expect(css).toMatch(/--text-price:\s*1\.125rem/)
    expect(css).toMatch(/--duration-panel:\s*300ms/)
    expect(css).toMatch(/--duration-reveal:\s*500ms/)
    expect(css).not.toMatch(/animate-bob|@keyframes bob/)
  })
})
