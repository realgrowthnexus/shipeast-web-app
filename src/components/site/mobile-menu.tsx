'use client'

import { Mail, Menu, MessageCircle, Phone, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SearchBox } from '@/components/shop/search-box'
import { IconButton } from '@/components/ui/button'
import { CategoryIcon } from './category-icon'
import { isCurrent } from './nav-link'
import { Wordmark } from './wordmark'

export interface MenuDepartment {
  href: string
  label: string
  slug: string
  count: number
}

const triggerClass =
  'grid size-control cursor-pointer place-items-center rounded-full text-on-dark transition-colors duration-150 hover:bg-crimson-deep lg:hidden'

const rowClass =
  'flex min-h-12 items-center gap-3 rounded-md px-3 font-semibold text-ink transition-colors duration-150 hover:bg-surface-muted aria-[current=page]:bg-surface-selected aria-[current=page]:text-crimson-deep'

/** The closed trigger, for the Suspense fallback before the current path is known. */
export function MobileMenuTrigger() {
  return (
    <button type="button" className={triggerClass} aria-haspopup="dialog" aria-expanded={false}>
      <Menu className="size-6" aria-hidden />
      <span className="sr-only">Menu</span>
    </button>
  )
}

/**
 * The phone and tablet menu (below 1024px): a sheet from the right on a native `<dialog>`, so
 * the browser traps focus, closes it on Escape and makes the page behind it inert. Without
 * JavaScript the trigger does nothing; every destination is still in the footer.
 */
export function MobileMenu({
  departments,
  links,
  email,
  whatsapp,
  phone,
}: {
  departments: MenuDepartment[]
  links: { href: string; label: string }[]
  email: string
  /** Digits only, or empty when not set. */
  whatsapp: string
  /** Formatted as `1-876-123-1234`, or empty when not set. */
  phone: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const path = usePathname()

  const show = () => {
    ref.current?.showModal()
    document.documentElement.style.overflow = 'hidden'
    setOpen(true)
  }
  const close = () => ref.current?.close()
  const onClose = () => {
    document.documentElement.style.overflow = ''
    setOpen(false)
    trigger.current?.focus()
  }

  // A new page closes the menu (links also close it on tap; this covers back and forward).
  useEffect(() => {
    if (ref.current?.open) ref.current.close()
  }, [path])

  // Never leave the page locked if the header unmounts with the menu open.
  useEffect(() => () => void (document.documentElement.style.overflow = ''), [])

  const row = (href: string) => ({
    href,
    'aria-current': isCurrent(path, href) ? ('page' as const) : undefined,
    className: rowClass,
  })

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={show}
        className={triggerClass}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">Menu</span>
      </button>

      <dialog
        ref={ref}
        id="site-menu"
        aria-label="Menu"
        onClose={onClose}
        onClick={(e) => e.target === ref.current && close()}
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(22.5rem,calc(100vw-3rem))] max-w-none sheet-end bg-surface p-0 text-ink shadow-overlay backdrop:bg-scrim"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
            <Wordmark />
            <IconButton label="Close menu" onClick={close} className="rounded-full" autoFocus>
              <X aria-hidden />
            </IconButton>
          </div>

          <nav
            aria-label="Menu"
            className="flex-1 overflow-y-auto p-4"
            // Tapping any link closes the sheet before the next page paints.
            onClick={(e) => (e.target as HTMLElement).closest('a') && close()}
          >
            <SearchBox id="menu-q" />

            {departments.length > 0 && (
              <>
                <h2 className="mt-6 px-3 pb-1 text-small font-bold text-ink-muted">
                  Shop by department
                </h2>
                <ul>
                  {departments.map((d) => (
                    <li key={d.href}>
                      <Link {...row(d.href)}>
                        <span className="text-crimson [&_svg]:size-icon">
                          <CategoryIcon slug={d.slug} />
                        </span>
                        {d.label}
                        {d.count > 0 && (
                          <span className="ml-auto text-small font-medium text-ink-muted tabular-nums">
                            {d.count}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-6 px-3 pb-1 text-small font-bold text-ink-muted">More</h2>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link {...row(l.href)}>{l.label}</Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 border-t border-line pt-4">
              <li>
                <Link {...row('/account')}>
                  <User className="size-icon text-crimson" aria-hidden />
                  Your account
                </Link>
              </li>
              <li>
                <a href={`mailto:${email}`} className={rowClass}>
                  <Mail className="size-icon text-crimson" aria-hidden />
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:+${phone.replace(/\D/g, '')}`} className={rowClass}>
                    <Phone className="size-icon text-crimson" aria-hidden />
                    {phone}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={`https://wa.me/${whatsapp}`} className={rowClass}>
                    <MessageCircle className="size-icon text-crimson" aria-hidden />
                    WhatsApp us
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  )
}
