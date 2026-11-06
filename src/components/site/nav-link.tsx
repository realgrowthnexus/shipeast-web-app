'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** A header nav link on crimson. Shared by the live link and its Suspense fallback. */
export const navLinkClass = cn(
  'relative inline-flex min-h-control items-center rounded-md px-3 text-body font-semibold text-on-dark transition-colors duration-150 hover:bg-crimson-deep',
  'aria-[current=page]:bg-crimson-deep aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-blush',
)

/** True when `path` is `href` or a page under it (`/shop/groceries` for `/shop`). */
export function isCurrent(path: string, href: string, exact = false) {
  if (exact || href === '/') return path === href
  return path === href || path.startsWith(`${href}/`)
}

/**
 * Marks itself `aria-current="page"` on its own section. Client only because it reads the
 * current path; wrap it in `<Suspense>` (pages with unknown params resolve the path late).
 */
export function NavLink({
  href,
  exact = false,
  className,
  children,
}: {
  href: string
  exact?: boolean
  className?: string
  children: ReactNode
}) {
  const path = usePathname()
  return (
    <Link
      href={href}
      aria-current={isCurrent(path, href, exact) ? 'page' : undefined}
      className={cn(navLinkClass, className)}
    >
      {children}
    </Link>
  )
}
