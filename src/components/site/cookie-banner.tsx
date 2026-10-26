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
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-lg border border-line bg-blush-100 p-4 shadow-lift sm:flex sm:items-center sm:gap-4"
    >
      <p className="text-sm text-ink">
        We use essential cookies to keep your basket and sign-in working. With your OK we also count
        visits to improve the site.{' '}
        <Link href="/legal/cookies" className="font-semibold text-crimson underline">
          Cookie notice
        </Link>
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
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
