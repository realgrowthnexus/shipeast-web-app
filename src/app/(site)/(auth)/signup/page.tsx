import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AuthHeading } from '@/components/account/auth-heading'
import { Skeleton } from '@/components/ui/card'
import { param, safeNext } from '@/lib/auth/redirect'
import { getAccount } from '@/lib/auth/session'
import { SignUpForm } from './signup-form'

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Save family addresses, see every order and send a basket again in one tap.',
  alternates: { canonical: '/signup' },
}

export default function SignUpPage({ searchParams }: PageProps<'/signup'>) {
  return (
    <>
      <AuthHeading eyebrow="Free, and takes a minute" title="Create your account">
        Use the email you order with, and any orders you placed as a guest move into your account.
      </AuthHeading>
      <Suspense fallback={<Skeleton className="h-[30rem]" />}>
        <SignUp searchParams={searchParams} />
      </Suspense>
    </>
  )
}

async function SignUp({ searchParams }: { searchParams: PageProps<'/signup'>['searchParams'] }) {
  const sp = await searchParams
  const next = safeNext(param(sp.next))
  if (await getAccount()) redirect(next)
  return <SignUpForm next={next} email={param(sp.email)} />
}
