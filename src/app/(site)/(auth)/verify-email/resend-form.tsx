'use client'

import { useActionState } from 'react'
import { FormStatus } from '@/components/account/form-status'
import { Button } from '@/components/ui/button'
import { idle } from '@/lib/account/schemas'
import { resendVerificationAction } from '@/lib/auth/actions'

export function ResendForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resendVerificationAction, idle)
  return (
    <form action={action} className="flex flex-col items-start gap-3 border-t border-line pt-6">
      <input type="hidden" name="email" value={email} />
      <p className="font-semibold text-ink">Nothing yet?</p>
      <FormStatus state={state} />
      <Button type="submit" variant="outline" loading={pending} disabled={state.status === 'ok'}>
        Send the link again
      </Button>
    </form>
  )
}
