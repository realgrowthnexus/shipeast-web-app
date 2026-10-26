import { photo, type StockPhoto } from './types'

/** Photos that say "Jamaica" at a glance: the flag, food from home, Kingston. Keys start with jm. */
export const jamaicaPhotos = {
  jmFlag: photo({
    unsplashId: 'ysowLwOt-uM',
    src: 'https://images.unsplash.com/photo-1675855546421-8c537592b144',
    width: 7230,
    height: 5422,
    alt: 'The flag of Jamaica waving in the wind',
    photographer: 'engin akyurt',
    username: 'enginakyurt',
    usedOn: 'Home, About',
  }),
  jmAckee: photo({
    unsplashId: 'W4vDQETfroY',
    src: 'https://images.unsplash.com/photo-1632859965308-d15227508c4b',
    width: 5926,
    height: 3951,
    alt: 'A plate of ackee and saltfish with fried dumplings and a cup of coffee',
    photographer: 'Gabre Cameron',
    username: 'gabrecameron',
    usedOn: 'Home',
  }),
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
    usedOn: 'Delivery',
  }),
} satisfies Record<string, StockPhoto>
