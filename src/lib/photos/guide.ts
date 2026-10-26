import { photo, type StockPhoto } from './types'

/** Photos added for: How it works, delivery and FAQ. Key names must not clash with other photo files. */
export const guidePhotos = {
  guideProduce: photo({
    unsplashId: 'pbtBb5Y1C_Y',
    src: 'https://images.unsplash.com/photo-1782973048090-ac7a9a3ff39a',
    width: 4000,
    height: 2667,
    alt: 'Hands choosing vegetables and corn at a market stall',
    photographer: 'Tho Nguyen Huu',
    username: 'suryatravel',
    usedOn: 'How it works',
  }),
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
} satisfies Record<string, StockPhoto>
