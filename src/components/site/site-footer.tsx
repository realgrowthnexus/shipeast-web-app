import { ChevronDown, MessageCircle } from 'lucide-react'
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
    <footer className="border-t border-line bg-canvas text-ink print:hidden">
      <div className="mx-auto grid max-w-wide grid-cols-2 gap-x-6 gap-y-8 gutter section-sm md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-10">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Wordmark />
          <p className="max-w-xs text-small text-ink-body">
            We shop in Jamaica for your family and deliver the same day, with a photo of the receipt
            and a photo at the door.
          </p>
          <p className="flex items-center gap-3 text-small font-semibold">
            <JamaicaFlag className="w-8" />
            Based in St. Thomas, Jamaica
          </p>
          {waDigits && (
            <a
              href={`https://wa.me/${waDigits}`}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-line-strong bg-surface px-4 font-semibold hover:border-crimson hover:text-crimson"
            >
              <MessageCircle className="size-5" aria-hidden />
              WhatsApp us
            </a>
          )}
        </div>
        {columns.map((col) => {
          const list = (
            <ul className="flex flex-col">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-small text-ink-body hover:text-crimson"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )
          // Policies fold away on phones; Shop and Help sit side by side
          return col.title === 'Policies' ? (
            <nav key={col.title} aria-label={col.title} className="col-span-2 md:col-span-1">
              <details className="group md:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {col.title}
                  <ChevronDown
                    className="size-5 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                {list}
              </details>
              <div className="hidden md:block">
                <h2 className="mb-2 font-bold text-ink">{col.title}</h2>
                {list}
              </div>
            </nav>
          ) : (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-2 font-bold text-ink">{col.title}</h2>
              {list}
            </nav>
          )
        })}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-wide flex-col gap-1 gutter py-6 text-small text-ink-muted sm:flex-row sm:justify-between">
          <p>
            {site.company}
            {trn && <>, TRN {trn}</>}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-crimson">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
