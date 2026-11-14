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
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  homeStepToDoor: photo({
    unsplashId: '8RaUEd8zD-U',
    src: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
    width: 4032,
    height: 3024,
    alt: 'Two paper bags of groceries set down on the floor: bread, apples, bananas and a cabbage',
    photographer: 'Maria Lin Kim',
    username: 'mrsmaria',
    usedOn: 'Home (the photo at the door), product pages, Delivery',
  }),
  // Home v3. Download registered through the Unsplash API on November 13, 2026.
  homeBags: photo({
    unsplashId: 'wjoIBMRjQ7s',
    src: 'https://images.unsplash.com/photo-1652262968340-b735524f9ae4',
    width: 6433,
    height: 4912,
    alt: 'Paper bags of bread, tomatoes and bananas on a pale kitchen counter',
    photographer: 'Archer Fu',
    username: 'yeehawprint',
    position: 'center 60%',
    usedOn: 'Home: closing',
  }),
  // Photos v2. Downloads registered through the Unsplash API on November 14, 2026.
  homeAisle: photo({
    unsplashId: 'IH65r4HEQWQ',
    src: 'https://images.unsplash.com/photo-1670684684445-a4504dca0bbc',
    width: 5686,
    height: 3736,
    alt: 'A bright supermarket aisle stocked with snacks and groceries',
    photographer: 'Jack Lee',
    username: 'jack19992011',
    usedOn: 'Home: hero',
  }),
  homeBasketBags: photo({
    unsplashId: 'HeP33WOkVqM',
    src: 'https://images.unsplash.com/photo-1706267701238-b4d69fc8f640',
    width: 4000,
    height: 2667,
    alt: 'Paper grocery bags of fresh vegetables on a teal table, seen from above',
    photographer: 'Mockuuups',
    username: 'mockuuups',
    usedOn: 'Home: hero card (baskets ready to go)',
  }),
  homeCourierStreet: photo({
    unsplashId: 'KSQgzzn3dW0',
    src: 'https://images.unsplash.com/photo-1493135637657-c2411b3497ad',
    width: 4898,
    height: 3265,
    alt: 'A courier carrying parcels down a busy downtown street',
    photographer: 'Maarten van den Heuvel',
    username: 'mvdheuvel',
    usedOn: 'Home: delivering in St. Thomas and Kingston',
  }),
} satisfies Record<string, StockPhoto>
