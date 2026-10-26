/**
 * Every stock photo on the marketing site. The entries live in src/lib/photos/, one file per
 * group of pages; this file merges them so pages and the credits page see one list.
 *
 * All photos are from Unsplash under the Unsplash License (free for commercial use, no
 * permission needed). Each one was registered as a download through the Unsplash API, and we
 * hotlink images.unsplash.com as Unsplash asks. Never add PriceSmart's own photos, and keep
 * product photos out: those come from ShipEast. See docs/PHOTOGRAPHY.md for the rules.
 */
import { companyPhotos } from './photos/company'
import { corePhotos } from './photos/core'
import { guidePhotos } from './photos/guide'
import { homePhotos } from './photos/home'
import { shopPhotos } from './photos/shop'
import type { StockPhoto } from './photos/types'

export type { StockPhoto } from './photos/types'

export const stockPhotos = {
  ...corePhotos,
  ...homePhotos,
  ...shopPhotos,
  ...guidePhotos,
  ...companyPhotos,
} satisfies Record<string, StockPhoto>

export type StockPhotoKey = keyof typeof stockPhotos

/** Category slug → photo, for the category tiles. */
export const categoryPhotos: Record<string, StockPhotoKey> = {
  groceries: 'catGroceries',
  household: 'catHousehold',
  pharmacy: 'catPharmacy',
  'baby-and-child': 'catBaby',
}

/** Basket slug → photo, for basket cards. Baskets without one keep the plain crimson card. */
export const basketPhotos: Record<string, StockPhotoKey> = {
  'family-food-basket': 'basketFood',
  'baby-care-pack': 'basketBaby',
  'pharmacy-pack': 'basketPharmacy',
  'christmas-hamper': 'basketChristmas',
}

/** Unsplash asks for a link back with UTM parameters on every credit. */
const utm = 'utm_source=shipeast&utm_medium=referral'
export const photographerUrl = (p: StockPhoto) => `https://unsplash.com/@${p.username}?${utm}`
export const photoPageUrl = (p: StockPhoto) => `https://unsplash.com/photos/${p.unsplashId}?${utm}`
export const unsplashUrl = `https://unsplash.com/?${utm}`
