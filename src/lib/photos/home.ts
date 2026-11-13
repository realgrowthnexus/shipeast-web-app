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
  // Home v3. Downloads registered through the Unsplash API on November 13, 2026.
  homeBags: photo({
    unsplashId: 'wjoIBMRjQ7s',
    src: 'https://images.unsplash.com/photo-1652262968340-b735524f9ae4',
    width: 6433,
    height: 4912,
    alt: 'Paper bags of bread, tomatoes and bananas on a pale kitchen counter',
    photographer: 'Archer Fu',
    username: 'yeehawprint',
    usedOn: 'Home: hero',
  }),
  homeVegBox: photo({
    unsplashId: 'Ss1u-roUcuM',
    src: 'https://images.unsplash.com/photo-1594917156256-37703f0c993c',
    width: 4000,
    height: 3000,
    alt: 'A cardboard box of fresh tomatoes, peppers, beans and courgettes, seen from above',
    photographer: 'Luismi Sánchez',
    username: 'luismisanchez',
    usedOn: 'Home: hero tile and Groceries tile',
  }),
  homeFamilyCook: photo({
    unsplashId: 'm9cBmbOQCmQ',
    src: 'https://images.unsplash.com/photo-1761839258568-fd466a93f68b',
    width: 8192,
    height: 5464,
    alt: 'A family cooking together in a bright kitchen',
    photographer: "Land O'Lakes, Inc.",
    username: 'landolakesinc',
    position: '35% 30%',
    usedOn: 'Home: closing',
  }),
} satisfies Record<string, StockPhoto>
