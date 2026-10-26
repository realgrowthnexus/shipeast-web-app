import type { Account, SavedAddress } from '@/lib/account/types'

/**
 * PLACEHOLDER account for the preview site. Anyone can "sign in" with any email and password
 * and lands on this sample account. Changes last only in their browser for a day.
 */

export const demoAccount: Account = {
  id: 'demo-account',
  publicId: 'SE-CUS-7K4Q2M',
  role: 'customer',
  fullName: 'Chris Brown',
  email: 'sender@example.com',
  phone: null,
  emailUpdates: true,
  smsUpdates: true,
  createdAt: '2026-09-14T15:20:00Z',
  preview: true,
}

export const demoAddresses: SavedAddress[] = [
  {
    id: 'demo-address-mum',
    label: 'Mum — Morant Bay',
    recipientName: 'Marcia Campbell',
    phone: '1-876-555-0142',
    street: '12 Church Street',
    community: 'Morant Bay',
    parish: 'St. Thomas',
    landmark: 'Green gate opposite the parish church',
    notes: 'Call when you reach the gate. The dog is friendly.',
    isDefault: true,
  },
  {
    id: 'demo-address-auntie',
    label: 'Auntie Pat — Half Way Tree',
    recipientName: 'Patricia Brown',
    phone: '1-876-555-0198',
    street: '4 Eastwood Park Road',
    community: 'Half Way Tree',
    parish: 'Kingston',
    landmark: 'Blue house beside the pharmacy',
    notes: '',
    isDefault: false,
  },
]
