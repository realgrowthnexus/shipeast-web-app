'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'

const COOKIE = 'se_consent'

function readConsent() {
  return document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`)) ?? null
}

const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/** Whether the visitor has answered the banner yet (other corner widgets wait for it). */
export function useCookieChoiceMade() {
  return useSyncExternalStore(subscribe, readConsent, () => null) !== null
}

/** Essential cookies always on; analytics only if the visitor says yes. Choice kept a year. */
export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'pending')
  if (consent !== null) return null

  const choose = (value: 'all' | 'essential') => {
    document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`
    listeners.forEach((l) => l())
  }

  return (
    <div
      role="region"
      aria-label="Cookie choice"
      className="fixed inset-x-3 bottom-3 z-overlay mx-auto max-w-2xl rounded-lg border border-line bg-surface p-3 shadow-float sm:flex sm:items-center sm:gap-4 sm:p-4 print:hidden"
    >
      {/* Phones get the short version, so the banner covers as little of the page as it can. */}
      <p className="text-small text-ink sm:hidden">
        Essential cookies keep your basket working. May we also count visits?{' '}
        <Link href="/legal/cookies" className="font-semibold text-crimson underline">
          Cookies
        </Link>
      </p>
      <p className="hidden text-small text-ink sm:block">
        We use essential cookies to keep your basket and sign-in working. With your OK we also count
        visits to improve the site.{' '}
        <Link href="/legal/cookies" className="font-semibold text-crimson underline">
          Cookie notice
        </Link>
      </p>
      <div className="mt-2 grid shrink-0 grid-cols-2 gap-2 sm:mt-0 sm:flex">
        <Button size="sm" variant="secondary" onClick={() => choose('essential')}>
          Essential only
        </Button>
        <Button size="sm" onClick={() => choose('all')}>
          Allow all
        </Button>
      </div>
    </div>
  )
}
