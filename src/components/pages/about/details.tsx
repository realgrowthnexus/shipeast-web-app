import { Mail, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { formatJamaicanPhone } from '@/lib/format'
import { site } from '@/lib/site'
import type { SiteSettings } from '@/lib/types'

/** The owner row stays hidden until Derion approves the wording. */
const SHOW_OWNER = false

const contactLink =
  'inline-flex min-h-control items-center gap-3 font-semibold break-all text-ink hover:text-crimson'

/**
 * S5: "who you're dealing with" in one bordered card a sender could screenshot, with every way
 * to reach a person beside it. Rows that ShipEast hasn't provided yet (TRN, address, owner) are
 * left out of the page entirely.
 */
export function AboutDetails({
  settings,
  parishList,
}: {
  settings: SiteSettings
  parishList: string
}) {
  const phone = settings.phone ? formatJamaicanPhone(settings.phone) : null
  const whatsappDigits = settings.whatsapp.replace(/\D/g, '')
  const whatsapp = settings.whatsapp ? formatJamaicanPhone(settings.whatsapp) : null
  const rows: { term: string; value: React.ReactNode; wide?: boolean }[] = [
    { term: 'Registered name', value: site.company, wide: true },
    { term: 'Based in', value: 'St. Thomas, Jamaica' },
    ...(parishList ? [{ term: 'Delivering in', value: parishList }] : []),
    {
      term: 'Website',
      value: (
        <Link
          href="/"
          className="inline-flex min-h-control items-center font-semibold text-crimson underline-offset-4 hover:underline"
        >
          {new URL(site.url).host}
        </Link>
      ),
    },
    ...(site.trn ? [{ term: 'TRN', value: site.trn }] : []),
    ...(site.registeredAddress
      ? [
          {
            term: 'Registered address',
            value: (
              <address className="whitespace-pre-line not-italic">{site.registeredAddress}</address>
            ),
          },
        ]
      : []),
    ...(SHOW_OWNER ? [{ term: 'Owner', value: 'Derion Scarlett' }] : []),
  ]

  return (
    <section
      id="company-details"
      aria-labelledby="details-title"
      className="scroll-mt-header section"
    >
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
        <div className="max-w-2xl lg:col-span-12">
          <h2 id="details-title" className="text-h2 text-balance text-ink">
            Who you&apos;re dealing with
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            A registered Jamaican company, and people you can reach.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-line bg-surface p-card md:p-card-lg lg:col-span-7 lg:mt-10">
          <dl className="grid gap-x-8 md:grid-cols-2">
            {rows.map(({ term, value, wide }) => (
              <div
                key={term}
                className={cn(
                  'border-b border-line py-4 last:border-0',
                  wide && 'pt-0 md:col-span-2',
                )}
              >
                <dt className="text-small text-ink-muted">{term}</dt>
                <dd
                  className={cn(
                    'mt-1 font-semibold break-words text-ink',
                    wide ? 'text-title' : 'text-body',
                  )}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 lg:col-span-5 lg:mt-10">
          <h3 className="text-h3 text-ink">Talk to us</h3>
          <ul className="mt-3 flex flex-col">
            <li>
              <a href={`mailto:${settings.email}`} className={contactLink}>
                <Mail className="size-icon shrink-0 text-crimson" aria-hidden />
                {settings.email}
              </a>
            </li>
            {phone && (
              <li>
                <a
                  href={`tel:+${settings.phone.replace(/\D/g, '')}`}
                  className={cn(contactLink, 'tabular-nums')}
                >
                  <Phone className="size-icon shrink-0 text-crimson" aria-hidden />
                  {phone}
                </a>
              </li>
            )}
            {whatsapp && whatsappDigits && (
              <li>
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  className={cn(contactLink, 'tabular-nums')}
                >
                  <MessageCircle className="size-icon shrink-0 text-crimson" aria-hidden />
                  WhatsApp {whatsapp}
                </a>
              </li>
            )}
          </ul>
          <p className="mt-3 text-small text-ink-muted">
            If it&apos;s about an order, include the order number.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/track" variant="outline">
              Track an order
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
