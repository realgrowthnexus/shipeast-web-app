import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthHeading } from '@/components/account/auth-heading'
import { Alert } from '@/components/ui/alert'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { getAccount } from '@/lib/auth/session'
import { ResetPasswordForm } from './reset-password-form'

export const metadata: Metadata = {
  title: 'Choose a new password',
  robots: { index: false },
}

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeading eyebrow="Reset your password" title="Choose a new password">
        Use at least 8 characters. A short phrase is easier to remember than a jumble.
      </AuthHeading>
      <Suspense fallback={<Skeleton className="h-72" />}>
        <Reset />
      </Suspense>
    </>
  )
}

/** The email link signs the person in first; without that session there is nothing to reset. */
async function Reset() {
  if (!(await getAccount())) {
    return (
      <Alert
        tone="warn"
        title="Open the link from your email first"
        action={<ButtonLink href="/forgot-password">Send a new link</ButtonLink>}
      >
        This page works from the reset link we email you. Links work once, for one hour.
      </Alert>
    )
  }
  return <ResetPasswordForm />
}
