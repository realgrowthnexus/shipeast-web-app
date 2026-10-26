import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { AuthHeading } from '@/components/account/auth-heading'
import { Alert } from '@/components/ui/alert'
import { param } from '@/lib/auth/redirect'
import { ForgotPasswordForm } from './forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot your password',
  robots: { index: false },
}

export default function ForgotPasswordPage({ searchParams }: PageProps<'/forgot-password'>) {
  return (
    <>
      <AuthHeading eyebrow="Reset your password" title="Forgot your password?">
        Enter the email on your account and we’ll send a link to choose a new one.
      </AuthHeading>
      <div className="flex flex-col gap-6">
        <Suspense>
          <ExpiredNotice searchParams={searchParams} />
        </Suspense>
        <ForgotPasswordForm />
        <p className="text-ink-body">
          Remembered it?{' '}
          <Link
            href="/signin"
            className="font-semibold text-crimson underline-offset-2 hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </>
  )
}

async function ExpiredNotice({
  searchParams,
}: {
  searchParams: PageProps<'/forgot-password'>['searchParams']
}) {
  if (param((await searchParams).link) !== 'expired') return null
  return (
    <Alert tone="warn" title="That reset link has expired or was already used">
      Reset links work once, for one hour. Ask for a new one below.
    </Alert>
  )
}
