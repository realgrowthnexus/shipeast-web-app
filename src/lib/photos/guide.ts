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
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  hiwSender: photo({
    unsplashId: 'KOG1thEuTG8',
    src: 'https://images.unsplash.com/photo-1758526214018-a746f9554b8b',
    width: 3840,
    height: 2160,
    alt: 'A young woman at home smiling as she pays by card on her phone',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    position: '70% 40%',
    usedOn: 'How it works (hero background)',
  }),
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  hiwFamilyDoor: photo({
    unsplashId: '65_nbwiD3I4',
    src: 'https://images.unsplash.com/photo-1575467678950-0c09aad418af',
    width: 2731,
    height: 4096,
    alt: 'A couple smiling as they prepare vegetables in a bright kitchen at home',
    photographer: 'CDC',
    username: 'cdc',
    position: '40% 35%',
    usedOn: 'How it works (your family)',
  }),
  faqHelp: photo({
    unsplashId: 'QpuRvyYQ5kA',
    src: 'https://images.unsplash.com/photo-1758611974982-ca55f12b3378',
    width: 3840,
    height: 2160,
    alt: 'A woman at home checking her phone beside her laptop',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    usedOn: 'FAQ (still need help)',
  }),
} satisfies Record<string, StockPhoto>
