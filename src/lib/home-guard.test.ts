import { readdirSync, readFileSync } from 'node:fs'
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

  it('nothing waits on JavaScript that never arrives', () => {
    expect(css).toMatch(/\[data-home\]:not\(\[data-hydrated\]\) \[data-fade\]\s*\{\s*opacity: 1/)
    expect(css).toMatch(/\[data-home\]:not\(\[data-hydrated\]\) \[data-reveal\]\s*\{\s*animation: reveal-failsafe/)
    expect(homeFiles.find((f) => f.path.endsWith('layout.tsx'))?.text).toContain('<HomeHydrated />')
  })
})

/** Every source file of the home page: its route group and its components. */
const homeFiles = ['src/components/home', 'src/app/(home)'].flatMap((dir) =>
  readdirSync(join(process.cwd(), dir))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => ({ path: `${dir}/${f}`, text: readFileSync(join(process.cwd(), dir, f), 'utf8') })),
)

describe('home v3.3 page rules', () => {
  it('no corner is rounder than 24px and nothing bobs', () => {
    const offenders = homeFiles.filter((f) =>
      /rounded-(3xl|4xl)|rounded-t-4xl|animate-bob/.test(f.text),
    )
    expect(offenders.map((f) => f.path)).toEqual([])
  })

  it('the proof headline is the one display-size moment', () => {
    const display = homeFiles.filter((f) => f.text.includes('text-display'))
    expect(display.map((f) => f.path)).toEqual(['src/components/home/proof.tsx'])
  })
})
