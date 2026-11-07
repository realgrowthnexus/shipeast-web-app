import { photo, type StockPhoto } from './types'

/** Photos added for: Shop, category, basket and product pages. Key names must not clash with other photo files. */
export const shopPhotos = {
  shopCheckout: photo({
    unsplashId: 'm1c3tRvDjbo',
    src: 'https://images.unsplash.com/photo-1774978613949-c29cbfe9f862',
    width: 4000,
    height: 6000,
    alt: 'A cashier weighing groceries at a supermarket checkout',
    photographer: 'Adhitya Sibikumar',
    username: 'adhitya_2505',
    usedOn: 'Home page',
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
  basketsGiftWrap: photo({
    unsplashId: 'YSdaUaLopLQ',
    src: 'https://images.unsplash.com/photo-1758521542015-ceb80fb760ce',
    width: 3840,
    height: 2160,
    alt: 'A young woman smiling as she ties a ribbon on a gift box beside a Christmas tree',
    photographer: 'Vitaly Gariev',
    username: 'silverkblack',
    position: '35% 45%',
    usedOn: 'Baskets',
  }),
  shopChoosing: photo({
    unsplashId: '2mhqft65NIo',
    src: 'https://images.unsplash.com/photo-1527493324787-47372b893452',
    width: 5926,
    height: 3956,
    alt: 'A shopper choosing fresh vegetables from a market display',
    photographer: 'kevin laminto',
    username: 'kxvn_lx',
    position: '60% center',
    usedOn: 'Shop',
  }),
} satisfies Record<string, StockPhoto>
