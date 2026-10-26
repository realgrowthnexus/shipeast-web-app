/**
 * Every stock photo on the marketing site, in one place, so a photo can be swapped without
 * touching the pages and the credits page stays complete.
 *
 * All photos are from Unsplash under the Unsplash License (free for commercial use, no
 * permission needed). Each one was registered as a download through the Unsplash API, and we
 * hotlink images.unsplash.com as Unsplash asks. Never add PriceSmart's own photos here, and keep
 * product photos out: those come from ShipEast. See docs/PHOTOGRAPHY.md for the rules.
 */
export type StockPhoto = {
  /** Unsplash photo id, as in unsplash.com/photos/<id>. */
  unsplashId: string
  /** images.unsplash.com URL without query parameters. */
  src: string
  width: number
  height: number
  alt: string
  photographer: string
  /** Unsplash username, for the credit link. */
  username: string
  /** CSS object-position, when the subject is not in the middle. */
  position?: string
  /** Where the photo is used, for the credits page. */
  usedOn: string
}

const photo = (p: StockPhoto) => p

export const stockPhotos = {
  heroGroceries: photo({
    unsplashId: '8RaUEd8zD-U',
    src: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
    width: 4032,
    height: 3024,
    alt: 'Paper bags of groceries with fruit, vegetables and bread',
    photographer: 'Maria Lin Kim',
    username: 'mrsmaria',
    usedOn: 'Home page',
  }),
  stepOrder: photo({
    unsplashId: 'Gzk7Pf9uSJg',
    src: 'https://images.unsplash.com/photo-1758611974022-ca3182694951',
    width: 3840,
    height: 2160,
    alt: 'A woman on her sofa paying on her phone with a bank card',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    usedOn: 'Home page',
  }),
  stepFamily: photo({
    unsplashId: '659kXp4SQ4g',
    src: 'https://images.unsplash.com/photo-1758686254457-6aaca1ca78e0',
    width: 3840,
    height: 2160,
    alt: 'An older couple on a video call with their family',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    usedOn: 'Home page',
  }),
  stepShop: photo({
    unsplashId: 'mybgdVT2vkw',
    src: 'https://images.unsplash.com/photo-1739300293398-468ba82fd418',
    width: 3080,
    height: 2053,
    alt: 'A shopper pushing a trolley down a supermarket aisle',
    photographer: 'Ninthgrid',
    username: 'ninthgrid_',
    usedOn: 'Home page',
  }),
  stepDoor: photo({
    unsplashId: 'Kd27X69pYyo',
    src: 'https://images.unsplash.com/photo-1758523670564-d1d6a734dc0b',
    width: 3840,
    height: 2160,
    alt: 'A delivery handed over at the front door',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    usedOn: 'Home page',
  }),
  catGroceries: photo({
    unsplashId: 'NLU117HCVuc',
    src: 'https://images.unsplash.com/photo-1418669112725-fb499fb61127',
    width: 5616,
    height: 3744,
    alt: 'A basket of fresh produce',
    photographer: 'Leonie Wise',
    username: 'leoniewise',
    usedOn: 'Home page, shop',
  }),
  catHousehold: photo({
    unsplashId: 'DJcVOQUZxF0',
    src: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df',
    width: 5074,
    height: 3397,
    alt: 'Household cleaning supplies',
    photographer: 'Kelly Sikkema',
    username: 'kellysikkema',
    usedOn: 'Home page, shop',
  }),
  catPharmacy: photo({
    unsplashId: 'HTttz00wkzU',
    src: 'https://images.unsplash.com/photo-1543709533-c032159da7b0',
    width: 6000,
    height: 4000,
    alt: 'Pharmacy bottles',
    photographer: 'Haley Lawrence',
    username: 'whoishaleylawrence',
    usedOn: 'Home page, shop',
  }),
  catBaby: photo({
    unsplashId: 'QCVrp1uxCXs',
    src: 'https://images.unsplash.com/photo-1697751946232-8ad34bc4f0d8',
    width: 4016,
    height: 4016,
    alt: 'A baby in a nappy holding a teddy bear',
    photographer: 'Kat van der Linden',
    username: 'bibliokat',
    usedOn: 'Home page, shop',
  }),
  basketFood: photo({
    unsplashId: '-9TeWHMASzs',
    src: 'https://images.unsplash.com/photo-1792736945966-d0c23e426648',
    width: 6550,
    height: 4366,
    alt: 'Cloth bags full of fresh vegetables',
    photographer: 'Illia Bondar',
    username: 'viktoriiailliaphotography',
    usedOn: 'Baskets',
  }),
  basketBaby: photo({
    unsplashId: 'Jqhwp4mcuUM',
    src: 'https://images.unsplash.com/photo-1596034640116-a68045d257fe',
    width: 3712,
    height: 5568,
    alt: 'A newborn baby asleep',
    photographer: 'Kelly Sikkema',
    username: 'kellysikkema',
    position: 'center 40%',
    usedOn: 'Baskets',
  }),
  basketPharmacy: photo({
    unsplashId: 'FDvArkoGyvI',
    src: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba',
    width: 4320,
    height: 3456,
    alt: 'A bottle of tablets on a wooden table',
    photographer: 'Bruno Guerrero',
    username: 'pray4bokeh',
    usedOn: 'Baskets',
  }),
  basketChristmas: photo({
    unsplashId: 'SrnCpsp9sGY',
    src: 'https://images.unsplash.com/photo-1668432321756-5109ad1f5916',
    width: 4160,
    height: 6240,
    alt: 'A gift hamper beside a Christmas tree',
    photographer: 'Loo Chun Kang',
    username: 'loochunkang',
    usedOn: 'Baskets, gifts',
  }),
  whyFamily: photo({
    unsplashId: 'khLLtGplL8I',
    src: 'https://images.unsplash.com/photo-1640117743090-93ce4f4450dd',
    width: 6000,
    height: 4000,
    alt: 'A grandmother congratulating her granddaughter',
    photographer: 'Imani Manyara',
    username: 'imanimanyara',
    usedOn: 'Home page',
  }),
  kingston: photo({
    unsplashId: 'xoGK4R6bp4I',
    src: 'https://images.unsplash.com/photo-1680030229338-093c0f85f006',
    width: 2858,
    height: 3812,
    alt: 'Kingston from above, with the mountains behind',
    photographer: 'Russian Supreme',
    username: 'russian_supreme',
    usedOn: 'Home page',
  }),
  familyPhone: photo({
    unsplashId: 'FVd0tfV6NDk',
    src: 'https://images.unsplash.com/photo-1702648156997-eaa417d98b9e',
    width: 5591,
    height: 3721,
    alt: 'An older woman smiling on the phone at home',
    photographer: 'Centre for Ageing Better',
    username: 'ageing_better',
    usedOn: 'How it works',
  }),
  kingstonStreet: photo({
    unsplashId: '9R-WAl5UGWI',
    src: 'https://images.unsplash.com/photo-1595220524884-95d1df1857a9',
    width: 4480,
    height: 6604,
    alt: 'A street in downtown Kingston',
    photographer: 'Rock Staar',
    username: 'rockstaar_',
    usedOn: 'About',
  }),
  blueMountains: photo({
    unsplashId: 'r1nmJA6sXF8',
    src: 'https://images.unsplash.com/photo-1527017200692-2feca35f864f',
    width: 4368,
    height: 2912,
    alt: 'Mist over the Blue Mountains, Jamaica',
    photographer: 'Marc Babin',
    username: 'marcbabin',
    usedOn: 'Delivery',
  }),
  giftChristmas: photo({
    unsplashId: '2WyfCyP9lnY',
    src: 'https://images.unsplash.com/photo-1731964791215-ed423c927976',
    width: 4000,
    height: 6000,
    alt: 'Presents wrapped in brown paper under a Christmas tree',
    photographer: 'Aaron Oommen',
    username: 'aaron_the13th',
    usedOn: 'Gifts',
  }),
  giftBirthday: photo({
    unsplashId: 'd8s13D29QiE',
    src: 'https://images.unsplash.com/photo-1545696563-af8f6ec2295a',
    width: 3264,
    height: 4928,
    alt: 'Candles being lit on a birthday cake',
    photographer: 'Aneta Pawlik',
    username: 'anetakpawlik',
    usedOn: 'Gifts',
  }),
  giftSchool: photo({
    unsplashId: '02z1I7gv4ao',
    src: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78',
    width: 4032,
    height: 3024,
    alt: 'A school backpack and books',
    photographer: 'Matt Ragland',
    username: 'mattragland',
    usedOn: 'Gifts',
  }),
  giftBaby: photo({
    unsplashId: '_7nYEP6QcyY',
    src: 'https://images.unsplash.com/photo-1644418657862-4ec86e44d6dc',
    width: 6000,
    height: 4000,
    alt: 'A newborn baby asleep on a blanket',
    photographer: 'Kevin Watza',
    username: 'kubbers',
    usedOn: 'Gifts',
  }),
  pantry: photo({
    unsplashId: 'yLor6GEU2yw',
    src: 'https://images.unsplash.com/photo-1768875845344-5663fa9acf15',
    width: 2640,
    height: 3960,
    alt: 'A well-stocked pantry',
    photographer: 'Cabri Caldwell',
    username: 'minimizethenorganize',
    usedOn: 'Monthly orders',
  }),
  contactPhone: photo({
    unsplashId: 'aWY55S07SZg',
    src: 'https://images.unsplash.com/photo-1758611973513-eb1b46708e4a',
    width: 3840,
    height: 2160,
    alt: 'A woman smiling on a phone call at home',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    usedOn: 'Contact',
  }),
  staples: photo({
    unsplashId: 'KlEQHVJ6yYY',
    src: 'https://images.unsplash.com/photo-1709236550338-e2bcc3beee70',
    width: 3863,
    height: 3297,
    alt: 'Rice, beans and other dry goods in bags',
    photographer: 'Bernd Dittrich',
    username: 'hdbernd',
    usedOn: 'Request an item',
  }),
  emptyCart: photo({
    unsplashId: 'ziNwhCy0eJk',
    src: 'https://images.unsplash.com/photo-1685872204417-20c56c8ea070',
    width: 5219,
    height: 3479,
    alt: 'An empty shopping trolley by a red door',
    photographer: 'Yuri Krupenin',
    username: 'cubeofwood',
    usedOn: 'Page not found',
  }),
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
