'use client'

import type { ReactNode } from 'react'
import { queryFromForm, shopQueryString } from '@/lib/shop-filters'
import { useHydrated, useListingNav } from './listing-nav'

/**
 * The sidebar filter form. Without JavaScript it is a plain GET form with an "Apply filters"
 * button. Once enhanced (`data-enhanced`, which hides that button), ticking a box or a radio
 * applies at once. The parent gives it `key={queryString}` so it remounts on every URL change
 * and the boxes always match the URL (pages are kept alive between navigations).
 */
export function FilterForm({
  action,
  children,
  className,
}: {
  action: string
  children: ReactNode
  className?: string
}) {
  const { navigate } = useListingNav()
  const enhanced = useHydrated()

  const apply = (form: HTMLFormElement) =>
    navigate(action + shopQueryString(queryFromForm(new FormData(form))))

  return (
    <form
      method="get"
      action={action}
      data-enhanced={enhanced || undefined}
      className={`group/filters ${className ?? ''}`}
      onChange={(e) => {
        const t = e.target as unknown as HTMLInputElement
        if (t.type === 'checkbox' || t.type === 'radio') apply(e.currentTarget)
      }}
      onSubmit={(e) => {
        e.preventDefault()
        apply(e.currentTarget)
      }}
    >
      {children}
    </form>
  )
}
