import { MessageSquareText } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getActiveZones, getSettings } from '@/lib/data/site'
import { formatJamaicanPhone } from '@/lib/format'
import { RequestForm } from './request-form'

export const metadata: Metadata = {
  title: 'Request an item',
  description:
    'Need something we don’t list? Tell us and we’ll check the stores in Jamaica for you.',
}

export default async function RequestPage() {
  const [settings, zones] = await Promise.all([getSettings(), getActiveZones()])
  const on = settings.features.item_requests

  return (
    <>
      <PageIntro title="Can’t find it in the shop?">
        {on
          ? 'Tell us what you need. We check the stores, send you a price, and you only pay once you accept it.'
          : 'Tell us what you need and we’ll let you know if we can buy it for you.'}
      </PageIntro>
      <Container className="max-w-3xl py-12">
        {on ? (
          <Card className="p-5 sm:p-8">
            <RequestForm zones={zones.map(({ id, parish }) => ({ id, parish }))} />
          </Card>
        ) : (
          <Card className="flex flex-col items-start gap-4 p-6 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-blush-200 text-crimson">
              <MessageSquareText className="size-6" aria-hidden />
            </span>
            <h2 className="text-xl font-bold text-ink">Send us a message</h2>
            <p className="text-ink">
              Include the item, the brand and size, how many you need and the parish it’s going to.
              We reply within one working day.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Message us</ButtonLink>
              {settings.whatsapp && (
                <ButtonLink
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  variant="outline"
                >
                  WhatsApp {formatJamaicanPhone(settings.whatsapp)}
                </ButtonLink>
              )}
            </div>
          </Card>
        )}
      </Container>
    </>
  )
}
