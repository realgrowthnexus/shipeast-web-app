import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageIntro } from '@/components/site/page-intro'
import { Accordion } from '@/components/ui/accordion'
import { getFaqs } from '@/lib/data/site'
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
  const faqs = await getFaqs()
  const present = groups.filter((g) => faqs.some((f) => f.group === g))

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
      <PageIntro eyebrow="Help" title="Questions and answers">
        Can’t find what you need?{' '}
        <Link href="/contact" className="font-semibold text-crimson underline">
          Contact us
        </Link>{' '}
        and we’ll answer.
      </PageIntro>
      <Container className="grid gap-10 section-sm lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Topics" className="lg:sticky lg:top-24 lg:h-fit">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {present.map((g) => (
              <li key={g}>
                <a
                  href={`#${g.toLowerCase()}`}
                  className="inline-flex min-h-11 items-center rounded-md border border-line bg-surface px-3 font-semibold text-ink hover:border-blush lg:w-full lg:border-0 lg:bg-transparent lg:hover:bg-surface-tint"
                >
                  {g}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-10">
          {present.map((g) => (
            <section
              key={g}
              id={g.toLowerCase()}
              aria-labelledby={`${g}-h`}
              className="scroll-mt-24"
            >
              <h2 id={`${g}-h`} className="mb-4 text-h2 text-ink">
                {g}
              </h2>
              <Accordion
                items={faqs
                  .filter((f) => f.group === g)
                  .map((f) => ({ id: f.id, title: f.question, body: f.answer }))}
              />
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
