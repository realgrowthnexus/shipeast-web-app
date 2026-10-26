import type { OrderStatus, Role } from '@/lib/types'

/** The signed-in sender, from `profiles`. */
export interface Account {
  id: string
  /** SE-CUS-XXXXXX. Never changes, even when the name, email or phone does. */
  publicId: string
  role: Role
  fullName: string
  email: string
  phone: string | null
  emailUpdates: boolean
  smsUpdates: boolean
  createdAt: string
  /** True on the preview site, where nothing is saved to a database. */
  preview?: boolean
}

/** A saved family address ("Mum — Morant Bay"). */
export interface SavedAddress {
  id: string
  label: string
  recipientName: string
  phone: string
  street: string
  community: string
  parish: string
  landmark: string
  notes: string
  isDefault: boolean
}

/** One row on "My orders". */
export interface AccountOrder {
  orderNo: string
  token: string
  status: OrderStatus
  createdAt: string
  deliveryDate: string
  recipientName: string
  community: string
  parish: string
  totalCents: number
  itemCount: number
  itemNames: string[]
}

/** Orders still moving, shown first and on the account home. */
export const ACTIVE_STATUSES: OrderStatus[] = [
  'awaiting_payment',
  'paid',
  'confirmed',
  'awaiting_driver',
  'driver_assigned',
  'shopping',
  'shopped',
  'out_for_delivery',
  'failed_delivery',
]

export const isActive = (status: OrderStatus) => ACTIVE_STATUSES.includes(status)

/** First name for greetings: "Chris" from "Chris Brown". */
export const firstName = (account: Pick<Account, 'fullName'>) =>
  account.fullName.trim().split(/\s+/)[0] || 'there'

/** "Mum — Morant Bay", or the recipient and community when no label was given. */
export const addressTitle = (a: Pick<SavedAddress, 'label' | 'recipientName' | 'community'>) =>
  a.label || `${a.recipientName}, ${a.community}`
