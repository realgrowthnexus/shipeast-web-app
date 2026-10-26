/**
 * DRAFT policy wording, written from the proposal and scope so the pages can be designed and
 * reviewed. ShipEast (ideally with a lawyer) must approve every page before launch. The
 * admin panel replaces these once the `legal_pages` table is filled in.
 */

export interface LegalSection {
  heading: string
  body: string[]
}

export interface LegalPage {
  slug: string
  title: string
  summary: string
  updated: string
  draft: boolean
  sections: LegalSection[]
}

const company = 'ShipEast Couriers & Bearer Service Ltd'

export const legalPages: LegalPage[] = [
  {
    slug: 'terms',
    title: 'Terms of service',
    summary: 'The agreement between you and ShipEast when you place an order on Shop & Send.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'Who we are',
        body: [
          `Shop & Send is run by ${company}, a courier and errand service based in St. Thomas, Jamaica. "We" and "us" mean ${company}. "You" means the person placing the order, and "the recipient" means the person in Jamaica receiving it.`,
        ],
      },
      {
        heading: 'What we do for you',
        body: [
          'We act as your shopping agent. When you place an order, you ask us to buy the listed items on your behalf at a store in Jamaica and deliver them to the recipient. Nothing is shipped from overseas.',
          'We photograph the store receipt and take a photo at the door when we deliver, so you can see what was bought and that it arrived.',
        ],
      },
      {
        heading: 'Prices and payment',
        body: [
          'Prices are shown in US dollars, with an approximate Jamaican dollar amount for reference. The US dollar amount is what you pay. Store prices can change; we check our prices regularly and the price you see at checkout is the price you pay.',
          'You pay when you place the order, by PayPal, by debit or credit card processed by PayPal, or by bank transfer. We start shopping for bank transfer orders only after the money arrives.',
        ],
      },
      {
        heading: 'Out-of-stock items',
        body: [
          'At checkout you choose what we do if an item is out of stock: allow a similar item, ask you first, or leave it out and refund it. Our Substitution and out-of-stock policy explains each choice.',
        ],
      },
      {
        heading: 'Delivery',
        body: [
          'We deliver to the parishes listed on our Delivery page. Same-day delivery applies to orders placed before the cut-off time shown at checkout. Please give a correct phone number and a nearby landmark so our driver can find the recipient.',
        ],
      },
      {
        heading: 'Cancellations and refunds',
        body: [
          'You can cancel for a full refund until we start shopping. Our Refund and cancellation policy explains what happens after that, and how refunds for missing items work.',
        ],
      },
      {
        heading: 'Our responsibility',
        body: [
          'We take care to buy the right items and deliver them safely. We are not the manufacturer of the products we buy for you, and product warranties remain with the manufacturer or store.',
        ],
      },
      {
        heading: 'Contact',
        body: ['Questions about these terms: info@shipeastja.com.'],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    summary:
      'What information we collect about you and the recipient, why, and who we share it with.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'What we collect',
        body: [
          'About you: your name, email, phone number, order history and saved addresses. About the recipient: their name, phone number and delivery address, including any landmark or notes you give us.',
          'We do not store your card details. Card and PayPal payments are handled by PayPal.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'To shop for and deliver your order, to send you receipts and updates, to text the recipient when the driver is on the way and when the order is delivered, and to answer your questions.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'Our driver sees the recipient’s name, phone and address for the order they deliver. We use trusted service providers to run the site: PayPal for payments, Supabase for our database and photo storage, Resend for email and Twilio for text messages. They process data only to provide their service to us.',
          'We never sell your information.',
        ],
      },
      {
        heading: 'Text messages to the recipient',
        body: [
          'By giving us the recipient’s phone number, you confirm they are happy to receive delivery texts about this order.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep order records for as long as the law requires for accounting. You can delete your account and saved addresses at any time from your profile.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask to see, correct or delete the information we hold about you, in line with the Jamaica Data Protection Act. Email info@shipeastja.com.',
        ],
      },
    ],
  },
  {
    slug: 'refunds',
    title: 'Refund and cancellation policy',
    summary: 'When you can cancel, and how refunds work for missing items and failed deliveries.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'Cancelling an order',
        body: [
          'You can cancel for a full refund at any time before our driver starts shopping. Contact us with your order number. Once shopping has started, we can’t cancel the items already bought.',
        ],
      },
      {
        heading: 'Missing items',
        body: [
          'If an item is out of stock and you chose "Leave it out", or you asked us to ask first and decided not to swap, we refund that item’s price to your original payment method once the order is closed.',
        ],
      },
      {
        heading: 'Failed delivery',
        body: [
          'If we can’t reach the recipient, we contact you to arrange another delivery. If delivery isn’t possible, we explain the options, which may include a partial refund. Perishable items can’t be returned to the store.',
        ],
      },
      {
        heading: 'Damaged or wrong items',
        body: [
          'Tell us within 24 hours of delivery, with a photo if you can. We will replace the item or refund it.',
        ],
      },
      {
        heading: 'How long refunds take',
        body: [
          'PayPal and card refunds usually appear within 5 to 10 business days, depending on your bank. Bank transfer refunds are sent to the account you paid from.',
        ],
      },
    ],
  },
  {
    slug: 'substitutions',
    title: 'Substitution and out-of-stock policy',
    summary: 'What our driver does when something on your list isn’t on the shelf.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'You choose at checkout',
        body: [
          'Allow similar: the driver picks the closest match, the same kind of product at the same price or less. If it costs less, we refund the difference.',
          'Ask me first: we message you before swapping anything. If we don’t hear back in time, we leave the item out and refund it.',
          'Leave it out: we skip the item and refund it.',
        ],
      },
      {
        heading: 'What you see',
        body: [
          'Your tracking page marks every item as found, swapped or missing, and the receipt photo shows exactly what was bought.',
        ],
      },
    ],
  },
  {
    slug: 'delivery',
    title: 'Delivery policy',
    summary: 'Where we deliver, cut-off times, and what happens if nobody is home.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'Where we deliver',
        body: [
          'We currently deliver in St. Thomas and Kingston. Our Delivery page lists each area, its fee and its cut-off time, and we are adding more parishes.',
        ],
      },
      {
        heading: 'Same-day delivery',
        body: [
          'Orders paid before the cut-off time are delivered the same day. Later orders are delivered the next day. Bank transfer orders are scheduled once the money arrives.',
        ],
      },
      {
        heading: 'Finding the recipient',
        body: [
          'Please give the street, community, parish and a nearby landmark, plus a phone number the driver can call. The recipient gets a text when the driver is on the way.',
        ],
      },
      {
        heading: 'If nobody is home',
        body: [
          'The driver calls the recipient and waits a reasonable time. If they can’t deliver, we contact you to arrange another attempt.',
        ],
      },
      {
        heading: 'Proof of delivery',
        body: [
          'The driver takes a photo at the door and records who received the order. You see both on your tracking page.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie notice',
    summary: 'The small files our site stores in your browser, and your choices.',
    updated: '2026-10-25',
    draft: true,
    sections: [
      {
        heading: 'Essential cookies',
        body: [
          'These keep your basket, sign-in and cookie choice working. The site can’t work without them, so they are always on.',
        ],
      },
      {
        heading: 'Analytics cookies',
        body: [
          'With your permission, we count visits and see which pages are used so we can improve the site. We only set these if you choose "Allow all".',
        ],
      },
      {
        heading: 'Changing your choice',
        body: [
          'Clear this site’s cookies in your browser and we will ask again on your next visit.',
        ],
      },
    ],
  },
]
