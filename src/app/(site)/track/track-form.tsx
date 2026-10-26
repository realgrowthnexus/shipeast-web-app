'use client'

import { useActionState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { describedBy, Field, Input } from '@/components/ui/field'
import { findOrder, type TrackState } from './actions'

export function TrackForm() {
  const [state, action, pending] = useActionState<TrackState, FormData>(findOrder, {
    status: 'idle',
  })
  const errors = state.status === 'error' ? state.errors : {}
  const values = state.status === 'error' ? state.values : {}
  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      {errors.form && <Alert tone="danger" title={errors.form} />}
      <Field id="orderNo" label="Order number" help="It starts with SE-" error={errors.orderNo}>
        <Input
          {...describedBy('orderNo', errors.orderNo)}
          name="orderNo"
          placeholder="SE-10428"
          autoCapitalize="characters"
          defaultValue={values.orderNo}
          required
        />
      </Field>
      <Field id="email" label="Email you ordered with" error={errors.email}>
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
        Find my order
      </Button>
    </form>
  )
}
