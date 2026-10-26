import { CircleCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Account deleted',
  robots: { index: false },
}

export default function AccountDeletedPage() {
  return (
    <Container className="max-w-2xl section">
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-ok-tint text-ok">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <h1 className="text-h1 text-ink">Your account is deleted</h1>
        <p className="text-lead text-ink-body">
          Your sign-in, details and saved addresses are gone. You can still send groceries home as a
          guest whenever you like.
        </p>
        <ButtonLink href="/shop" className="mt-2">
          Back to the shop
        </ButtonLink>
      </div>
    </Container>
  )
}
