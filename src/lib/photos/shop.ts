import { photo, type StockPhoto } from './types'

/** Photos added for: Shop, category, basket and product pages. Key names must not clash with other photo files. */
export const shopPhotos = {
  shopProduce: photo({
    unsplashId: 'pGOkewTZy78',
    src: 'https://images.unsplash.com/photo-1767710140657-eabe62707598',
    width: 7728,
    height: 4344,
    alt: 'Fresh fruit and vegetables laid out on a market display',
    photographer: 'CK Chen',
    username: 'chenkuochen',
    usedOn: 'Shop',
  }),
  shopCheckout: photo({
    unsplashId: 'm1c3tRvDjbo',
    src: 'https://images.unsplash.com/photo-1774978613949-c29cbfe9f862',
    width: 4000,
    height: 6000,
    alt: 'A cashier weighing groceries at a supermarket checkout',
    photographer: 'Adhitya Sibikumar',
    username: 'adhitya_2505',
    usedOn: 'Shop, Baskets',
  }),
  shopReceipt: photo({
    unsplashId: 'recgFWxDO1Y',
    src: 'https://images.unsplash.com/photo-1731686602391-7484df33a03c',
    width: 3335,
    height: 5000,
    alt: 'A printed till receipt lying on a wooden table',
    photographer: 'Annie Spratt',
    username: 'anniespratt',
    usedOn: 'Shop',
  }),
} satisfies Record<string, StockPhoto>
