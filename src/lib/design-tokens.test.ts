import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Guards the brand system in globals.css: text and control colours keep WCAG AA contrast on
 * the surfaces they are used on, and components never fall back to gradients, raw hex or
 * see-through text colours.
 */

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]),
)

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const color = (name: string) => {
  if (name === 'white') return '#ffffff'
  const hex = tokens[name]
  if (!hex) throw new Error(`Missing token --color-${name}`)
  return hex
}

// [foreground, background, minimum ratio]
const pairs: [string, string, number][] = [
  ['ink', 'canvas', 4.5],
  ['ink-body', 'canvas', 4.5],
  ['ink-muted', 'canvas', 4.5],
  ['ink-muted', 'surface', 4.5],
  ['ink-muted', 'surface-tint', 4.5],
  ['crimson', 'canvas', 4.5],
  ['crimson', 'surface', 4.5],
  ['crimson-deep', 'surface-tint', 4.5],
  ['white', 'crimson', 4.5],
  ['blush', 'crimson', 4.5],
  ['on-crimson-muted', 'crimson', 4.5],
  ['on-oxblood-muted', 'oxblood', 4.5],
  ['ok', 'ok-tint', 4.5],
  ['info', 'info-tint', 4.5],
  ['warn', 'warn-tint', 4.5],
  ['danger', 'danger-tint', 4.5],
  ['ink', 'crimson-50', 4.5],
  ['ink-body', 'crimson-50', 4.5],
  ['crimson', 'crimson-50', 4.5],
  ['white', 'crimson-700', 4.5],
  ['blush', 'crimson-800', 4.5],
  ['white', 'oxblood', 4.5],
  // Non-text: form control borders need 3:1 (WCAG 1.4.11).
  ['line-strong', 'surface', 3],
  ['line-strong', 'canvas', 3],
]

describe('brand shades match the named colours', () => {
  it.each([
    ['crimson-100', 'surface-tint'],
    ['crimson-200', 'blush'],
    ['crimson-500', 'signal'],
    ['crimson-600', 'crimson'],
    ['crimson-700', 'crimson-deep'],
    ['crimson-900', 'oxblood'],
    ['neutral-0', 'surface'],
    ['neutral-50', 'canvas'],
    ['neutral-100', 'line'],
    ['neutral-400', 'line-strong'],
    ['neutral-500', 'ink-muted'],
    ['neutral-700', 'ink-body'],
    ['neutral-900', 'ink'],
  ])('%s equals %s', (shade, named) => {
    expect(color(shade)).toBe(color(named))
  })
})

describe('brand colour contrast', () => {
  it.each(pairs)('%s on %s is at least %d:1', (fg, bg, min) => {
    expect(contrast(color(fg), color(bg))).toBeGreaterThanOrEqual(min)
  })
})

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx$/.test(name) ? [path] : []
  })
}

describe('components use tokens', () => {
  const files = sourceFiles(join(process.cwd(), 'src'))

  it.each([
    [
      'gradients',
      /bg-gradient|linear-gradient|radial-gradient|\b(from|via|to)-(crimson|oxblood|signal|blush|ink)/,
    ],
    ['raw hex colours', /\[#[0-9a-f]{3,8}\]/i],
    // Decorative placeholder icons may use a faded crimson; text never fades.
    ['see-through text colours', /text-(white|ink|ink-body|ink-muted)\/\d+/],
  ])('no %s', (_, pattern) => {
    const offenders = files.filter((f) => pattern.test(readFileSync(f, 'utf8')))
    expect(offenders).toEqual([])
  })
})
