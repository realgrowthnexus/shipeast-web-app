import type { Basket, Category, Product } from '@/lib/types'

/**
 * PLACEHOLDER catalogue for building and reviewing layouts. Names are generic and prices are
 * made up; the real PriceSmart list, markup and photos come from ShipEast later. Never copy
 * PriceSmart's own images.
 */

export const categories: Category[] = [
  {
    id: 'cat-groceries',
    slug: 'groceries',
    name: 'Groceries',
    description: 'Pantry staples, breakfast, drinks and snacks.',
    sort: 1,
  },
  {
    id: 'cat-household',
    slug: 'household',
    name: 'Household',
    description: 'Cleaning, laundry, paper goods and kitchen basics.',
    sort: 2,
  },
  {
    id: 'cat-pharmacy',
    slug: 'pharmacy',
    name: 'Pharmacy',
    description: 'Over-the-counter care, vitamins and first aid.',
    sort: 3,
  },
  {
    id: 'cat-baby',
    slug: 'baby-and-child',
    name: 'Baby & Child',
    description: 'Diapers, wipes, formula and baby care.',
    sort: 4,
  },
]

type Seed = [
  slug: string,
  name: string,
  size: string,
  category: string,
  cents: number,
  extra?: Partial<Product>,
]

const seeds: Seed[] = [
  [
    'long-grain-rice-10lb',
    'Long Grain Rice',
    '10 lb bag',
    'cat-groceries',
    1450,
    { featured: true },
  ],
  ['all-purpose-flour-5lb', 'All-Purpose Flour', '5 lb bag', 'cat-groceries', 650],
  ['granulated-sugar-4lb', 'Granulated Sugar', '4 lb bag', 'cat-groceries', 575],
  [
    'vegetable-oil-1gal',
    'Vegetable Cooking Oil',
    '1 gallon',
    'cat-groceries',
    1325,
    { featured: true },
  ],
  ['rolled-oats-42oz', 'Rolled Oats', '42 oz canister', 'cat-groceries', 825],
  ['corned-beef-12oz', 'Corned Beef', '12 oz can', 'cat-groceries', 475],
  [
    'mackerel-in-tomato-sauce',
    'Mackerel in Tomato Sauce',
    '15 oz can, 3 pack',
    'cat-groceries',
    690,
  ],
  ['evaporated-milk-12pk', 'Evaporated Milk', '12 oz can, 12 pack', 'cat-groceries', 1590],
  [
    'ground-coffee-24oz',
    'Ground Coffee',
    '24 oz bag',
    'cat-groceries',
    1890,
    { status: 'out_of_stock' },
  ],
  [
    'laundry-detergent-150oz',
    'Laundry Detergent',
    '150 fl oz',
    'cat-household',
    1975,
    { featured: true },
  ],
  ['dish-soap-3pk', 'Dish Soap', '28 fl oz, 3 pack', 'cat-household', 990],
  ['toilet-paper-30', 'Toilet Paper', '30 double rolls', 'cat-household', 2450],
  ['paper-towels-12', 'Paper Towels', '12 rolls', 'cat-household', 2190],
  ['bleach-2pk', 'Household Bleach', '121 fl oz, 2 pack', 'cat-household', 1150],
  [
    'pain-relief-tablets',
    'Pain Relief Tablets',
    '500 mg, 200 count',
    'cat-pharmacy',
    1280,
    { featured: true },
  ],
  ['multivitamin-adult', 'Adult Multivitamin', '300 tablets', 'cat-pharmacy', 1890],
  ['first-aid-kit', 'First Aid Kit', '160 pieces', 'cat-pharmacy', 2200],
  ['hand-sanitiser-2pk', 'Hand Sanitiser', '33.8 fl oz, 2 pack', 'cat-pharmacy', 1050],
  ['diapers-size-3', 'Baby Diapers, Size 3', '168 count', 'cat-baby', 4290, { featured: true }],
  ['baby-wipes-900', 'Baby Wipes', '900 count', 'cat-baby', 2390],
  ['infant-formula', 'Infant Formula', '48 oz tub', 'cat-baby', 4590],
  ['baby-lotion', 'Baby Lotion', '27 fl oz, 2 pack', 'cat-baby', 1490],
]

export const products: Product[] = seeds.map(
  ([slug, name, size, categoryId, priceCents, extra], i) => ({
    id: `prd-${i + 1}`,
    slug,
    name,
    size,
    description: `${name}, ${size}. Bought fresh at a store in Jamaica on the day we deliver.`,
    categoryId,
    priceCents,
    status: 'visible',
    imagePath: null,
    priceCheckedAt: '2026-10-20T15:00:00Z',
    featured: false,
    ...extra,
  }),
)

const id = (slug: string) => {
  const product = products.find((p) => p.slug === slug)
  if (!product) throw new Error(`Unknown demo product: ${slug}`)
  return product.id
}

export const baskets: Basket[] = [
  {
    id: 'bsk-family-food',
    slug: 'family-food-basket',
    name: 'Family Food Basket',
    description: 'A week of pantry staples for a family of four.',
    priceCents: 6900,
    occasion: 'everyday',
    featured: true,
    imagePath: null,
    items: [
      { productId: id('long-grain-rice-10lb'), quantity: 1 },
      { productId: id('all-purpose-flour-5lb'), quantity: 1 },
      { productId: id('granulated-sugar-4lb'), quantity: 1 },
      { productId: id('vegetable-oil-1gal'), quantity: 1 },
      { productId: id('corned-beef-12oz'), quantity: 2 },
      { productId: id('mackerel-in-tomato-sauce'), quantity: 2 },
      { productId: id('evaporated-milk-12pk'), quantity: 1 },
    ],
  },
  {
    id: 'bsk-baby-care',
    slug: 'baby-care-pack',
    name: 'Baby Care Pack',
    description: 'Diapers, wipes and formula for the month.',
    priceCents: 10900,
    occasion: 'baby',
    featured: true,
    imagePath: null,
    items: [
      { productId: id('diapers-size-3'), quantity: 1 },
      { productId: id('baby-wipes-900'), quantity: 1 },
      { productId: id('infant-formula'), quantity: 1 },
      { productId: id('baby-lotion'), quantity: 1 },
    ],
  },
  {
    id: 'bsk-pharmacy',
    slug: 'pharmacy-pack',
    name: 'Pharmacy Pack',
    description: 'Everyday medicine cabinet basics.',
    priceCents: 5900,
    occasion: 'pharmacy',
    featured: false,
    imagePath: null,
    items: [
      { productId: id('pain-relief-tablets'), quantity: 1 },
      { productId: id('multivitamin-adult'), quantity: 1 },
      { productId: id('first-aid-kit'), quantity: 1 },
      { productId: id('hand-sanitiser-2pk'), quantity: 1 },
    ],
  },
  {
    id: 'bsk-christmas',
    slug: 'christmas-hamper',
    name: 'Christmas Hamper',
    description: 'Festive staples with a printed gift message.',
    priceCents: 4900,
    occasion: 'christmas',
    featured: true,
    imagePath: null,
    items: [
      { productId: id('ground-coffee-24oz'), quantity: 1 },
      { productId: id('evaporated-milk-12pk'), quantity: 1 },
      { productId: id('granulated-sugar-4lb'), quantity: 1 },
      { productId: id('all-purpose-flour-5lb'), quantity: 1 },
      { productId: id('rolled-oats-42oz'), quantity: 1 },
    ],
  },
]
