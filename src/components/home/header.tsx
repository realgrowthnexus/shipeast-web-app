import { Gift, MessageCircle, PackageSearch, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { BasketLink, BasketLinkFallback } from '@/components/site/basket-link'
import { CategoryIcon } from '@/components/site/category-icon'
import { HeaderShell } from '@/components/site/header-shell'
import { JamaicaFlag } from '@/components/site/jamaica'
import { MobileMenu, MobileMenuTrigger } from '@/components/site/mobile-menu'
import { getCategories, getSettings } from '@/lib/data/site'
import { formatClockTime, formatJamaicanPhone } from '@/lib/format'
import { TickerToggle } from './ticker-toggle'
import { HomeWordmark } from './wordmark'

const menuLinks = [
  { href: '/baskets', label: 'Ready-made baskets' },
  { href: '/gifts', label: 'Gifts and occasions' },
  { href: '/monthly', label: 'Monthly orders' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery areas and fees' },
  { href: '/track', label: 'Track an order' },
  { href: '/faq', label: 'Questions and answers' },
]

const stripLink =
  'inline-flex min-h-11 items-center font-medium text-on-dark underline-offset-4 hover:underline'

const basketClass = 'rounded-md font-semibold lg:min-h-12 lg:px-5'

const aisleLink =
  'inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-small font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-cream hover:text-crimson'

function HomeSearch({ id, className }: { id: string; className?: string }) {
  return (
    <form action="/search" role="search" className={className}>
      <label htmlFor={id} className="sr-only">
        Search the shop
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-icon -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
        <input
          id={id}
          name="q"
          type="search"
          enterKeyHint="search"
          placeholder="Search rice, diapers, detergent…"
          maxLength={80}
          className="min-h-control w-full rounded-md border border-line-strong bg-cream pr-28 pl-12 text-body text-ink transition-colors duration-150 placeholder:text-ink-muted hover:border-ink-muted focus:border-crimson focus:bg-surface focus:outline-none lg:min-h-12"
        />
        <button
          type="submit"
          className="btn-slide absolute top-1 right-1 bottom-1 cursor-pointer rounded-sm bg-crimson px-5 text-small font-semibold text-on-dark [--slide:var(--color-oxblood)]"
        >
          Search
        </button>
      </div>
    </form>
  )
}

/**
 * The home header (docs/home-v3/PLAN.md §3, rows 0 and 1): a dark strip that says where we
 * deliver, a store header led by the search field, and a row of aisles on wide screens.
 */
export async function HomeHeader({
  parishList,
  cutoff,
}: {
  parishList: string
  /** Earliest same-day cut-off, `HH:MM` Jamaica time, or null with no active zones. */
  cutoff: string | null
}) {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()])
  const whatsapp = settings.whatsapp.replace(/\D/g, '')
  const departments = categories.map((c) => ({
    href: `/shop/${c.slug}`,
    label: c.name,
    slug: c.slug,
    count: c.count,
  }))
  const news = [
    parishList ? `Delivering to ${parishList}` : 'Delivering in Jamaica',
    ...(cutoff
      ? [`Order by ${formatClockTime(cutoff)} Jamaica time and we aim to deliver the same day`]
      : []),
    'Bought in Jamaica. Nothing is shipped',
    'A photo of the till receipt and a photo at the door',
    'Pay in US dollars',
  ]
  return (
    <>
      <div className="bg-oxblood text-small text-on-dark on-dark-focus print:hidden">
        <div className="mx-auto flex min-h-11 max-w-wide items-center gap-x-4 gutter lg:gap-x-6">
          {/* The news ticker: the same line twice, sliding left; the copy is hidden from readers. */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div id="home-ticker" className="ticker">
              {[false, true].map((copy) => (
                <ul key={String(copy)} aria-hidden={copy || undefined} className="flex shrink-0">
                  {news.map((line, i) => (
                    <li key={line} className="flex items-center gap-3 pr-8 whitespace-nowrap">
                      {i === 0 ? (
                        <JamaicaFlag />
                      ) : (
                        <span className="size-1.5 rounded-full bg-mango" aria-hidden />
                      )}
                      <span className="font-medium">{line}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <TickerToggle targetId="home-ticker" />
          <nav aria-label="Help" className="hidden shrink-0 items-center gap-5 lg:flex">
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} className={`${stripLink} gap-2`}>
                <MessageCircle className="size-icon-sm" aria-hidden />
                WhatsApp us
              </a>
            )}
            <Link href="/track" className={stripLink}>
              Track an order
            </Link>
            <Link href="/faq" className={stripLink}>
              Questions
            </Link>
          </nav>
        </div>
      </div>

      <HeaderShell>
        <div className="mx-auto flex h-16 max-w-wide items-center gap-2 gutter md:h-18 md:gap-4 lg:h-20">
          <Link
            href="/"
            className="mr-auto shrink-0 rounded-sm py-2 lg:mr-2"
            aria-label="ShipEast Shop & Send, home"
          >
            <HomeWordmark />
          </Link>
          <HomeSearch id="home-q" className="hidden max-w-2xl flex-1 lg:block" />
          <Link
            href="/account"
            className="flex min-h-control shrink-0 items-center gap-2 rounded-md px-3 font-medium text-ink transition-colors duration-150 hover:bg-cream hover:text-crimson lg:ml-auto lg:min-h-12"
          >
            <User className="size-icon" aria-hidden />
            <span className="sr-only xl:not-sr-only">Account</span>
          </Link>
          <Suspense fallback={<BasketLinkFallback className={basketClass} />}>
            <BasketLink className={basketClass} />
          </Suspense>
          <Suspense fallback={<MobileMenuTrigger />}>
            <MobileMenu
              departments={departments}
              links={menuLinks}
              email={settings.email}
              whatsapp={settings.whatsapp.replace(/\D/g, '')}
              phone={(settings.phone && formatJamaicanPhone(settings.phone)) || ''}
            />
          </Suspense>
        </div>
      </HeaderShell>

      {/* Phones and tablets: the search field gets its own row under the bar. */}
      <div className="border-b border-cream-deep bg-surface pt-1 pb-4 lg:hidden print:hidden">
        <HomeSearch id="home-q-sm" className="mx-auto max-w-wide gutter" />
      </div>

      {/* Wide screens: the aisles, one tap from the door. */}
      <nav
        aria-label="Departments"
        className="hidden border-b border-cream-deep bg-surface py-2 lg:block print:hidden"
      >
        <ul className="mx-auto flex max-w-wide items-center gap-1 gutter">
          {departments.map((d) => (
            <li key={d.href}>
              <Link href={d.href} className={aisleLink}>
                <span className="text-crimson [&_svg]:size-icon">
                  <CategoryIcon slug={d.slug} />
                </span>
                {d.label}
              </Link>
            </li>
          ))}
          <li aria-hidden className="mx-2 h-6 w-px bg-cream-deep" />
          <li>
            <Link href="/baskets" className={aisleLink}>
              <ShoppingBag className="size-icon text-crimson" aria-hidden />
              <span className="xl:hidden">Baskets</span>
              <span className="hidden xl:inline">Ready-made baskets</span>
            </Link>
          </li>
          <li>
            <Link href="/gifts" className={aisleLink}>
              <Gift className="size-icon text-crimson" aria-hidden />
              Gifts
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/how-it-works" className={aisleLink}>
              <PackageSearch className="size-icon text-crimson" aria-hidden />
              How it works
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
