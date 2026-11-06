import { Search, User } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { SearchBox } from '@/components/shop/search-box'
import { cn } from '@/lib/cn'
import { getCategories, getSettings } from '@/lib/data/site'
import { formatJamaicanPhone } from '@/lib/format'
import { BasketLink, BasketLinkFallback } from './basket-link'
import { HeaderSearchRow, HeaderSearchRowFrame } from './header-search-row'
import { HeaderShell } from './header-shell'
import { MobileMenu, MobileMenuTrigger } from './mobile-menu'
import { NavLink, navLinkClass } from './nav-link'
import { Wordmark } from './wordmark'

/** The bar's nav. Track an order shows from 1280px; below that it lives in the menu and footer. */
const nav = [
  { href: '/shop', label: 'Shop' },
  { href: '/baskets', label: 'Baskets' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/track', label: 'Track an order', wideOnly: true },
]

/** The menu's "More" list. */
const menuLinks = [
  { href: '/baskets', label: 'Ready-made baskets' },
  { href: '/gifts', label: 'Gifts and occasions' },
  { href: '/monthly', label: 'Monthly orders' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery areas and fees' },
  { href: '/track', label: 'Track an order' },
  { href: '/faq', label: 'Questions and answers' },
]

const iconLink =
  'grid size-control shrink-0 place-items-center rounded-full text-on-dark transition-colors duration-150 hover:bg-crimson-deep'

/**
 * The site header: one sticky crimson bar (logo, nav, search, account, basket, menu). On phones
 * a second, non-sticky search row sits under it and scrolls away. Returned as a fragment so the
 * bar is sticky against the whole page, not a short wrapper.
 */
export async function SiteHeader() {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()])
  const departments = categories.map((c) => ({
    href: `/shop/${c.slug}`,
    label: c.name,
    slug: c.slug,
    count: c.count,
  }))
  const menu = (
    <MobileMenu
      departments={departments}
      links={menuLinks}
      email={settings.email}
      whatsapp={settings.whatsapp.replace(/\D/g, '')}
      phone={(settings.phone && formatJamaicanPhone(settings.phone)) || ''}
    />
  )

  return (
    <>
      <HeaderShell>
        <div className="mx-auto flex h-16 max-w-wide items-center gap-1 gutter md:h-18 md:gap-2 xl:gap-3">
          <Link
            href="/"
            className="mr-auto shrink-0 rounded-sm md:mr-0 lg:mr-6"
            aria-label="ShipEast Shop & Send, home"
          >
            <Wordmark onDark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href} className={cn(n.wideOnly && 'hidden xl:block')}>
                  <Suspense
                    fallback={
                      <Link href={n.href} className={navLinkClass}>
                        {n.label}
                      </Link>
                    }
                  >
                    <NavLink href={n.href}>{n.label}</NavLink>
                  </Suspense>
                </li>
              ))}
            </ul>
          </nav>

          {/* Inline search: tablets and wide screens. 1024–1279px get the icon instead. */}
          <SearchBox
            id="header-q"
            compact
            className="mx-4 hidden max-w-md flex-1 md:block lg:hidden xl:mr-0 xl:ml-auto xl:block xl:max-w-sm"
          />
          <Link href="/search" className={cn(iconLink, 'ml-auto hidden lg:grid xl:hidden')}>
            <Search className="size-icon" aria-hidden />
            <span className="sr-only">Search the shop</span>
          </Link>

          <Link href="/account" className={cn(iconLink, 'md:ml-auto lg:ml-0')}>
            <User className="size-icon" aria-hidden />
            <span className="sr-only">Your account</span>
          </Link>
          <Suspense fallback={<BasketLinkFallback />}>
            <BasketLink />
          </Suspense>
          <Suspense fallback={<MobileMenuTrigger />}>{menu}</Suspense>
        </div>
      </HeaderShell>
      <Suspense
        fallback={
          <HeaderSearchRowFrame>
            <SearchBox id="header-q-sm" compact />
          </HeaderSearchRowFrame>
        }
      >
        <HeaderSearchRow>
          <SearchBox id="header-q-sm" compact />
        </HeaderSearchRow>
      </Suspense>
    </>
  )
}
