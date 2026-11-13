'use client'

import { useEffect } from 'react'

/**
 * Marks the home page `data-hydrated` once its JavaScript runs. Until then the CSS shows every
 * photo and, after a few seconds, every scroll reveal (globals.css), so a slow or failed bundle
 * never leaves the page blank.
 */
export function HomeHydrated() {
  useEffect(() => {
    document.querySelector('[data-home]')?.setAttribute('data-hydrated', '')
  }, [])
  return null
}
