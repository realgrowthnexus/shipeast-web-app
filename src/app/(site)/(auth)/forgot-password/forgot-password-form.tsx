'use client'

import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { Button } from '@/components/ui/button'
import { describedBy, Field, Input } from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import { forgotPasswordAction } from '@/lib/auth/actions'

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, idle)
  const { errors, values } = stateFields(state)
  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <FormStatus state={state} />
      <Field id="email" label="Email" error={errors.email}>
        <Input
          {...describedBy('email', errors.email)}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          required
        />
      </Field>
      <Button type="submit" size="lg" loading={pending}>
        Send reset link
      </Button>
    </form>
  )
}
