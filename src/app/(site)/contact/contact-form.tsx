'use client'

import { useActionState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea, describedBy } from '@/components/ui/field'
import { sendContactMessage, type ContactState } from './actions'

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, {
    status: 'idle',
  })

  if (state.status === 'sent') {
    return (
      <Alert tone="ok" title="Message received">
        {state.preview
          ? 'This is a preview, so the message wasn’t sent. Once the site is live, we reply within one working day.'
          : 'We reply within one working day, usually sooner.'}
      </Alert>
    )
  }

  const errors = state.status === 'error' ? state.errors : {}
  const values = state.status === 'error' ? state.values : {}

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
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
      <Field id="topic" label="What is it about?" error={errors.topic}>
        <Select
          {...describedBy('topic', errors.topic)}
          name="topic"
          defaultValue={values.topic ?? 'order'}
        >
          <option value="order">An order I placed</option>
          <option value="delivery">Delivery to my area</option>
          <option value="payment">Paying</option>
          <option value="other">Something else</option>
        </Select>
      </Field>
      <Field
        id="orderNo"
        label="Order number"
        optional
        error={errors.orderNo}
        help="It starts with SE-"
      >
        <Input
          {...describedBy('orderNo', errors.orderNo)}
          name="orderNo"
          placeholder="SE-10428"
          defaultValue={values.orderNo}
        />
      </Field>
      <Field id="message" label="Your message" error={errors.message} className="sm:col-span-2">
        <Textarea
          {...describedBy('message', errors.message)}
          name="message"
          rows={6}
          defaultValue={values.message}
          required
        />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" loading={pending}>
          Send message
        </Button>
      </div>
    </form>
  )
}
