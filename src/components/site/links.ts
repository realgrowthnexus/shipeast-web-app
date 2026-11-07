/**
 * Text-link styles shared by every marketing page, so a link looks the same on the same
 * background everywhere. All keep a 44px touch target.
 */

/** On a light band (`page` or `surface`). */
export const lightLink =
  'inline-flex min-h-control items-center font-semibold text-crimson underline-offset-4 hover:underline'

/** On solid crimson or oxblood: blush underline that turns white on hover. */
export const onDarkLink =
  'inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-on-dark'

/** On a photo under the flat overlay: blush is under 4.5:1 there, so the underline stays white. */
export const overlayLink =
  'inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-on-dark underline-offset-4 hover:decoration-2'
