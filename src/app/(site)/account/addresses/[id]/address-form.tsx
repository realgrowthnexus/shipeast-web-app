'use client'

import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { Button, ButtonLink } from '@/components/ui/button'
import {
  Checkbox,
  describedBy,
  Field,
  Input,
  PhoneInput,
  Select,
  Textarea,
} from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import type { SavedAddress } from '@/lib/account/types'
import { saveAddressAction } from '../../actions'

export function AddressForm({
  address,
  parishes,
  next,
}: {
  address: SavedAddress | null
  parishes: string[]
  next?: 'checkout'
}) {
  const [state, action, pending] = useActionState(saveAddressAction, idle)
  const { errors, values } = stateFields(state)
  const v = (key: keyof SavedAddress) =>
    values[key] ?? (address ? String(address[key] ?? '') : undefined)

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <FormStatus state={state} />
      {address && <input type="hidden" name="id" value={address.id} />}
      {next && <input type="hidden" name="next" value={next} />}

      <Field
        id="label"
        label="Label"
        optional
        help="So you can spot it at checkout, like “Mum — Morant Bay”."
        error={errors.label}
      >
        <Input
          {...describedBy('label', errors.label)}
          name="label"
          maxLength={40}
          defaultValue={v('label')}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="recipientName" label="Who receives it" error={errors.recipientName}>
          <Input
            {...describedBy('recipientName', errors.recipientName)}
            name="recipientName"
            autoComplete="off"
            defaultValue={v('recipientName')}
            required
          />
        </Field>
        <Field
          id="phone"
          label="Their phone"
          help="They get a text before the driver arrives."
          error={errors.phone}
        >
          <PhoneInput
            {...describedBy('phone', errors.phone)}
            name="phone"
            autoComplete="off"
            defaultValue={v('phone')}
            required
          />
        </Field>
      </div>
      <Field id="street" label="Street address" error={errors.street}>
        <Input
          {...describedBy('street', errors.street)}
          name="street"
          autoComplete="off"
          defaultValue={v('street')}
          required
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="community" label="Community or district" error={errors.community}>
          <Input
            {...describedBy('community', errors.community)}
            name="community"
            autoComplete="off"
            defaultValue={v('community')}
            required
          />
        </Field>
        <Field
          id="parish"
          label="Parish"
          help={`We deliver to ${parishes.join(' and ')} for now.`}
          error={errors.parish}
        >
          <Select
            {...describedBy('parish', errors.parish)}
            name="parish"
            defaultValue={v('parish') || parishes[0]}
            required
          >
            {parishes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        id="landmark"
        label="Landmark"
        help="Something the driver can look for, like “green gate opposite the church”."
        error={errors.landmark}
      >
        <Input
          {...describedBy('landmark', errors.landmark)}
          name="landmark"
          defaultValue={v('landmark')}
          required
        />
      </Field>
      <Field id="notes" label="Notes for the driver" optional error={errors.notes}>
        <Textarea
          {...describedBy('notes', errors.notes)}
          name="notes"
          maxLength={300}
          defaultValue={v('notes')}
        />
      </Field>
      <Checkbox
        name="isDefault"
        defaultChecked={address?.isDefault ?? false}
        label="Use this address first at checkout"
      />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" loading={pending}>
          {address ? 'Save changes' : 'Save address'}
        </Button>
        <ButtonLink
          href={next === 'checkout' ? '/checkout' : '/account/addresses'}
          variant="ghost"
          size="lg"
        >
          Cancel
        </ButtonLink>
      </div>
    </form>
  )
}
