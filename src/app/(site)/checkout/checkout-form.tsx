'use client'

import { Building2, CreditCard, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useState, type ReactNode } from 'react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Checkbox,
  ChoiceGroup,
  describedBy,
  Field,
  Input,
  PhoneInput,
  Select,
  Textarea,
} from '@/components/ui/field'
import { addressTitle, type SavedAddress } from '@/lib/account/types'
import type { DeliveryOption } from '@/lib/orders/delivery'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import type { PaymentMethod } from '@/lib/types'
import { placeOrderAction, type CheckoutState } from './actions'

const PAYMENT_OPTIONS: Record<
  PaymentMethod,
  { title: string; description: string; icon: ReactNode }
> = {
  paypal: {
    title: 'PayPal',
    description: 'Pay with your PayPal account.',
    icon: <Wallet className="size-4 text-crimson" aria-hidden />,
  },
  card: {
    title: 'Debit or credit card',
    description: 'Processed securely by PayPal. No PayPal account needed.',
    icon: <CreditCard className="size-4 text-crimson" aria-hidden />,
  },
  bank_transfer: {
    title: 'Bank transfer',
    description: 'We start shopping once the money arrives, usually within 1 to 2 working days.',
    icon: <Building2 className="size-4 text-crimson" aria-hidden />,
  },
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`step-${n}`}
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-card-lg"
    >
      <h2 id={`step-${n}`} className="flex items-center gap-3 text-h3 text-ink">
        <span className="grid size-8 place-items-center rounded-full bg-crimson text-body text-white">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

/** The recipient fields a saved address fills in. */
function fromAddress(a: SavedAddress | undefined): Record<string, string> {
  if (!a) return {}
  return {
    recipientName: a.recipientName,
    recipientPhone: a.phone,
    street: a.street,
    community: a.community,
    landmark: a.landmark,
    deliveryNotes: a.notes,
  }
}

