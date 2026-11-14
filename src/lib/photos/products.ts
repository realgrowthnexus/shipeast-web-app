import { photo, type StockPhoto } from './types'

/**
 * Stock photos of the products themselves, keyed by product slug, shown until ShipEast uploads
 * its own product photos (an uploaded photo always wins). Each one shows that exact item; a
 * product with no true match keeps the placeholder. Flour, sugar, oil, oats, coffee, dish soap
 * and bleach went back to the placeholder in photos v2 (Nov 14, 2026): their mood photos clashed
 * with the client's pack shots.
 */
export const productPhotos: Record<string, StockPhoto> = {
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  'long-grain-rice-10lb': photo({
    unsplashId: 'wGDGlVxEE20',
    src: 'https://images.unsplash.com/photo-1705147289789-6df2593f1b1e',
    width: 6194,
    height: 4130,
    alt: 'A glass bowl of uncooked white rice on a white table',
    photographer: 'Mehmet Keskin',
    username: 'keskinlerinmehmet',
    usedOn: 'Shop',
  }),
  'toilet-paper-30': photo({
    unsplashId: 'gSdhs5DJ1bg',
    src: 'https://images.unsplash.com/photo-1585690359409-9020f3602bdb',
    width: 5555,
    height: 3708,
    alt: 'Three rolls of white toilet paper on a white table',
    photographer: 'Anastasiia Chepinska',
    username: 'anastasiiachepinska',
    usedOn: 'Shop',
  }),
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  'laundry-detergent-150oz': photo({
    unsplashId: '9wCOqpBJRHI',
    src: 'https://images.unsplash.com/photo-1649005011845-ef225c89da86',
    width: 2507,
    height: 2505,
    alt: 'A plain white laundry detergent jug with a handle (a 3D render)',
    photographer: 'Sufyan',
    username: 'blenderdesigner',
    usedOn: 'Shop',
  }),
  'pain-relief-tablets': photo({
    unsplashId: 'kdgiNc0sDeI',
    src: 'https://images.unsplash.com/photo-1588718889344-f7bd7a565d20',
    width: 4752,
    height: 3168,
    alt: 'White acetaminophen tablets on a brown surface',
    photographer: 'James Yarema',
    username: 'jamesyarema',
    usedOn: 'Shop',
  }),
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  'multivitamin-adult': photo({
    unsplashId: 'kxblPqfYc9E',
    src: 'https://images.unsplash.com/photo-1544991936-9464fa9919d2',
    width: 6000,
    height: 4000,
    alt: 'Capsules beside an open glass jar on pale grey',
    photographer: 'Pawel Czerwinski',
    username: 'pawel_czerwinski',
    usedOn: 'Shop',
  }),
  // Photos v2. Download registered through the Unsplash API on November 14, 2026.
  'first-aid-kit': photo({
    unsplashId: 'j-ped4HD32Q',
    src: 'https://images.unsplash.com/photo-1563260324-5ebeedc8af7c',
    width: 4032,
    height: 3024,
    alt: 'An orange first aid case on a light table',
    photographer: 'Ploegerson',
    username: 'boombasti',
    usedOn: 'Shop',
  }),
  'hand-sanitiser-2pk': photo({
    unsplashId: 'tAZElyZEm40',
    src: 'https://images.unsplash.com/photo-1608564348103-2b78891150cf',
    width: 4953,
    height: 3872,
    alt: 'A bottle of hand sanitising gel on a white background',
    photographer: 'Neil Bates',
    username: 'ngbates',
    usedOn: 'Shop',
  }),
}
