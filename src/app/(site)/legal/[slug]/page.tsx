import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, PageIntro } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { LEGAL_SLUGS, getLegalPage } from '@/lib/data/legal'
import { formatDate } from '@/lib/format'

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/legal/[slug]'>): Promise<Metadata> {
  const page = await getLegalPage((await params).slug)
  return page ? { title: page.title, description: page.summary } : {}
}

const titles: Record<string, string> = {
  terms: 'Terms',
  privacy: 'Privacy',
  refunds: 'Refunds',
  substitutions: 'Substitutions',
  delivery: 'Delivery',
  cookies: 'Cookies',
}

export default async function LegalPage({ params }: PageProps<'/legal/[slug]'>) {
  const { slug } = await params
  const page = await getLegalPage(slug)
  if (!page) notFound()

  return (
    <>
      <PageIntro title={page.title}>
        {page.summary}
        <span className="mt-2 block text-sm">
          Last updated {formatDate(`${page.updated}T12:00:00Z`)}
        </span>
      </PageIntro>
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Policies" className="lg:sticky lg:top-24 lg:h-fit">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {LEGAL_SLUGS.map((s) => (
              <li key={s}>
                <Link
                  href={`/legal/${s}`}
                  aria-current={s === slug ? 'page' : undefined}
                  className="inline-flex min-h-11 items-center rounded-md px-3 font-semibold text-ink hover:bg-blush-200 aria-[current=page]:bg-crimson aria-[current=page]:text-white lg:w-full"
                >
                  {titles[s]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-prose">
          {page.draft && (
            <Alert tone="warn" title="Draft wording" className="mb-8">
              ShipEast will review this policy before the site goes live.
            </Alert>
          )}
          {page.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-ink">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 40)} className="mb-3 text-ink">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </>
  )
}
