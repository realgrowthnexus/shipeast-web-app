import { Clock3, Mail, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { getSettings } from '@/lib/data/site'
import { site } from '@/lib/site'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Message ShipEast by WhatsApp or email about an order, delivery or payment.',
}

export default async function ContactPage() {
  const settings = await getSettings()
  const wa = settings.whatsapp.replace(/\D/g, '')

  return (
    <>
      <PageIntro title="Contact us">
        Questions about an order, delivery to your area or paying?{' '}
        {wa ? 'WhatsApp is quickest.' : 'Send us a message and we’ll reply by email.'}
      </PageIntro>
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.6fr]">
        <aside className="flex flex-col gap-4">
          {wa && (
            <a
              href={`https://wa.me/${wa}`}
              className="flex items-center gap-4 rounded-lg bg-crimson p-5 text-white shadow-lift"
            >
              <MessageCircle className="size-8 shrink-0 text-blush" aria-hidden />
              <span>
                <span className="block text-lg font-bold">WhatsApp us</span>
                <span className="text-white/80">{settings.whatsapp}</span>
              </span>
            </a>
          )}
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-lg border border-line bg-blush-100 p-5 hover:border-blush"
          >
            <Mail className="size-7 shrink-0 text-crimson" aria-hidden />
            <span>
              <span className="block font-bold text-ink">Email</span>
              <span className="text-ink-muted">{site.email}</span>
            </span>
          </a>
          <p className="flex items-start gap-3 p-1 text-ink-muted">
            <Clock3 className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
            {/* PLACEHOLDER hours until ShipEast confirms them. */}
            We reply within one working day, usually sooner.
          </p>
        </aside>
        <section aria-labelledby="form-h">
          <h2 id="form-h" className="mb-6 text-2xl font-extrabold tracking-tight text-ink">
            Send us a message
          </h2>
          <ContactForm />
        </section>
      </Container>
    </>
  )
}
