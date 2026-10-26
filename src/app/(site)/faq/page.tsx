import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/reveal'
import { FaqList } from '@/components/pages/guide/faq-list'
import { GuideHero } from '@/components/pages/guide/guide-hero'
import { Section } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { getFaqs, getSettings } from '@/lib/data/site'
import { site } from '@/lib/site'
import type { Faq } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Questions and answers',
  description: 'Answers about ordering, paying, substitutions, delivery, refunds and accounts.',
}

const groups: Faq['group'][] = [
  'Ordering',
  'Payment',
  'Substitutions',
  'Delivery',
  'Refunds',
  'Account',
]

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSettings()])
  const present = groups.filter((g) => faqs.some((f) => f.group === g))
  const wa = settings.whatsapp.replace(/\D/g, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <GuideHero
        eyebrow="Help"
        title="Questions and answers"
        lead={
          <>
            Ordering, paying, out-of-stock items, delivery and refunds, answered plainly. Can’t find
            what you need?{' '}
            <Link href="/contact" className="font-semibold text-white underline">
              Contact us
            </Link>{' '}
            and we’ll answer.
          </>
        }
      />

      <div>
        {present.length > 1 && (
          <nav
            aria-label="Topics"
            className="sticky top-16 z-30 border-b border-line bg-surface sm:top-18"
          >
            <ul className="mx-auto flex w-full max-w-page [scrollbar-width:none] gap-2 overflow-x-auto gutter py-3">
              {present.map((g) => (
                <li key={g} className="shrink-0">
                  <a
                    href={`#${g.toLowerCase()}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas px-4 font-semibold text-ink transition-colors duration-150 hover:border-crimson hover:bg-surface-tint"
                  >
                    {g}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Section aria-label="All questions">
          <div className="flex flex-col gap-16 lg:gap-20">
            {present.map((g) => {
              const items = faqs.filter((f) => f.group === g)
              return (
                <section
                  key={g}
                  id={g.toLowerCase()}
                  aria-labelledby={`${g}-h`}
                  className="grid scroll-mt-40 gap-6 lg:grid-cols-12 lg:gap-16"
                >
                  <Reveal className="lg:col-span-4">
                    <p className="mb-2 eyebrow text-crimson">
                      {items.length} {items.length === 1 ? 'question' : 'questions'}
                    </p>
                    <h2 id={`${g}-h`} className="text-h2 text-ink">
                      {g}
                    </h2>
                  </Reveal>
                  <Reveal className="lg:col-span-8" delay={0.05}>
                    <FaqList faqs={items} />
                  </Reveal>
                </section>
              )
            })}
          </div>
        </Section>
      </div>

      <Section tone="tint" wide aria-labelledby="help-h">
        <Reveal className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-12">
          <StockPhoto
            name="contactPhone"
            sizes="(min-width: 1024px) 500px, 100vw"
            className="aspect-video rounded-none lg:col-span-5 lg:aspect-auto lg:min-h-full"
          />
          <div className="flex flex-col items-start gap-6 p-card-lg sm:p-12 lg:col-span-7">
            <div>
              <p className="mb-3 eyebrow text-crimson">Still need help?</p>
              <h2 id="help-h" className="text-h2 text-balance text-ink">
                Ask us, and we’ll get back to you
              </h2>
              <p className="mt-3 max-w-xl text-lead text-ink-body">
                Questions about an order, your parish or paying
                {wa ? '? WhatsApp is quickest.' : '? Email us and we’ll reply.'}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              {wa && (
                <a
                  href={`https://wa.me/${wa}`}
                  className="inline-flex min-h-13 items-center gap-3 rounded-md bg-crimson px-6 font-semibold text-white transition-colors duration-150 hover:bg-crimson-deep"
                >
                  <MessageCircle className="size-5 shrink-0" aria-hidden />
                  WhatsApp {settings.whatsapp}
                </a>
              )}
              <a
                href={`mailto:${site.email}`}
                className={
                  wa
                    ? 'inline-flex min-h-13 items-center gap-3 rounded-md border-[1.5px] border-crimson px-6 font-semibold text-crimson transition-colors duration-150 hover:bg-surface-tint'
                    : 'inline-flex min-h-13 items-center gap-3 rounded-md bg-crimson px-6 font-semibold text-white transition-colors duration-150 hover:bg-crimson-deep'
                }
              >
                <Mail className="size-5 shrink-0" aria-hidden />
                {site.email}
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-crimson hover:underline"
            >
              All the ways to reach us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
