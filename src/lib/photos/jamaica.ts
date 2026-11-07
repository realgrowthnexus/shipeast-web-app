import { photo, type StockPhoto } from './types'

/** Photos that say "Jamaica" at a glance: the flag, food from home, Kingston. Keys start with jm. */
export const jamaicaPhotos = {
  jmEasterBun: photo({
    unsplashId: '6Wn8R1FDouA',
    src: 'https://images.unsplash.com/photo-1632859509881-f557437f5d33',
    width: 5184,
    height: 3456,
    alt: 'Slices of Jamaican Easter bun and cheese with a cold drink',
    photographer: 'Gabre Cameron',
    username: 'gabrecameron',
    usedOn: 'Gifts',
  }),
  jmKingstonHills: photo({
    unsplashId: '0uBGE5y9RZ8',
    src: 'https://images.unsplash.com/photo-1584238556966-2c407cc4fd56',
    width: 6000,
    height: 4000,
    alt: 'Kingston from above, with the hills behind the city',
    photographer: 'andrzj brown',
    username: 'andrzjbrown',
    usedOn: 'Home page (delivery areas), Delivery',
  }),
} satisfies Record<string, StockPhoto>
