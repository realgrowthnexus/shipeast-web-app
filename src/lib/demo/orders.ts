import type { SenderOrder } from '@/lib/orders/types'

/**
 * PLACEHOLDER orders so the tracking pages can be reviewed in demo mode. Names, times and
 * amounts are made up and never shown once the site is live. Open them at /track/<token>.
 */

const items: SenderOrder['items'] = [
  {
    name: 'Long Grain Rice',
    size: '10 lb bag',
    quantity: 1,
    unitPriceCents: 1450,
    outcome: 'found',
    substituteNote: null,
    refundCents: 0,
  },
  {
    name: 'Vegetable Cooking Oil',
    size: '1 gallon',
    quantity: 1,
    unitPriceCents: 1325,
    outcome: 'found',
    substituteNote: null,
    refundCents: 0,
  },
  {
    name: 'Corned Beef',
    size: '12 oz can',
    quantity: 2,
    unitPriceCents: 475,
    outcome: 'substituted',
    substituteNote: 'Same size, different brand',
    refundCents: 0,
  },
  {
    name: 'Evaporated Milk',
    size: '12 oz can, 12 pack',
    quantity: 1,
    unitPriceCents: 1590,
    outcome: 'missing',
    substituteNote: null,
    refundCents: 1590,
  },
]

const base: Omit<SenderOrder, 'orderNo' | 'token' | 'status' | 'events' | 'photos'> = {
  paymentMethod: 'paypal',
  paymentStatus: 'captured',
  senderEmail: 'sender@example.com',
  recipientName: 'Marcia Campbell',
  community: 'Morant Bay',
  parish: 'St. Thomas',
  deliveryDate: '2026-10-25',
  substitutionRule: 'allow_similar',
  giftMessage: 'Happy birthday, Mama. Love from all of us in Toronto.',
  subtotalCents: 5315,
  deliveryFeeCents: 800,
  discountCents: 0,
  totalCents: 6115,
  jmdPerUsd: 157,
  receiptTotalCents: null,
  receiverName: null,
  driverFirstName: 'Devon',
  createdAt: '2026-10-25T13:58:00Z',
  paidAt: '2026-10-25T13:58:30Z',
  deliveredAt: null,
  items,
  preview: true,
}

const at = (time: string) => `2026-10-25T${time}:00Z`

export const demoOrders: SenderOrder[] = [
  {
    ...base,
    orderNo: 'SE-10428',
    token: 'demo-out-for-delivery-3f9a7c21b4d86e05',
    status: 'out_for_delivery',
    receiptTotalCents: 3725,
    events: [
      { status: 'paid', at: at('13:58') },
      { status: 'confirmed', at: at('14:05') },
      { status: 'driver_assigned', at: at('14:20') },
      { status: 'shopping', at: at('15:10') },
      { status: 'shopped', at: at('15:42') },
      { status: 'out_for_delivery', at: at('15:55') },
    ],
    photos: { receipt: null, door: null },
  },
  {
    ...base,
    orderNo: 'SE-10421',
    token: 'demo-delivered-8b2e4d10c7a95f36',
    status: 'delivered',
    receiptTotalCents: 3725,
    receiverName: 'Marcia Campbell',
    deliveredAt: at('16:40'),
    events: [
      { status: 'paid', at: at('13:58') },
      { status: 'confirmed', at: at('14:05') },
      { status: 'driver_assigned', at: at('14:20') },
      { status: 'shopping', at: at('15:10') },
      { status: 'shopped', at: at('15:42') },
      { status: 'out_for_delivery', at: at('15:55') },
      { status: 'delivered', at: at('16:40') },
    ],
    photos: { receipt: null, door: null },
  },
  {
    ...base,
    orderNo: 'SE-10433',
    token: 'demo-awaiting-transfer-51c0e7a2d9b4f863',
    status: 'awaiting_payment',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    paidAt: null,
    driverFirstName: null,
    deliveryDate: '2026-10-26',
    items: items.map((i) => ({ ...i, outcome: 'pending', substituteNote: null, refundCents: 0 })),
    events: [{ status: 'awaiting_payment', at: at('17:12') }],
    photos: { receipt: null, door: null },
  },
]
