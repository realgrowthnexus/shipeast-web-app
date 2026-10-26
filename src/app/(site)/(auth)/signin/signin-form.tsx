'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { PasswordInput } from '@/components/account/password-input'
import { Button } from '@/components/ui/button'
import { describedBy, Field, Input } from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import { signInAction } from '@/lib/auth/actions'
import { withNext } from '@/lib/auth/redirect'

export function SignInForm({ next, email }: { next: string; email?: string }) {
  const [state, action, pending] = useActionState(signInAction, idle)
  const { errors, values } = stateFields(state)
  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <FormStatus state={state} />
      <input type="hidden" name="next" value={next} />
      <Field id="email" label="Email" error={errors.email}>
        <Input
          {...describedBy('email', errors.email)}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email ?? email}
          required
        />
      </Field>
      <Field
        id="password"
        label="Password"
        error={errors.password}
        help={
          <Link
            href="/forgot-password"
            className="font-semibold text-crimson underline-offset-2 hover:underline"
          >
            Forgot your password?
          </Link>
        }
      >
        <PasswordInput
          {...describedBy('password', errors.password)}
          name="password"
          autoComplete="current-password"
          required
        />
      </Field>
      <Button type="submit" size="lg" loading={pending}>
        Sign in
      </Button>
      <p className="text-ink-body">
        New to ShipEast?{' '}
        <Link
          href={withNext('/signup', next)}
          className="font-semibold text-crimson underline-offset-2 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  )
}
