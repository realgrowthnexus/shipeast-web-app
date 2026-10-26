import { Wrench } from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/site/page-intro'
import { getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Back soon',
  robots: { index: false },
}

/** Shown while maintenance mode is on (switched in admin settings, enforced by the proxy). */
export default async function MaintenancePage() {
  const { whatsapp, email } = await getSettings()
  return (
    <Container className="flex flex-col items-start gap-4 py-24 sm:py-32">
      <Wrench className="size-12 text-crimson" strokeWidth={1.5} aria-hidden />
      <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
        We’ll be back soon
      </h1>
      <p className="max-w-xl text-lg text-ink-muted">
        We’re making a few changes to the site. Orders already placed are still being shopped and
        delivered as normal. For anything urgent,{' '}
        {whatsapp ? `WhatsApp us on ${whatsapp}.` : `email ${email}.`}
      </p>
    </Container>
  )
}
