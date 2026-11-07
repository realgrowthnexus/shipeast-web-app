import { photo, type StockPhoto } from './types'

/** Photos added for: How it works, delivery and FAQ. Key names must not clash with other photo files. */
export const guidePhotos = {
  guideKitchen: photo({
    unsplashId: 'ce5ShWF9tAY',
    src: 'https://images.unsplash.com/photo-1565128542755-7fe9c3ebf177',
    width: 6310,
    height: 4207,
    alt: 'A couple cooking together in their kitchen at home',
    photographer: 'AllGo - An App For Plus Size People',
    username: 'canweallgo',
    usedOn: 'Delivery',
  }),
  hiwSender: photo({
    unsplashId: 'NP6aeffzH2E',
    src: 'https://images.unsplash.com/photo-1758521541103-d29cbd5fb2e5',
    width: 3840,
    height: 2160,
    alt: 'A young woman at home with her laptop and a cup of tea',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    position: '40% center',
    usedOn: 'How it works (hero background)',
  }),
  hiwFamilyDoor: photo({
    unsplashId: 'FkNCfc7MaHc',
    src: 'https://images.unsplash.com/flagged/photo-1562925218-82b07bb9a50d',
    width: 5000,
    height: 3333,
    alt: 'An older woman standing in the blue doorway of her home',
    photographer: 'Patricia Prudente',
    username: 'apsprudente',
    position: 'center 35%',
    usedOn: 'How it works (your family)',
  }),
} satisfies Record<string, StockPhoto>
