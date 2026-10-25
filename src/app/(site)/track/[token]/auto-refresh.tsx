'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/** Re-reads the order every minute while it's moving, and when the tab comes back into view. */
export function AutoRefresh({ seconds = 60 }: { seconds?: number }) {
  const router = useRouter()
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') router.refresh()
    }, seconds * 1000)
    const onShow = () => document.visibilityState === 'visible' && router.refresh()
    document.addEventListener('visibilitychange', onShow)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onShow)
    }
  }, [router, seconds])
  return null
}
