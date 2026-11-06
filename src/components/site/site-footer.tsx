import { Mail, MessageCircle, Phone } from 'lucide-react'
import { cacheLife } from 'next/cache'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { formatJamaicanPhone } from '@/lib/format'
import { site } from '@/lib/site'
import type { SiteSettings } from '@/lib/types'
import { JamaicaFlag } from './jamaica'
import { Wordmark } from './wordmark'

type FooterLink = { href: string; label: string }

const help: FooterLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery areas and fees' },
  { href: '/track', label: 'Track an order' },
  { href: '/faq', label: 'Questions and answers' },
  { href: '/contact', label: 'Contact us' },
  { href: '/account', label: 'Your account' },
]

const company: FooterLink[] = [
  { href: '/about', label: 'About ShipEast' },
  { href: '/legal/terms', label: 'Terms of service' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/refunds', label: 'Refunds and cancellations' },
  { href: '/legal/substitutions', label: 'Substitutions' },
  { href: '/legal/delivery', label: 'Delivery policy' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/photo-credits', label: 'Photo credits' },
]

/** This year in Jamaica. Cached for a day: Cache Components forbids an uncached `new Date()`. */
async function CopyrightYear() {
  'use cache'
  cacheLife('days')
  return (
    <>
      {new Intl.DateTimeFormat('en-US', { timeZone: 'America/Jamaica', year: 'numeric' }).format(
        new Date(),
      )}
    </>
  )
}

const linkClass =
  'inline-flex min-h-control items-center text-small text-on-oxblood-muted underline-offset-4 transition-colors duration-150 hover:text-on-dark hover:underline lg:min-h-9'

function Column({
  title,
  links,
  className,
  listClassName,
}: {
  title: string
  links: FooterLink[]
  className?: string
  listClassName?: string
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-small font-bold text-on-dark">{title}</h2>
      <ul className={cn('mt-3', listClassName)}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * The site footer on oxblood: the company and its contact up front, then Shop, Help and Company
 * links, then how to pay and the legal line.
 */
export function SiteFooter({
  settings,
  categories,
  parishList,
}: {
  settings: SiteSettings
  categories: { slug: string; name: string }[]
  /** `St. Thomas and Kingston`, or empty with no active zones. */
  parishList: string
}) {
  const waDigits = settings.whatsapp.replace(/\D/g, '')
  const phone = settings.phone ? formatJamaicanPhone(settings.phone) : null
  const bank = Boolean(settings.bankTransfer.bankName)
  const shop: FooterLink[] = [
    { href: '/shop', label: 'All departments' },
    ...categories.map((c) => ({ href: `/shop/${c.slug}`, label: c.name })),
    { href: '/baskets', label: 'Ready-made baskets' },
    { href: '/gifts', label: 'Gifts and occasions' },
    { href: '/monthly', label: 'Monthly orders' },
  ]

  return (
    <footer className="bg-oxblood text-on-dark on-dark-focus print:hidden">
      <div className="mx-auto max-w-wide gutter pt-16 pb-8 lg:pt-20">
        <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-4 md:col-span-3 lg:col-span-4">
            <Link href="/" className="rounded-sm" aria-label="ShipEast Shop & Send, home">
              <Wordmark onDark />
            </Link>
            <p className="max-w-sm text-small text-on-oxblood-muted">
              Groceries and everyday essentials, bought in Jamaica and delivered to your
              family&apos;s door in {parishList || 'Jamaica'}.
            </p>
            <ul>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className={cn(linkClass, 'gap-2 text-on-dark')}
                >
                  <Mail className="size-icon text-blush" aria-hidden />
                  {settings.email}
                </a>
              </li>
              {phone && (
                <li>
                  <a
                    href={`tel:+${phone.replace(/\D/g, '')}`}
                    className={cn(linkClass, 'gap-2 text-on-dark tabular-nums')}
                  >
                    <Phone className="size-icon text-blush" aria-hidden />
                    {phone}
                  </a>
                </li>
              )}
            </ul>
            {waDigits && (
              <ButtonLink href={`https://wa.me/${waDigits}`} variant="onDark" size="sm">
                <MessageCircle aria-hidden />
                WhatsApp us
              </ButtonLink>
            )}
          </div>

          {/* Phones: Shop and Help side by side, Company across both. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-3 md:grid-cols-3 md:gap-x-8 lg:col-span-8 lg:grid-cols-8">
            <Column title="Shop" links={shop} className="lg:col-span-2 lg:col-start-2" />
            <Column title="Help" links={help} className="lg:col-span-2" />
            <Column
              title="Company"
              links={company}
              className="col-span-2 md:col-span-1 lg:col-span-3"
              listClassName="grid grid-cols-2 gap-x-6 md:block"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-on-dark pt-8 text-small text-on-oxblood-muted lg:flex-row lg:items-center lg:justify-between">
          <p>
            Prices in US dollars. Pay with PayPal or a debit or credit card through PayPal
            {bank ? ', or by bank transfer' : ''}.
          </p>
          <p className="flex items-start gap-3">
            <JamaicaFlag className="mt-1 w-6" />
            <span>
              © <CopyrightYear /> {site.company}. St. Thomas, Jamaica.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
