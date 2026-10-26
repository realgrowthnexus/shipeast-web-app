import {
  Baby,
  BookOpen,
  Cookie,
  MessageSquareText,
  Pill,
  Search,
  ShoppingBag,
  SprayCan,
  ThumbsUp,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { PhotoHero } from '@/components/pages/company/photo-hero'
import { Steps } from '@/components/pages/company/steps'
import { Section, SectionHeader } from '@/components/site/section'
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

/** Kinds of item, not real requests: a prompt for what can be asked for. */
const examples = [
  { icon: Baby, text: 'A brand or size of formula or diapers we don’t list' },
  { icon: Pill, text: 'Over-the-counter pharmacy items' },
  { icon: SprayCan, text: 'A particular soap, detergent or cleaner' },
  { icon: Cookie, text: 'A favourite snack, drink or seasoning' },
  { icon: BookOpen, text: 'School supplies for the new term' },
  { icon: ShoppingBag, text: 'Small household things, like a kettle or a fan' },
]

export default async function RequestPage() {
  const [settings, zones] = await Promise.all([getSettings(), getActiveZones()])
  const on = settings.features.item_requests

  const steps = on
    ? [
        {
          icon: MessageSquareText,
          title: 'You ask',
          body: 'Tell us the item, the brand and size, how many, and the parish it’s going to.',
        },
        {
          icon: Search,
          title: 'We check and price it',
          body: 'We look in the stores in Jamaica and email you a price, usually the same day.',
        },
        {
          icon: ThumbsUp,
          title: 'You accept and pay',
          body: 'You only pay once you accept the price. Then we shop and deliver it like any order.',
        },
      ]
    : [
        {
          icon: MessageSquareText,
          title: 'You message us',
          body: 'Tell us the item, the brand and size, how many, and the parish it’s going to.',
        },
        {
          icon: Search,
          title: 'We check the stores',
          body: 'We look for it in the stores in Jamaica.',
        },
        {
          icon: ThumbsUp,
          title: 'We let you know',
          body: 'We reply within one working day to say whether we can buy it for you.',
        },
      ]

  return (
    <>
      <PhotoHero
        eyebrow="Request an item"
        title="Can’t find it in the shop?"
        photo="staples"
        lead={
          on
            ? 'Tell us what you need. We check the stores, send you a price, and you only pay once you accept it.'
            : 'Tell us what you need and we’ll let you know if we can buy it for you.'
        }
      />

      <Section aria-labelledby="request-steps-h">
        <SectionHeader eyebrow="How it works" id="request-steps-h" title="Three steps" />
        <div className="mt-10">
          <Steps steps={steps} />
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="request-form-h">
        <div className="mx-auto max-w-3xl">
          {on ? (
            <>
              <Reveal>
                <p className="mb-3 eyebrow text-crimson">Your request</p>
                <h2 id="request-form-h" className="text-h2 text-ink">
                  Tell us what you need
                </h2>
              </Reveal>
              <Card className="mt-8 bg-canvas p-card-lg">
                <RequestForm zones={zones.map(({ id, parish }) => ({ id, parish }))} />
              </Card>
            </>
          ) : (
            <Reveal>
              <Card className="flex flex-col items-start gap-4 bg-canvas p-card-lg sm:p-12">
                <span className="grid size-14 place-items-center rounded-full bg-surface-tint text-crimson">
                  <MessageSquareText className="size-7" aria-hidden />
                </span>
                <h2 id="request-form-h" className="text-h2 text-ink">
                  Send us a message
                </h2>
                <p className="text-lead text-ink-body">
                  Include the item, the brand and size, how many you need and the parish it’s going
                  to. We reply within one working day.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" size="lg">
                    Message us
                  </ButtonLink>
                  {settings.whatsapp && (
                    <ButtonLink
                      href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                      variant="outline"
                      size="lg"
                    >
                      WhatsApp {formatJamaicanPhone(settings.whatsapp)}
                    </ButtonLink>
                  )}
                </div>
              </Card>
            </Reveal>
          )}
        </div>
      </Section>

      <Section aria-labelledby="examples-h">
        <SectionHeader
          eyebrow="Ideas"
          id="examples-h"
          title="Things you can ask for"
          lead="If it’s sold in a store in St. Thomas or Kingston, ask. We’ll tell you honestly if we can’t get it."
        />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map(({ icon: Icon, text }) => (
            <StaggerItem
              key={text}
              className="flex items-center gap-4 rounded-lg border border-line bg-surface p-card"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="font-semibold text-ink">{text}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
