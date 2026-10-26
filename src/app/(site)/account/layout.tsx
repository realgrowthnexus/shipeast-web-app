import { LogOut } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountNav, AccountNavLinks } from '@/components/account/account-nav'
import { Container } from '@/components/site/page-intro'
import { signOutAction } from '@/lib/auth/actions'

export const metadata: Metadata = {
  title: 'My account',
  robots: { index: false, follow: false },
}

export default function AccountLayout({ children }: LayoutProps<'/account'>) {
  return (
    <Container className="section-sm">
      <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-12 print:block">
        <nav
          aria-label="My account"
          className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start print:hidden"
        >
          <p className="hidden eyebrow text-crimson lg:block">My account</p>
          <Suspense fallback={<AccountNavLinks />}>
            <AccountNav />
          </Suspense>
          <form action={signOutAction} className="hidden border-t border-line pt-4 lg:block">
            <button
              type="submit"
              className="flex min-h-11 w-full items-center gap-2.5 rounded-md px-3 font-semibold text-ink-muted transition-colors hover:bg-surface-tint hover:text-ink"
            >
              <LogOut className="size-5" aria-hidden />
              Sign out
            </button>
          </form>
        </nav>
        <div className="min-w-0">
          {children}
          <form
            action={signOutAction}
            className="mt-12 border-t border-line pt-6 lg:hidden print:hidden"
          >
            <button
              type="submit"
              className="flex min-h-11 items-center gap-2.5 rounded-md font-semibold text-ink-muted hover:text-ink"
            >
              <LogOut className="size-5" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </Container>
  )
}
