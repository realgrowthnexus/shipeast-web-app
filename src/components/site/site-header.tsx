import { Camera, Clock3, DollarSign, Menu, PackageSearch, User, X } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { SearchBox } from '@/components/shop/search-box'
import { getCategories } from '@/lib/data/site'
import { BasketLink, BasketLinkFallback } from './basket-link'
import { CategoryIcon } from './category-icon'
import { HeaderShell } from './header-shell'
import { JamaicaFlag } from './jamaica'
import { Wordmark } from './wordmark'

/** Store sections beside the departments. */
const aisles = [
  { href: '/baskets', label: 'Baskets' },
  { href: '/gifts', label: 'Gifts' },
  { href: '/monthly', label: 'Monthly' },
]

/** Help links: right of the department bar, and in the phone menu. */
const help = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/track', label: 'Track an order' },
]

/** What every order carries, for the strip above the header. Facts only. */
const strip = [
  { icon: Clock3, text: 'Same-day delivery' },
  { icon: Camera, text: 'Receipt and door photos' },
  { icon: DollarSign, text: 'Pay in US dollars' },
]

/**
 * A store header: a slim promise strip, then the logo, search and basket, then a bar of
 * departments. Only the logo row and search stay pinned while scrolling.
 */
export async function SiteHeader() {
  const categories = await getCategories()
  const departments = categories.map((c) => ({
    href: `/shop/${c.slug}`,
    label: c.name,
    slug: c.slug,
  }))

  return (
    <>
      <div className="bg-crimson-700 text-white print:hidden">
        <div className="mx-auto flex min-h-10 max-w-wide items-center justify-between gap-4 gutter text-small">
          <p className="flex items-center gap-2.5 font-semibold">
            <JamaicaFlag className="w-6" />
            Shopped and delivered in Jamaica
          </p>
          <ul className="hidden items-center gap-6 text-on-crimson-muted lg:flex">
            {strip.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4 text-blush" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <HeaderShell>
        <div className="mx-auto flex h-16 max-w-wide items-center gap-2 gutter sm:h-18 sm:gap-4">
          <Link
            href="/"
            className="mr-auto rounded-sm lg:mr-4"
            aria-label="ShipEast Shop & Send, home"
          >
            <Wordmark onDark />
          </Link>

          <SearchBox id="header-q" compact className="hidden max-w-2xl flex-1 md:block" />

          <Link
            href="/account"
            className="grid size-11 place-items-center rounded-full text-white hover:bg-crimson-700 md:ml-auto"
          >
            <User className="size-5" aria-hidden />
            <span className="sr-only">Your account</span>
          </Link>
          <Suspense fallback={<BasketLinkFallback />}>
            <BasketLink />
          </Suspense>

          {/* Phone menu: <details> works before JavaScript loads. */}
          <details className="group relative lg:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full text-white hover:bg-crimson-700 [&::-webkit-details-marker]:hidden">
              <Menu className="size-6 group-open:hidden" aria-hidden />
              <X className="hidden size-6 group-open:block" aria-hidden />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              aria-label="Main"
              className="absolute top-full right-0 mt-2 max-h-[75vh] w-72 origin-top-right animate-rise overflow-y-auto rounded-lg border border-line bg-surface p-2 shadow-overlay"
            >
              <p className="px-3 pt-2 pb-1 eyebrow text-ink-muted">Departments</p>
              <ul>
                {departments.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="flex min-h-12 items-center gap-3 rounded-md px-3 font-semibold text-ink hover:bg-surface-tint [&_svg]:size-5 [&_svg]:text-crimson"
                    >
                      <CategoryIcon slug={d.slug} />
                      {d.label}
                    </Link>
                  </li>
                ))}
                {aisles.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="flex min-h-12 items-center rounded-md px-3 font-semibold text-ink hover:bg-surface-tint"
                    >
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 border-t border-line px-3 pt-3 pb-1 eyebrow text-ink-muted">
                Help
              </p>
              <ul>
                {help.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      className="flex min-h-12 items-center rounded-md px-3 font-semibold text-ink hover:bg-surface-tint"
                    >
                      {h.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>

        {/* Phones: search sits under the logo row */}
        <div className="gutter pb-3 md:hidden">
          <SearchBox id="header-q-sm" compact />
        </div>
      </HeaderShell>

      {/* The department bar: wide screens only (phones use the menu) */}
      <nav
        aria-label="Departments"
        className="hidden bg-crimson-700 text-white lg:block print:hidden"
      >
        <div className="mx-auto flex max-w-wide items-center gap-1 gutter">
          <ul className="flex items-center gap-1">
            {departments.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group relative flex min-h-12 items-center gap-2 rounded-md px-3 font-semibold text-white [&_svg]:size-4.5 [&_svg]:text-blush"
                >
                  <CategoryIcon slug={d.slug} />
                  {d.label}
                  <Underline />
                </Link>
              </li>
            ))}
            {aisles.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="group relative flex min-h-12 items-center rounded-md px-3 font-semibold text-white"
                >
                  {a.label}
                  <Underline />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto flex items-center gap-1 text-small">
            {help.map((h) => (
              <li key={h.href}>
                <Link
                  href={h.href}
                  className="flex min-h-11 items-center gap-1.5 rounded-md px-3 font-semibold text-on-crimson-muted hover:text-white"
                >
                  {h.href === '/track' && <PackageSearch className="size-4" aria-hidden />}
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

function Underline() {
  return (
    <span
      className="absolute inset-x-3 bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 ease-out-soft group-hover:scale-x-100"
      aria-hidden
    />
  )
}
