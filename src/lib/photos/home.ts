import { photo, type StockPhoto } from './types'

/** Photos added for: Home page. Key names must not clash with other photo files. */
export const homePhotos = {
  homeSenderPhone: photo({
    unsplashId: 'o-iM0avkgNo',
    src: 'https://images.unsplash.com/photo-1610473068893-7a63129207d2',
    width: 3936,
    height: 2624,
    alt: 'A woman holding her phone beside an open laptop',
    photographer: 'Brandy Kennedy',
    username: 'thebrandyk',
    usedOn: 'Home page',
  }),
  homeDoorWelcome: photo({
    unsplashId: 'ZnhLxDMsCbY',
    src: 'https://images.unsplash.com/photo-1675179181127-2c0666e2334d',
    width: 5472,
    height: 3648,
    alt: 'An older woman smiling as she opens her blue front door',
    photographer: 'Centre for Ageing Better',
    username: 'ageing_better',
    usedOn: 'Home page',
  }),
} satisfies Record<string, StockPhoto>
