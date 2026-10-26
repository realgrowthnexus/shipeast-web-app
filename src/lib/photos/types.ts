/**
 * Every stock photo on the marketing site, in one place, so a photo can be swapped without
 * touching the pages and the credits page stays complete.
 *
 * All photos are from Unsplash under the Unsplash License (free for commercial use, no
 * permission needed). Each one was registered as a download through the Unsplash API, and we
 * hotlink images.unsplash.com as Unsplash asks. Never add PriceSmart's own photos here, and keep
 * product photos out: those come from ShipEast. See docs/PHOTOGRAPHY.md for the rules.
 */
export type StockPhoto = {
  /** Unsplash photo id, as in unsplash.com/photos/<id>. */
  unsplashId: string
  /** images.unsplash.com URL without query parameters. */
  src: string
  width: number
  height: number
  alt: string
  photographer: string
  /** Unsplash username, for the credit link. */
  username: string
  /** CSS object-position, when the subject is not in the middle. */
  position?: string
  /** Where the photo is used, for the credits page. */
  usedOn: string
}

/** Identity helper so each entry is checked against StockPhoto. */
export const photo = (p: StockPhoto) => p
