import type { PromoCode } from '@/lib/types'

/**
 * PLACEHOLDER promo codes so the basket can be tested. ShipEast sets the real ones in the admin
 * panel; none of these are offers to customers.
 */
export const promos: PromoCode[] = [
  {
    code: 'WELCOME5',
    description: 'US$5 off a first order of US$40 or more',
    percentOff: null,
    amountOffCents: 500,
    minOrderCents: 4000,
    startsAt: null,
    endsAt: null,
    active: true,
  },
  {
    code: 'FAMILY10',
    description: '10% off groceries for the family',
    percentOff: 10,
    amountOffCents: null,
    minOrderCents: 0,
    startsAt: null,
    endsAt: null,
    active: true,
  },
  {
    code: 'SUMMER25',
    description: 'Ended summer offer',
    percentOff: 25,
    amountOffCents: null,
    minOrderCents: 0,
    startsAt: '2026-06-01T05:00:00Z',
    endsAt: '2026-08-31T05:00:00Z',
    active: true,
  },
]
