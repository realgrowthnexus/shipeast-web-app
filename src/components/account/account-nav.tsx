'use client'

import { CreditCard, House, MapPin, Package, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

export const ACCOUNT_LINKS = [
  { href: '/account', label: 'Overview', icon: House },
  { href: '/account/orders', label: 'Orders', icon: Package },
  { href: '/account/addresses', label: 'Family addresses', icon: MapPin },
  { href: '/account/payment-methods', label: 'Payment', icon: CreditCard },
  { href: '/account/profile', label: 'Profile', icon: UserRound },
] as const

/** Side menu on large screens, a scrolling row of tabs on phones. */
export function AccountNav() {
  const path = usePathname()
  return <AccountNavLinks active={path} />
}

export function AccountNavLinks({ active }: { active?: string }) {
  const current = (href: string) =>
    href === '/account' ? active === href : !!active?.startsWith(href)
  return (
    <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:px-0">
      {ACCOUNT_LINKS.map(({ href, label, icon: Icon }) => (
        <li key={href} className="shrink-0">
          <Link
            href={href}
            aria-current={current(href) ? 'page' : undefined}
            className={cn(
              'flex min-h-11 items-center gap-2.5 rounded-md px-3 font-semibold whitespace-nowrap transition-colors',
              current(href)
                ? 'bg-crimson text-white'
                : 'text-ink hover:bg-surface-tint hover:text-crimson',
            )}
          >
            <Icon className="size-5 shrink-0" aria-hidden />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
