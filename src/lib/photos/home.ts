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
  // Download registered through the Unsplash API on November 6, 2026.
  homeStepToDoor: photo({
    unsplashId: 'czTuLlcSAus',
    src: 'https://images.unsplash.com/photo-1643960988237-a9c07e084aed',
    width: 6240,
    height: 4160,
    alt: 'A man carrying a paper bag of shopping up the steps to a front door',
    photographer: 'Mathias Reding',
    username: 'matreding',
    position: '60% center',
    usedOn: 'Home: how it works, step 4',
  }),
} satisfies Record<string, StockPhoto>
