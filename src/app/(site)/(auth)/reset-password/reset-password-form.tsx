'use client'

import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { PasswordInput } from '@/components/account/password-input'
import { Button } from '@/components/ui/button'
import { describedBy, Field } from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import { resetPasswordAction } from '@/lib/auth/actions'

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPasswordAction, idle)
  const { errors } = stateFields(state)
  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <FormStatus state={state} />
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
      <Field id="confirm" label="Type it again" error={errors.confirm}>
        <PasswordInput
          {...describedBy('confirm', errors.confirm)}
          name="confirm"
          autoComplete="new-password"
          required
        />
      </Field>
      <Button type="submit" size="lg" loading={pending}>
        Save new password
      </Button>
    </form>
  )
}
