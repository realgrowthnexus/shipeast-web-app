import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'
import type { Faq } from '@/lib/types'

/** Questions (PLAN §3, row 10): the five doubts a first-time sender has, and a person to ask. */
export function HomeQuestions({
  faqs,
  email,
  whatsapp,
}: {
  faqs: Faq[]
  email: string
  /** Digits only, or empty when not set. */
  whatsapp: string
}) {
  return (
    <section aria-labelledby="home-questions" className="mx-auto max-w-wide gutter py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="home-questions" className="font-display text-h2 text-balance">
            Questions senders ask first
          </h2>
          <p className="mt-3 text-ink-body">Can&rsquo;t find yours? Ask a person.</p>
          <div className="mt-5 flex flex-col items-start gap-1">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                className="inline-flex min-h-control items-center gap-2 font-bold text-leaf underline-offset-4 hover:underline"
              >
                <MessageCircle className="size-icon" aria-hidden />
                Message us on WhatsApp
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="inline-flex min-h-control items-center gap-2 font-bold text-crimson underline-offset-4 hover:underline"
            >
              <Mail className="size-icon" aria-hidden />
              {email}
            </a>
            <Link
              href="/faq"
              className="inline-flex min-h-control items-center gap-2 font-bold text-crimson underline-offset-4 hover:underline"
            >
              All questions and answers
              <ArrowRight className="size-icon" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion
            items={faqs.map((f) => ({ id: f.id, title: f.question, body: <p>{f.answer}</p> }))}
          />
        </div>
      </div>
    </section>
  )
}