export function CheckoutForm({
  parish,
  deliveryDays,
  paymentMethods,
  totalLabel,
  sender,
  addresses,
  otherParishAddresses = 0,
}: {
  parish: string
  deliveryDays: DeliveryOption[]
  paymentMethods: PaymentMethod[]
  totalLabel: string
  /** The signed-in sender, to fill in step 3. Null for guests. */
  sender: { fullName: string; email: string; phone: string | null } | null
  /** Saved family addresses in this parish. */
  addresses: SavedAddress[]
  /** Saved addresses that can't be used because they're in another parish. */
  otherParishAddresses?: number
}) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrderAction, {
    status: 'idle',
  })
  const errors = state.status === 'error' ? state.errors : {}
  const v = state.status === 'error' ? state.values : {}

  // Picking a saved address refills the recipient fields. After a failed submit, the values
  // the sender typed win until they pick again.
  const [selected, setSelected] = useState(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? '',
  )
  const [pickedAt, setPickedAt] = useState<CheckoutState | null>(null)
  const fresh = pickedAt === state
  const r =
    state.status === 'error' && !fresh ? v : fromAddress(addresses.find((a) => a.id === selected))

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.status === 'error' && state.message && (
        <Alert
          tone="danger"
          title={state.message}
          action={
            state.message.includes('basket') ? (
              <Link
                href="/basket"
                className="font-semibold text-crimson underline underline-offset-2"
              >
                Go to your basket
              </Link>
            ) : undefined
          }
        />
      )}

      <Step n={1} title="Who is receiving it?">
        {addresses.length > 0 && (
          <Field
            id="savedAddressId"
            label="Send to"
            help="Pick someone you’ve saved, or add someone new."
          >
            <Select
              id="savedAddressId"
              name="savedAddressId"
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value)
                setPickedAt(state)
              }}
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {addressTitle(a)}
                </option>
              ))}
              <option value="">Someone new</option>
            </Select>
          </Field>
        )}
        {!sender && (
          <p className="text-small text-ink-muted">
            Sent with us before?{' '}
            <Link
              href="/signin?next=%2Fcheckout"
              className="font-semibold text-crimson underline-offset-2 hover:underline"
            >
              Sign in
            </Link>{' '}
            to use your saved family addresses.
          </p>
        )}
        {sender && !addresses.length && otherParishAddresses > 0 && (
          <p className="text-small text-ink-muted">
            Your saved addresses are in other parishes. To use one, change the parish in your
            basket.
          </p>
        )}
        <div key={`${selected}-${fresh}`} className="grid gap-5 sm:grid-cols-2">
          <Field id="recipientName" label="Their full name" error={errors.recipientName}>
            <Input
              {...describedBy('recipientName', errors.recipientName)}
              name="recipientName"
              autoComplete="off"
              defaultValue={r.recipientName}
              required
            />
          </Field>
          <Field
            id="recipientPhone"
            label="Their phone in Jamaica"
            help="We text them when the driver is on the way."
            error={errors.recipientPhone}
          >
            <PhoneInput
              {...describedBy('recipientPhone', errors.recipientPhone)}
              name="recipientPhone"
              autoComplete="off"
              defaultValue={r.recipientPhone}
              required
            />
          </Field>
          <Field id="street" label="Street address" error={errors.street} className="sm:col-span-2">
            <Input
              {...describedBy('street', errors.street)}
              name="street"
              autoComplete="off"
              defaultValue={r.street}
              required
            />
          </Field>
          <Field id="community" label="Community or district" error={errors.community}>
            <Input
              {...describedBy('community', errors.community)}
              name="community"
              autoComplete="off"
              defaultValue={r.community}
              required
            />
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-small font-semibold text-ink">Parish</span>
            <p className="flex min-h-12 items-center justify-between gap-3 rounded-md border-2 border-line bg-canvas px-4 text-ink">
              {parish}
              <Link
                href="/basket"
                className="text-small font-semibold text-crimson underline-offset-2 hover:underline"
              >
                Change
              </Link>
            </p>
          </div>
          <Field
            id="landmark"
            label="Nearby landmark"
            help="Many roads have no numbers, so this is how the driver finds the house."
            error={errors.landmark}
            className="sm:col-span-2"
          >
            <Input
              {...describedBy('landmark', errors.landmark)}
              name="landmark"
              placeholder="Opposite the church, blue gate"
              defaultValue={r.landmark}
              required
            />
          </Field>
          <Field
            id="deliveryNotes"
            label="Notes for the driver"
            optional
            error={errors.deliveryNotes}
            className="sm:col-span-2"
          >
            <Textarea
              {...describedBy('deliveryNotes', errors.deliveryNotes)}
              name="deliveryNotes"
              rows={2}
              defaultValue={r.deliveryNotes}
            />
          </Field>
          {sender && !selected && (
            <Checkbox
              name="saveAddress"
              defaultChecked
              className="sm:col-span-2"
              label="Save this address to my account for next time"
            />
          )}
        </div>
      </Step>

      <Step n={2} title="Delivery and substitutions">
        <ChoiceGroup
          name="deliveryDate"
          legend="Delivery day"
          columns={3}
          defaultValue={v.deliveryDate || deliveryDays[0]?.date}
          error={errors.deliveryDate}
          options={deliveryDays.map((d) => ({
            value: d.date,
            title: d.day,
            description: d.sameDay ? `${d.dateLabel}, same day` : d.dateLabel,
          }))}
        />
        <ChoiceGroup
          name="substitutionRule"
          legend="If an item is out of stock"
          defaultValue={v.substitutionRule || 'allow_similar'}
          error={errors.substitutionRule}
          options={SUBSTITUTION_RULES.map((r) => ({
            value: r.value,
            title: r.title,
            description: r.body,
          }))}
        />
        <Field
          id="giftMessage"
          label="Gift message"
          optional
          help="We print it and hand it over with the order. Up to 250 characters."
          error={errors.giftMessage}
        >
          <Textarea
            {...describedBy('giftMessage', errors.giftMessage)}
            name="giftMessage"
            rows={3}
            maxLength={250}
            defaultValue={v.giftMessage}
          />
        </Field>
      </Step>

      <Step n={3} title="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="senderName" label="Your name" error={errors.senderName}>
            <Input
              {...describedBy('senderName', errors.senderName)}
              name="senderName"
              autoComplete="name"
              defaultValue={v.senderName ?? sender?.fullName}
              required
            />
          </Field>
          <Field
            id="senderEmail"
            label="Your email"
            help="Your receipt and tracking link go here."
            error={errors.senderEmail}
          >
            <Input
              {...describedBy('senderEmail', errors.senderEmail)}
              name="senderEmail"
              type="email"
              autoComplete="email"
              defaultValue={v.senderEmail ?? sender?.email}
              required
            />
          </Field>
          <Field
            id="senderPhone"
            label="Your phone"
            optional
            help="Any country. Only if we need to reach you about this order."
            error={errors.senderPhone}
          >
            <Input
              {...describedBy('senderPhone', errors.senderPhone)}
              name="senderPhone"
              type="tel"
              autoComplete="tel"
              defaultValue={v.senderPhone ?? sender?.phone ?? undefined}
            />
          </Field>
        </div>
      </Step>

      <Step n={4} title="Payment">
        {paymentMethods.length ? (
          <ChoiceGroup
            name="paymentMethod"
            legend="How do you want to pay?"
            defaultValue={v.paymentMethod || paymentMethods[0]}
            error={errors.paymentMethod}
            options={paymentMethods.map((m) => ({ value: m, ...PAYMENT_OPTIONS[m] }))}
          />
        ) : (
          <Alert tone="warn" title="Payments aren’t switched on yet">
            You can’t place an order right now. Please try again soon.
          </Alert>
        )}
        <div>
          <Checkbox
            name="terms"
            defaultChecked={v.terms === 'on'}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? 'terms-error' : undefined}
            label={
              <>
                I agree to the{' '}
                <Link
                  href="/legal/terms"
                  className="font-semibold text-crimson underline underline-offset-2"
                  target="_blank"
                >
                  terms of service
                </Link>{' '}
                and the{' '}
                <Link
                  href="/legal/refunds"
                  className="font-semibold text-crimson underline underline-offset-2"
                  target="_blank"
                >
                  refund policy
                </Link>
                .
              </>
            }
          />
          {errors.terms && (
            <p id="terms-error" className="text-small font-medium text-danger">
              {errors.terms}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" block loading={pending} disabled={!paymentMethods.length}>
          Place order, {totalLabel}
        </Button>
        <p className="text-center text-small text-ink-muted">
          You pay on the next page. We start shopping once payment is confirmed.
        </p>
      </Step>
    </form>
  )
}
