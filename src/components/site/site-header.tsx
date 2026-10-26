import { Menu, ShoppingBasket, User } from 'lucide-react'
import Link from 'next/link'
import { Wordmark } from './wordmark'

const nav = [
  { href: '/shop', label: 'Shop' },
  { href: '/baskets', label: 'Baskets' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/track', label: 'Track an order' },
]

export function SiteHeader({ basketCount = 0 }: { basketCount?: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-blush-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:h-18">
        <Link href="/" className="mr-auto rounded-sm" aria-label="ShipEast Shop & Send, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 font-semibold text-ink transition-colors hover:bg-blush-200 hover:text-crimson"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/account"
          className="grid size-11 place-items-center rounded-md text-ink hover:bg-blush-200"
        >
          <User className="size-5" aria-hidden />
          <span className="sr-only">Your account</span>
        </Link>
        <Link
          href="/basket"
          className="relative flex min-h-11 items-center gap-2 rounded-md bg-crimson px-3.5 font-semibold text-white"
        >
          <ShoppingBasket className="size-5" aria-hidden />
          <span className="hidden sm:inline">Basket</span>
          <span className="grid min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-crimson-deep tabular-nums">
            {basketCount}
          </span>
          <span className="sr-only">{basketCount === 1 ? 'item' : 'items'}</span>
        </Link>

        {/* Phone menu: <details> works before JavaScript loads. */}
        <details className="group relative lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-md text-ink hover:bg-blush-200 [&::-webkit-details-marker]:hidden">
            <Menu className="size-6" aria-hidden />
            <span className="sr-only">Menu</span>
          </summary>
          <nav
            aria-label="Main"
            className="absolute top-full right-0 mt-2 w-64 rounded-lg border border-line bg-blush-100 p-2 shadow-lift"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-md px-3 font-semibold text-ink hover:bg-blush-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
