/** Fixed facts about the business. Editable contact details live in the `settings` table. */
export const site = {
  name: 'ShipEast Shop & Send',
  company: 'ShipEast Couriers & Bearer Service Ltd',
  url: 'https://shipeastja.com',
  email: 'info@shipeastja.com',
  description:
    'Buy groceries, household, pharmacy and baby items for family in Jamaica. We shop locally and deliver the same day, with a photo of the receipt and a photo at the door.',
  /** Tax registration number. Hidden until ShipEast provides it. */
  trn: null as string | null,
  /** Registered office address, lines separated by newlines. Hidden until ShipEast provides it. */
  registeredAddress: null as string | null,
} as const
