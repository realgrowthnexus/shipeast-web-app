import { Mail, Phone } from 'lucide-react'
import { cacheLife } from 'next/cache'
import Link from 'next/link'
import { JamaicaFlag } from '@/components/site/jamaica'
import { formatJamaicanPhone } from '@/lib/format'
import { site } from '@/lib/site'
import type { SiteSettings } from '@/lib/types'

type FooterLink = { href: string; label: string }

/* Four links a list, twelve in all (owner, November 13): the pages a sender actually looks for.
   Departments live in the header; contact details sit beside the logo; the rest of the policies
   are linked where they apply (cookie banner, delivery page) and in the sitemap. */
const shop: FooterLink[] = [
  { href: '/shop', label: 'Shop all' },
  { href: '/baskets', label: 'Ready-made baskets' },
  { href: '/gifts', label: 'Gifts and occasions' },
  { href: '/monthly', label: 'Monthly orders' },
]

const help: FooterLink[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/delivery', label: 'Delivery areas and fees' },
  { href: '/track', label: 'Track an order' },
  { href: '/faq', label: 'Questions and answers' },
]

const company: FooterLink[] = [
  { href: '/about', label: 'About ShipEast' },
  { href: '/legal/terms', label: 'Terms of service' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/refunds', label: 'Refunds and cancellations' },
]

const linkClass =
  'inline-flex min-h-11 items-center text-small lg:min-h-8 text-on-oxblood-muted underline-offset-4 transition-colors duration-150 hover:text-on-dark hover:underline'

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

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-body font-semibold text-on-dark">{title}</h2>
      <ul className="mt-3">
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
 * The home footer: the client's tagline, how to reach us (email and phone), and three short
 * lists of four links each.
 */
export function HomeFooter({
  settings,
  parishList,
}: {
  settings: SiteSettings
  parishList: string
}) {
  const phone = settings.phone ? formatJamaicanPhone(settings.phone) : null
  const bank = Boolean(settings.bankTransfer.bankName)
  return (
    <footer className="bg-oxblood text-on-dark on-dark-focus print:hidden">
      <div className="mx-auto max-w-wide gutter pt-10 md:pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-sm font-display text-h3 font-semibold text-balance text-on-dark">
              We shop. We deliver. We care.
            </p>
            <p className="mt-3 max-w-sm text-on-oxblood-muted">
              Groceries and everyday essentials, bought in Jamaica and delivered to your
              family&rsquo;s door{parishList ? ` in ${parishList}` : ''}.
            </p>
            <ul className="mt-5">
              <li>
                <a href={`mailto:${settings.email}`} className={linkClass + ' gap-2'}>
                  <Mail className="size-icon" aria-hidden />
                  {settings.email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:+${phone.replace(/\D/g, '')}`} className={linkClass + ' gap-2'}>
                    <Phone className="size-icon" aria-hidden />
                    {phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <Column title="Shop" links={shop} />
            <Column title="Help" links={help} />
            <Column title="Company" links={company} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-on-dark pt-8 pb-10 text-small text-on-oxblood-muted lg:flex-row lg:items-center lg:justify-between">
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
