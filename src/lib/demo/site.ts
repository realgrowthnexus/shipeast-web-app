import type { DeliveryZone, Faq, SiteSettings } from '@/lib/types'

/**
 * PLACEHOLDER settings, zones and FAQs. Fees, cut-offs, the exchange rate and contact numbers
 * are not confirmed by ShipEast yet (see docs/BRIEF.md, open items).
 */

export const settings: SiteSettings = {
  jmdPerUsd: 157,
  whatsapp: '1-876-000-0000',
  phone: '1-876-000-0000',
  email: 'info@shipeastja.com',
  bankTransferHoursToPay: 48,
  features: {
    monthly_orders: false,
    auto_offers: false,
    item_requests: false,
    cms: false,
    advanced_reports: false,
  },
}

/** Launch coverage is St. Thomas and Kingston; the other parishes exist but are switched off. */
const parishes: [
  parish: string,
  active: boolean,
  feeCents: number,
  speed: DeliveryZone['speed'],
][] = [
  ['St. Thomas', true, 800, 'same_day'],
  ['Kingston', true, 1000, 'same_day'],
  ['St. Andrew', false, 1000, 'same_day'],
  ['St. Catherine', false, 1200, 'next_day'],
  ['Clarendon', false, 1500, 'next_day'],
  ['Manchester', false, 1800, 'scheduled'],
  ['St. Elizabeth', false, 1800, 'scheduled'],
  ['Westmoreland', false, 2000, 'scheduled'],
  ['Hanover', false, 2000, 'scheduled'],
  ['St. James', false, 2000, 'scheduled'],
  ['Trelawny', false, 2000, 'scheduled'],
  ['St. Ann', false, 1800, 'scheduled'],
  ['St. Mary', false, 1800, 'scheduled'],
  ['Portland', false, 1500, 'scheduled'],
]

export const zones: DeliveryZone[] = parishes.map(([parish, active, feeCents, speed], i) => ({
  id: `zone-${i + 1}`,
  parish,
  active,
  feeCents,
  speed,
  cutoffTime: '13:00',
  minOrderCents: 2500,
  sort: i + 1,
}))

export const faqs: Faq[] = [
  {
    id: 'faq-1',
    group: 'Ordering',
    question: 'Does anything get shipped from overseas?',
    answer:
      'No. You pay online and our driver buys everything at a store in Jamaica, then delivers it the same day. Only the money crosses the border.',
    sort: 1,
  },
  {
    id: 'faq-2',
    group: 'Substitutions',
    question: 'What happens if an item is out of stock?',
    answer:
      'You choose at checkout: allow a similar item, have us ask you first, or leave it out and get a refund for it.',
    sort: 2,
  },
  {
    id: 'faq-3',
    group: 'Delivery',
    question: 'Where do you deliver?',
    answer: 'We deliver in St. Thomas and Kingston today, and we are adding more parishes soon.',
    sort: 3,
  },
  {
    id: 'faq-4',
    group: 'Delivery',
    question: 'How will I know it arrived?',
    answer:
      'You get a photo of the store receipt when we finish shopping and a photo at the door when we deliver, plus a tracking link you can share with family.',
    sort: 4,
  },
]
