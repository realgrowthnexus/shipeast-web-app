import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Guards the token system in globals.css (see docs/TOKENS.md):
 * - every role colour resolves to a real value, and text/control pairs keep WCAG AA contrast;
 * - components only use classes that exist: a misspelt or retired colour class (Tailwind
 *   silently drops unknown classes) fails here instead of rendering unstyled;
 * - components never use gradients, raw hex, see-through text or the default palette.
 */

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

/** Every `--name: value;` declaration, primitives and roles alike. */
const declarations = Object.fromEntries(
  [...css.matchAll(/--([a-z0-9*-]+):\s*([^;]+);/gi)].map((m) => [m[1], m[2].trim()]),
)

/** The role colours: the only colour classes that exist. */
const roles = Object.keys(declarations)
  .filter((k) => k.startsWith('color-') && k !== 'color-*')
  .map((k) => k.slice('color-'.length))

/** Resolve a declaration through var() references down to a hex value. */
function resolve(name: string, seen = new Set<string>()): string {
  const value = declarations[name]
  if (!value) throw new Error(`Missing token --${name}`)
  const ref = value.replace(/\s+/g, '').match(/^var\(--([a-z0-9-]+)\)$/i)
  if (ref) {
    if (seen.has(ref[1])) throw new Error(`Circular token --${name}`)
    return resolve(ref[1], seen.add(name))
  }
  return value.split('/*')[0].trim()
}

const color = (role: string) => {
  const hex = resolve(`color-${role}`)
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`--color-${role} is not a hex colour: ${hex}`)
  return hex
}

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

const lightSurfaces = ['page', 'surface', 'surface-muted', 'surface-selected']
const darkSurfaces = ['crimson', 'crimson-deep', 'oxblood']

// [foreground, background, minimum ratio]
const pairs: [string, string, number][] = [
  // Text on every light surface
  ...['ink', 'ink-body', 'ink-muted', 'crimson', 'crimson-deep'].flatMap((fg) =>
    lightSurfaces.map((bg) => [fg, bg, 4.5] as [string, string, number]),
  ),
  ['ink', 'surface-strong', 4.5],
  ['ink-body', 'surface-strong', 4.5],
  ['crimson-deep', 'surface-strong', 4.5],
  // Text on the brand fills
  ...['on-dark', 'blush', 'on-crimson-muted'].flatMap((fg) =>
    darkSurfaces.map((bg) => [fg, bg, 4.5] as [string, string, number]),
  ),
  ['on-oxblood-muted', 'oxblood', 4.5],
  ['on-dark', 'ink', 4.5],
  ['on-dark', 'ink-body', 4.5],
  ['on-dark', 'danger', 4.5],
  ['on-dark', 'danger-deep', 4.5],
  // Status text on its tint
  ['ok', 'ok-tint', 4.5],
  ['info', 'info-tint', 4.5],
  ['warn', 'warn-tint', 4.5],
  ['danger', 'danger-tint', 4.5],
  ['danger', 'surface', 4.5],
  ['ok', 'surface', 4.5],
  // Flag accents: a label on a gold tag, gold on dark bands, the basket price strips
  ['ink', 'jm-gold', 4.5],
  ['crimson-deep', 'jm-gold', 4.5],
  ['jm-gold', 'jm-black', 4.5],
  ['jm-gold', 'oxblood', 4.5],
  ['jm-black', 'jm-green', 4.5],
  ['on-dark', 'jm-black', 4.5],
  ['on-crimson-muted', 'jm-black', 4.5],
  // Non-text: control borders and the focus ring need 3:1 (WCAG 1.4.11)
  ...lightSurfaces.slice(0, 3).map((bg) => ['line-strong', bg, 3] as [string, string, number]),
  ...lightSurfaces.map((bg) => ['signal', bg, 3] as [string, string, number]),
  ['blush', 'crimson', 3],
  ['blush', 'crimson-deep', 3],
  ['blush', 'oxblood', 3],
]

/** Translucent roles (`rgb(r g b / a)`): overlays, checked by what shows through them. */
function rgba(role: string) {
  const m = resolve(`color-${role}`).match(/^rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\)$/)
  if (!m) throw new Error(`--color-${role} is not an rgb() colour with alpha`)
  return { rgb: [m[1], m[2], m[3]].map(Number), alpha: Number(m[4]) }
}

/** The flat colour you see where an overlay sits on top of `under` (a hex). */
function blend(role: string, under: string) {
  const { rgb, alpha } = rgba(role)
  const base = [1, 3, 5].map((i) => parseInt(under.slice(i, i + 2), 16))
  return (
    '#' +
    rgb
      .map((c, i) => Math.round(c * alpha + base[i] * (1 - alpha)))
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')
  )
}

