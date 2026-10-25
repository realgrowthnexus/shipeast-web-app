'use client'

import { Building2, CreditCard, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useActionState, type ReactNode } from 'react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Checkbox,
  ChoiceGroup,
  describedBy,
  Field,
  Input,
  PhoneInput,
  Textarea,
} from '@/components/ui/field'
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
      className="flex flex-col gap-5 rounded-lg border border-line bg-blush-100 p-5 sm:p-6"
    >
      <h2 id={`step-${n}`} className="flex items-center gap-3 text-xl font-extrabold text-ink">
        <span className="grid size-8 place-items-center rounded-full bg-crimson text-base text-white">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function CheckoutForm({
  parish,
  deliveryDays,
  paymentMethods,
  totalLabel,
}: {
  parish: string
  deliveryDays: DeliveryOption[]
  paymentMethods: PaymentMethod[]
  totalLabel: string
}) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrderAction, {
    status: 'idle',
  })
  const errors = state.status === 'error' ? state.errors : {}
  const v = state.status === 'error' ? state.values : {}

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
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="recipientName" label="Their full name" error={errors.recipientName}>
            <Input
              {...describedBy('recipientName', errors.recipientName)}
              name="recipientName"
              autoComplete="off"
              defaultValue={v.recipientName}
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
              defaultValue={v.recipientPhone}
              required
            />
          </Field>
          <Field id="street" label="Street address" error={errors.street} className="sm:col-span-2">
            <Input
              {...describedBy('street', errors.street)}
              name="street"
              autoComplete="off"
              defaultValue={v.street}
              required
            />
          </Field>
          <Field id="community" label="Community or district" error={errors.community}>
            <Input
              {...describedBy('community', errors.community)}
              name="community"
              autoComplete="off"
              defaultValue={v.community}
              required
            />
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">Parish</span>
            <p className="flex min-h-12 items-center justify-between gap-3 rounded-md border-2 border-line bg-blush-50 px-4 text-ink">
              {parish}
              <Link
                href="/basket"
                className="text-sm font-semibold text-crimson underline-offset-2 hover:underline"
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
              defaultValue={v.landmark}
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
              defaultValue={v.deliveryNotes}
            />
          </Field>
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
              defaultValue={v.senderName}
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
              defaultValue={v.senderEmail}
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
              defaultValue={v.senderPhone}
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
            <p id="terms-error" className="text-sm font-medium text-danger">
              {errors.terms}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" block loading={pending} disabled={!paymentMethods.length}>
          Place order, {totalLabel}
        </Button>
        <p className="text-center text-sm text-ink-muted">
          You pay on the next page. We start shopping once payment is confirmed.
        </p>
      </Step>
    </form>
  )
}
