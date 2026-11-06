import { Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'
import type { Faq } from '@/lib/types'

const contactLink =
  'inline-flex min-h-control items-center gap-2 font-semibold text-crimson underline-offset-4 hover:underline'

/** S8: the doubts a first-time sender has, answered in place, with a person to write to. */
export function HomeQuestions({
  faqs,
  email,
  whatsapp,
}: {
  faqs: Faq[]
  email: string
  /** Digits only, or empty. */
  whatsapp: string
}) {
  return (
    <section aria-labelledby="questions-title" className="bg-surface section">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-4">
          <h2 id="questions-title" className="text-h2 text-balance text-ink">
            Questions senders ask first
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            Can&apos;t find yours? Read every answer, or write to us.
          </p>
          <ul className="mt-6 flex flex-col gap-1">
            <li>
              <Link href="/faq" className={contactLink}>
                All questions and answers
              </Link>
            </li>
            <li>
              <a href={`mailto:${email}`} className={contactLink}>
                <Mail className="size-icon" aria-hidden />
                {email}
              </a>
            </li>
            {whatsapp && (
              <li>
                <a href={`https://wa.me/${whatsapp}`} className={contactLink}>
                  <MessageCircle className="size-icon" aria-hidden />
                  WhatsApp us
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-8 lg:col-span-8 lg:mt-0">
          <Accordion
            anchors
            items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))}
          />
        </div>
      </div>
    </section>
  )
}
