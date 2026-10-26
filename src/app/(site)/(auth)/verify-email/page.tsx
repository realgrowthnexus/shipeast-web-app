import { MailCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Alert } from '@/components/ui/alert'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { param, safeNext } from '@/lib/auth/redirect'
import { isDemoMode } from '@/lib/env'
import { ResendForm } from './resend-form'

export const metadata: Metadata = {
  title: 'Check your email',
  robots: { index: false },
}

const link = 'font-semibold text-crimson underline-offset-2 hover:underline'

export default function VerifyEmailPage({ searchParams }: PageProps<'/verify-email'>) {
  return (
    <div className="flex flex-col gap-6">
      <span className="grid size-14 place-items-center rounded-full bg-surface-tint text-crimson">
        <MailCheck className="size-7" aria-hidden />
      </span>
      <Suspense fallback={<Skeleton className="h-80" />}>
        <Verify searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function Verify({
  searchParams,
}: {
  searchParams: PageProps<'/verify-email'>['searchParams']
}) {
  const sp = await searchParams
  const email = param(sp.email)?.slice(0, 200)
  return (
    <>
      <div>
        <p className="mb-3 eyebrow text-crimson">One more step</p>
        <h1 className="text-h1 text-balance text-ink">Check your email</h1>
        <p className="mt-3 text-lead text-ink-body">
          We sent a link to {email ? <strong className="text-ink">{email}</strong> : 'your email'}.
          Open it to confirm your address and finish setting up your account.
        </p>
      </div>

      {isDemoMode() && (
        <Alert
          tone="info"
          title="Preview only"
          action={<ButtonLink href={safeNext(param(sp.next))}>Continue to your account</ButtonLink>}
        >
          No email is sent on the preview site.
        </Alert>
      )}

      <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-body marker:text-crimson">
        <li>It can take a minute or two. Check your spam or promotions folder too.</li>
        <li>The link works once. After that, just sign in.</li>
        <li>
          Already have an account with this email?{' '}
          <Link href="/signin" className={link}>
            Sign in
          </Link>{' '}
          or{' '}
          <Link href="/forgot-password" className={link}>
            reset your password
          </Link>
          .
        </li>
      </ul>

      {email && <ResendForm email={email} />}
    </>
  )
}
