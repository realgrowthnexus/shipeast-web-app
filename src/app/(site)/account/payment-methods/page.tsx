import { Building2, CreditCard, LockKeyhole, Wallet } from 'lucide-react'
import type { Metadata } from 'next'
import { AccountHeading } from '@/components/account/account-heading'

export const metadata: Metadata = { title: 'Payment' }

const methods = [
  {
    icon: Wallet,
    title: 'PayPal',
    body: 'Log in to PayPal at checkout and it remembers you, with whatever cards and bank accounts you keep there. Nothing to save here.',
  },
  {
    icon: CreditCard,
    title: 'Debit or credit card',
    body: 'Pay as a guest through PayPal, no PayPal account needed. Your card goes straight to PayPal; ShipEast never sees the number.',
  },
  {
    icon: Building2,
    title: 'Bank transfer',
    body: 'Choose it at checkout and we show our bank details and your order reference. We start shopping when the money arrives.',
  },
]

/**
 * There is nothing to manage yet: cards stay with PayPal. When the saved-cards add-on is
 * switched on, this page will list PayPal-vaulted cards instead.
 */
export default function PaymentMethodsPage() {
  return (
    <>
      <AccountHeading title="Payment">
        ShipEast doesn’t store cards. You choose how to pay each time you check out.
      </AccountHeading>
      <ul className="grid gap-4 md:grid-cols-3">
        {methods.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-card"
          >
            <span className="grid size-11 place-items-center rounded-md bg-surface-tint text-crimson">
              <Icon className="size-6" aria-hidden />
            </span>
            <h2 className="text-h3 text-ink">{title}</h2>
            <p className="text-ink-body">{body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex gap-2 text-small text-ink-muted">
        <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden />
        Payments are processed by PayPal or your bank. Card details never touch our servers.
      </p>
    </>
  )
}
