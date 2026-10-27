'use client'

import type { MouseEvent, ReactNode } from 'react'

/**
 * The phone menu's `<details>`: still works before JavaScript loads, and closes itself when a
 * link inside it is tapped, so the next page doesn't open with the menu still over it.
 */
export function MenuDetails({ className, children }: { className?: string; children: ReactNode }) {
  const close = (e: MouseEvent<HTMLDetailsElement>) => {
    if ((e.target as HTMLElement).closest('a')) e.currentTarget.open = false
  }
  return (
    <details className={className} onClick={close}>
      {children}
    </details>
  )
}
