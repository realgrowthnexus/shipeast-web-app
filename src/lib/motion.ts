/**
 * Motion tokens for `motion/react`, matching the CSS ones in globals.css. Movement is short and
 * calm: things rise a little and fade in, once. Nothing bounces, loops or follows the cursor.
 */
export const ease = {
  /** Most entrances and hovers. */
  outSoft: [0.22, 1, 0.36, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
} as const

export const duration = {
  fast: 0.15,
  base: 0.25,
  /** Disclosure panels (the FAQ). */
  panel: 0.3,
  slow: 0.45,
  /** Scroll reveals. */
  reveal: 0.5,
} as const

/** How far a revealed block rises, in px. */
export const rise = 12

/** Gap between items in a staggered group, in seconds. */
export const staggerStep = 0.05

/** Disclosure panels: open on outSoft, close a little faster on inOutSoft, text fades in late. */
export const panel = {
  open: {
    height: { duration: 0.3, ease: ease.outSoft },
    opacity: { duration: 0.2, delay: 0.06, ease: ease.outSoft },
  },
  close: {
    height: { duration: 0.22, ease: ease.inOutSoft },
    opacity: { duration: 0.12, ease: ease.inOutSoft },
  },
} as const
