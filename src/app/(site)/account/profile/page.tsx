import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountHeading } from '@/components/account/account-heading'
import { Skeleton } from '@/components/ui/card'
import { requireAccount } from '@/lib/auth/session'
import { formatDate } from '@/lib/format'
import { DeleteAccountForm, EmailForm, PasswordForm, ProfileForm } from './profile-forms'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <>
      <AccountHeading title="Profile">Your details, sign-in and messages from us.</AccountHeading>
      <Suspense fallback={<Skeleton className="h-[40rem]" />}>
        <Profile />
      </Suspense>
    </>
  )
}

function Panel({
  id,
  title,
  children,
  description,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-5 border-t border-line pt-8 first:border-0 first:pt-0 lg:grid-cols-[16rem_1fr] lg:gap-10"
    >
      <div>
        <h2 id={id} className="text-h3 text-ink">
          {title}
        </h2>
        {description && <p className="mt-1 text-small text-ink-muted">{description}</p>}
      </div>
      <div className="max-w-xl">{children}</div>
    </section>
  )
}

async function Profile() {
  const account = await requireAccount('/account/profile')
  return (
    <div className="flex flex-col gap-8">
      <Panel
        id="details-heading"
        title="Your details"
        description={`Customer ID ${account.publicId}. Member since ${formatDate(account.createdAt)}.`}
      >
        <ProfileForm account={account} />
      </Panel>
      <Panel
        id="email-heading"
        title="Email"
        description="Where receipts, order updates and sign-in links go."
      >
        <EmailForm email={account.email} />
      </Panel>
      <Panel id="password-heading" title="Password">
        <PasswordForm />
      </Panel>
      <Panel
        id="delete-heading"
        title="Delete account"
        description="Removes your sign-in, details and saved addresses."
      >
        <DeleteAccountForm />
      </Panel>
    </div>
  )
}
