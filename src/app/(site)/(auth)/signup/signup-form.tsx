'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { FormStatus, stateFields } from '@/components/account/form-status'
import { PasswordInput } from '@/components/account/password-input'
import { Button } from '@/components/ui/button'
import { describedBy, Field, Input } from '@/components/ui/field'
import { idle } from '@/lib/account/schemas'
import { signUpAction } from '@/lib/auth/actions'
import { withNext } from '@/lib/auth/redirect'

const link = 'font-semibold text-crimson underline-offset-2 hover:underline'

export function SignUpForm({ next, email }: { next: string; email?: string }) {
  const [state, action, pending] = useActionState(signUpAction, idle)
  const { errors, values } = stateFields(state)
  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <FormStatus state={state} />
      <input type="hidden" name="next" value={next} />
      <Field id="fullName" label="Your name" error={errors.fullName}>
        <Input
          {...describedBy('fullName', errors.fullName)}
          name="fullName"
          autoComplete="name"
          defaultValue={values.fullName}
          required
        />
      </Field>
      <Field
        id="email"
        label="Email"
        help="Order updates and receipts go here."
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
          defaultValue={values.phone}
        />
      </Field>
      <Field id="password" label="Password" help="At least 8 characters." error={errors.password}>
        <PasswordInput
          {...describedBy('password', errors.password)}
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </Field>
      <Button type="submit" size="lg" loading={pending}>
        Create account
      </Button>
      <p className="text-small text-ink-muted">
        By creating an account you agree to our{' '}
        <Link href="/legal/terms" className={link}>
          terms
        </Link>{' '}
        and{' '}
        <Link href="/legal/privacy" className={link}>
          privacy policy
        </Link>
        .
      </p>
      <p className="text-ink-body">
        Already have an account?{' '}
        <Link href={withNext('/signin', next)} className={link}>
          Sign in
        </Link>
      </p>
    </form>
  )
}
