import type { DeliveryZone, Faq, SiteSettings } from '@/lib/types'

/**
 * PLACEHOLDER settings, zones and FAQs. Fees, cut-offs, the exchange rate and contact numbers
 * are not confirmed by ShipEast yet (see docs/BRIEF.md, open items).
 */

export const settings: SiteSettings = {
  jmdPerUsd: 157,
  // Left empty until ShipEast confirms the numbers; WhatsApp links hide when empty.
  whatsapp: '',
  phone: '',
  email: 'info@shipeastja.com',
  bankTransferHoursToPay: 48,
  // Left empty: ShipEast hasn't confirmed the account. The bank transfer page says so.
  bankTransfer: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    branch: '',
    accountType: '',
    currency: 'USD',
    notes: '',
  },
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
    group: 'Ordering',
    question: 'Which stores do you shop at?',
    answer:
      'Well-known stores in Jamaica, such as PriceSmart. The receipt photo shows exactly where we shopped.',
    sort: 2,
  },
  {
    id: 'faq-3',
    group: 'Ordering',
    question: 'Can I add a gift message?',
    answer: 'Yes. Add one at checkout and we hand it over with the order.',
    sort: 3,
  },
  {
    id: 'faq-4',
    group: 'Payment',
    question: 'How do I pay?',
    answer:
      'By PayPal, by debit or credit card through PayPal, or by bank transfer. Prices are in US dollars, with the Jamaican dollar amount shown for reference.',
    sort: 4,
  },
  {
    id: 'faq-5',
    group: 'Payment',
    question: 'When do you start shopping for a bank transfer order?',
    answer:
      'As soon as the money arrives. Use your order number as the reference so we can match it.',
    sort: 5,
  },
  {
    id: 'faq-6',
    group: 'Substitutions',
    question: 'What happens if an item is out of stock?',
    answer:
      'You choose at checkout: allow a similar item, have us ask you first, or leave it out and get a refund for it.',
    sort: 6,
  },
  {
    id: 'faq-7',
    group: 'Delivery',
    question: 'Where do you deliver?',
    answer: 'We deliver in St. Thomas and Kingston today, and we are adding more parishes soon.',
    sort: 7,
  },
  {
    id: 'faq-8',
    group: 'Delivery',
    question: 'How will I know it arrived?',
    answer:
      'You get a photo of the store receipt when we finish shopping and a photo at the door when we deliver, plus a tracking link you can share with family.',
    sort: 8,
  },
  {
    id: 'faq-9',
    group: 'Delivery',
    question: 'Does my family need to install an app?',
    answer: 'No. They get a text when the driver is on the way and when the order is delivered.',
    sort: 9,
  },
  {
    id: 'faq-10',
    group: 'Refunds',
    question: 'Can I cancel my order?',
    answer: 'Yes, for a full refund, until our driver starts shopping.',
    sort: 10,
  },
  {
    id: 'faq-11',
    group: 'Account',
    question: 'Do I need an account to order?',
    answer:
      'No. You can check out as a guest. An account saves your family addresses and lets you send the same order again in one tap.',
    sort: 11,
  },
]
