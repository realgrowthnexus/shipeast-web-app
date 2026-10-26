'use client'

import { Trash2 } from 'lucide-react'
import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { PasswordInput } from '@/components/account/password-input'
import { Button } from '@/components/ui/button'
import { Checkbox, describedBy, Field, Input } from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import type { Account } from '@/lib/account/types'
import {
  changeEmailAction,
  changePasswordAction,
  deleteAccountAction,
  updateProfileAction,
} from '../actions'

const form = 'flex flex-col gap-5'

export function ProfileForm({ account }: { account: Account }) {
  const [state, action, pending] = useActionState(updateProfileAction, idle)
  const { errors, values } = stateFields(state)
  return (
    <form action={action} noValidate className={form}>
      <FormStatus state={state} />
      <Field id="fullName" label="Your name" error={errors.fullName}>
        <Input
          {...describedBy('fullName', errors.fullName)}
          name="fullName"
          autoComplete="name"
          defaultValue={values.fullName ?? account.fullName}
          required
        />
      </Field>
      <Field
        id="phone"
        label="Your phone"
        optional
        help="Wherever you live. We only call if there’s a problem with an order."
        error={errors.phone}
      >
        <Input
          {...describedBy('phone', errors.phone)}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 416 555 0123"
          defaultValue={values.phone ?? account.phone ?? ''}
        />
      </Field>
      <fieldset className="flex flex-col">
        <legend className="mb-1 text-small font-semibold text-ink">Order updates</legend>
        <Checkbox
          name="emailUpdates"
          defaultChecked={account.emailUpdates}
          label="Email me when my order is shopped and delivered"
        />
        <Checkbox name="smsUpdates" defaultChecked={account.smsUpdates} label="Text me as well" />
        <p className="text-small text-ink-muted">
          Receipts and payment emails always come, whatever you choose here.
        </p>
      </fieldset>
      <Button type="submit" loading={pending} className="self-start">
        Save details
      </Button>
    </form>
  )
}

export function EmailForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(changeEmailAction, idle)
  const { errors, values } = stateFields(state)
  return (
    <form action={action} noValidate className={form}>
      <FormStatus state={state} />
      <Field
        id="email"
        label="Email"
        help="We send a link to the new address to confirm it’s yours."
        error={errors.email}
      >
        <Input
          {...describedBy('email', errors.email)}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email ?? email}
          required
        />
      </Field>
      <Button type="submit" variant="secondary" loading={pending} className="self-start">
        Change email
      </Button>
    </form>
  )
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, idle)
  const { errors } = stateFields(state)
  return (
    <form action={action} noValidate className={form}>
      <FormStatus state={state} />
      <Field id="current" label="Current password" error={errors.current}>
        <PasswordInput
          {...describedBy('current', errors.current)}
          name="current"
          autoComplete="current-password"
          required
        />
      </Field>
      <Field
        id="password"
        label="New password"
        help="At least 8 characters."
        error={errors.password}
      >
        <PasswordInput
          {...describedBy('password', errors.password)}
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </Field>
      <Field id="confirm" label="Type the new one again" error={errors.confirm}>
        <PasswordInput
          {...describedBy('confirm', errors.confirm)}
          name="confirm"
          autoComplete="new-password"
          required
        />
      </Field>
      <Button type="submit" variant="secondary" loading={pending} className="self-start">
        Change password
      </Button>
    </form>
  )
}

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccountAction, idle)
  const { errors } = stateFields(state)
  return (
    <form action={action} noValidate className={form}>
      <FormStatus state={state} />
      <p className="text-ink-body">
        Past orders stay in our records for accounting, but are no longer linked to you. You can
        still check out as a guest any time.
      </p>
      <div>
        <Checkbox
          name="confirm"
          aria-invalid={errors.confirm ? true : undefined}
          aria-describedby={errors.confirm ? 'confirm-delete-error' : undefined}
          label="I understand this can’t be undone"
        />
        {errors.confirm && (
          <p id="confirm-delete-error" className="text-small font-medium text-danger">
            {errors.confirm}
          </p>
        )}
      </div>
      <Button type="submit" variant="destructive" loading={pending} className="self-start">
        <Trash2 aria-hidden />
        Delete my account
      </Button>
    </form>
  )
}
