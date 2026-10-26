'use client'

import { useActionState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { describedBy, Field, Input, Select, Textarea } from '@/components/ui/field'
import { sendItemRequest, type RequestState } from './actions'

export function RequestForm({ zones }: { zones: { id: string; parish: string }[] }) {
  const [state, action, pending] = useActionState<RequestState, FormData>(sendItemRequest, {
    status: 'idle',
  })

  if (state.status === 'sent') {
    return (
      <Alert tone="ok" title="Request received">
        {state.preview
          ? 'This is a preview, so nothing was sent. Once the site is live, we reply with a price, usually the same day.'
          : 'We’ll check the stores and email you a price, usually the same day. You only pay once you accept it.'}
      </Alert>
    )
  }

  const errors = state.status === 'error' ? state.errors : {}
  const values = state.status === 'error' ? state.values : {}

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="item" label="What do you need?" error={errors.item} className="sm:col-span-2">
        <Input
          {...describedBy('item', errors.item)}
          name="item"
          defaultValue={values.item}
          required
        />
      </Field>
      <Field
        id="details"
        label="Brand and size"
        optional
        error={errors.details}
        className="sm:col-span-2"
      >
        <Textarea
          {...describedBy('details', errors.details)}
          name="details"
          rows={3}
          defaultValue={values.details}
        />
      </Field>
      <Field id="quantity" label="How many?" error={errors.quantity}>
        <Input
          {...describedBy('quantity', errors.quantity)}
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          max={50}
          defaultValue={values.quantity || '1'}
          required
        />
      </Field>
      <Field id="store" label="Store you prefer" optional error={errors.store}>
        <Input {...describedBy('store', errors.store)} name="store" defaultValue={values.store} />
      </Field>
      <Field
        id="budget"
        label="Most you want to spend"
        optional
        help="In US dollars"
        error={errors.budget}
      >
        <Input
          {...describedBy('budget', errors.budget)}
          name="budget"
          inputMode="decimal"
          defaultValue={values.budget}
        />
      </Field>
      <Field id="zoneId" label="Delivering to" error={errors.zoneId}>
        <Select
          {...describedBy('zoneId', errors.zoneId)}
          name="zoneId"
          defaultValue={values.zoneId ?? ''}
          required
        >
          <option value="" disabled>
            Choose a parish
          </option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.parish}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="name" label="Your name" error={errors.name}>
        <Input
          {...describedBy('name', errors.name)}
          name="name"
          autoComplete="name"
          defaultValue={values.name}
          required
        />
      </Field>
      <Field id="email" label="Your email" error={errors.email}>
        <Input
          {...describedBy('email', errors.email)}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          required
        />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" loading={pending}>
          Send request
        </Button>
      </div>
    </form>
  )
}
