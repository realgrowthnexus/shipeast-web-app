import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { site } from '@/lib/site'
import { JamaicaFlag } from './jamaica'
import { Wordmark } from './wordmark'

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All categories' },
      { href: '/baskets', label: 'Ready-made baskets' },
      { href: '/gifts', label: 'Gifts and occasions' },
      { href: '/monthly', label: 'Monthly orders' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/delivery', label: 'Delivery areas and fees' },
      { href: '/faq', label: 'Questions and answers' },
      { href: '/track', label: 'Track an order' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '/legal/terms', label: 'Terms of service' },
      { href: '/legal/privacy', label: 'Privacy' },
      { href: '/legal/refunds', label: 'Refunds and cancellations' },
      { href: '/legal/substitutions', label: 'Substitutions' },
      { href: '/legal/delivery', label: 'Delivery policy' },
      { href: '/legal/cookies', label: 'Cookies' },
      { href: '/photo-credits', label: 'Photo credits' },
    ],
  },
]

export function SiteFooter({ whatsapp, trn }: { whatsapp?: string; trn?: string }) {
  const waDigits = whatsapp?.replace(/\D/g, '')
  return (
    <footer className="bg-oxblood text-white print:hidden">
      <div className="mx-auto grid max-w-wide gap-10 gutter section-sm md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Wordmark onDark />
          <p className="max-w-xs text-on-oxblood-muted">
            We shop in Jamaica for your family and deliver the same day, with a photo of the receipt
            and a photo at the door.
          </p>
          <p className="flex items-center gap-3 font-semibold">
            <JamaicaFlag className="w-8" />
            Based in St. Thomas, Jamaica
          </p>
          {waDigits && (
            <a
              href={`https://wa.me/${waDigits}`}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-white/10 px-4 font-semibold hover:bg-white/15"
            >
              <MessageCircle className="size-5" aria-hidden />
              WhatsApp us
            </a>
          )}
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-3 font-bold text-blush">{col.title}</h2>
            <ul className="flex flex-col">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-on-oxblood-muted hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-wide flex-col gap-1 gutter py-6 text-small text-on-oxblood-muted sm:flex-row sm:justify-between">
          <p>
            {site.company}
            {trn && <>, TRN {trn}</>}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
