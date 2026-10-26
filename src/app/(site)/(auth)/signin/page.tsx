import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthHeading } from '@/components/account/auth-heading'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/card'
import { param, safeNext } from '@/lib/auth/redirect'
import { getAccount } from '@/lib/auth/session'
import { SignInForm } from './signin-form'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to see your orders, send a basket again and use saved family addresses.',
  alternates: { canonical: '/signin' },
}

export default function SignInPage({ searchParams }: PageProps<'/signin'>) {
  return (
    <>
      <AuthHeading eyebrow="Welcome back" title="Sign in">
        See your orders, send a basket again and use your saved family addresses.
      </AuthHeading>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <SignIn searchParams={searchParams} />
      </Suspense>
    </>
  )
}

async function SignIn({ searchParams }: { searchParams: PageProps<'/signin'>['searchParams'] }) {
  const sp = await searchParams
  const next = safeNext(param(sp.next))
  if (await getAccount()) redirect(next)
  return (
    <div className="flex flex-col gap-6">
      {param(sp.link) === 'expired' && (
        <Alert tone="warn" title="That link has expired or was already used">
          Sign in below. If you hadn’t confirmed your email yet, signing in sends a new link.
        </Alert>
      )}
      <SignInForm next={next} email={param(sp.email)} />
    </div>
  )
}