describe('tokens resolve', () => {
  it('switches off the default palette', () => {
    expect(declarations['color-*']).toBe('initial')
  })
  it.each(roles.filter((r) => !['scrim', 'photo-scrim'].includes(r)))(
    '--color-%s resolves to a hex colour',
    (role) => {
      expect(color(role)).toMatch(/^#[0-9a-f]{6}$/i)
    },
  )
})

describe('contrast', () => {
  it.each(pairs)('%s on %s is at least %d:1', (fg, bg, min) => {
    expect(contrast(color(fg), color(bg))).toBeGreaterThanOrEqual(min)
  })

  // The photo overlay (home S7): the worst case is a pure white pixel in the photo.
  it('on-dark on photo-scrim over white is at least 4.5:1', () => {
    expect(contrast(color('on-dark'), blend('photo-scrim', '#ffffff'))).toBeGreaterThanOrEqual(4.5)
  })
  it('the blush focus ring on photo-scrim over black is at least 3:1', () => {
    expect(contrast(color('blush'), blend('photo-scrim', '#000000'))).toBeGreaterThanOrEqual(3)
  })
})

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : []
  })
}

const files = sourceFiles(join(process.cwd(), 'src')).map((path) => ({
  path: path.replace(process.cwd() + '/', ''),
  text: readFileSync(path, 'utf8'),
}))

describe('components use tokens', () => {
  it.each([
    [
      'gradients',
      /bg-gradient|bg-linear|bg-radial|bg-conic|linear-gradient|radial-gradient|\b(from|via|to)-(crimson|oxblood|signal|blush|ink|jm|surface|page)/,
    ],
    ['raw hex colours', /\[#[0-9a-f]{3,8}\]/i],
    ['see-through text colours', /\btext-[a-z-]+\/\d+/],
    ['hand-set letter spacing', /(?<![\w/-])tracking-(?!tight\b)[a-z]+/],
    ['text under 12px', /text-\[(?:[0-9]|1[01])px\]/],
  ])('no %s', (_, pattern) => {
    expect(files.filter((f) => pattern.test(f.text)).map((f) => f.path)).toEqual([])
  })

  // Colour utilities whose value must be a role. Tailwind drops an unknown class silently, so
  // `bg-surface-tint` (retired) or `text-crimson-700` (a primitive) would just vanish.
  const colorPrefixes =
    'bg|text|border(?:-[trblxy])?|divide|ring|ring-offset|outline|fill|stroke|accent|caret|decoration|placeholder|shadow'
  const nonColor = new Set([
    // text sizes and alignment
    ...['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', 'small', 'body', 'lead', 'h1', 'h2', 'h3'],
    ...['title', 'numeral', 'display', 'left', 'center', 'right', 'balance', 'pretty', 'wrap'],
    ...['nowrap', 'ellipsis', 'clip', 'start', 'end', 'justify'],
    // static colours and keywords
    ...['transparent', 'current', 'inherit', 'none', 'control', 'solid', 'dashed', 'dotted'],
    ...['double', 'hidden', 'collapse', 'separate', 'cover', 'contain', 'fixed', 'local'],
    ...['scroll', 'no-repeat', 'repeat', 'auto', 'clip', 'origin', 'blend', 'inset'],
    // shadows and sizes
    ...['lift', 'float', 'overlay', 'offset', 'x', 'y'],
  ])
  const classPattern = new RegExp(
    String.raw`(?<![\w-])(?:[a-z0-9-]+:|\[[^\]]+\]:)*(${colorPrefixes})-([a-z][a-z0-9-]*)(?:\/\d+)?(?![\w-])`,
    'g',
  )

  it('every colour class is a role', () => {
    const unknown = new Set<string>()
    for (const { path, text } of files) {
      if (path.endsWith('globals.css')) continue
      for (const [match, , value] of text.matchAll(classPattern)) {
        if (nonColor.has(value) || /^\d/.test(value)) continue
        // ring-3, border-2, outline-offset-2, text-[…] and similar are not colours
        if (/^(offset|opacity|width|color|only)/.test(value)) continue
        // border-t, border-b-2: a side, not a colour
        if (/^[trblxyse](-\d+)?$/.test(value)) continue
        if (!roles.includes(value)) unknown.add(`${path}: ${match}`)
      }
    }
    expect([...unknown]).toEqual([])
  })
})
