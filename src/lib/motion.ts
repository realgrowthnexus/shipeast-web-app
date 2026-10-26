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
  slow: 0.45,
  /** Scroll reveals. */
  reveal: 0.7,
} as const

/** How far a revealed block rises, in px. */
export const rise = 24

/** Gap between items in a staggered group, in seconds. */
export const staggerStep = 0.08
