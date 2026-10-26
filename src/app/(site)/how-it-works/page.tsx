import {
  ArrowRight,
  Ban,
  Camera,
  Clock3,
  CreditCard,
  DollarSign,
  Landmark,
  MessageCircleQuestion,
  MessageSquareText,
  Replace,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Stagger, StaggerItem, Reveal } from '@/components/motion/reveal'
import { ProofPair } from '@/components/order/proof-pair'
import { FaqList } from '@/components/pages/guide/faq-list'
import { GuideHero } from '@/components/pages/guide/guide-hero'
import { StageTimeline } from '@/components/pages/guide/stage-timeline'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { getActiveZones, getFaqs, getSettings } from '@/lib/data/site'
import { formatClockTime } from '@/lib/format'
import { TRACKER_STAGES } from '@/lib/order-status'
import { availablePaymentMethods } from '@/lib/orders/payment-methods'
import type { StockPhotoKey } from '@/lib/stock-photos'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import type { Faq, SubstitutionRule } from '@/lib/types'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Follow one order from a laptop in Brooklyn to a door in Morant Bay: what you pay, what our driver does, and the proof you get.',
}

const stageText: Record<(typeof TRACKER_STAGES)[number]['key'], string> = {
  paid: 'Your payment is in. You get a receipt by email and a tracking link to share with family.',
  confirmed: 'We check the order and give it to a driver who knows the area.',
  shopping: 'The driver is in the store, ticking items off your list one by one.',
  shopped: 'Everything is bought. You get a photo of the store receipt.',
  out_for_delivery: 'The driver is on the way. Your family gets a text so they are ready.',
  delivered: 'Handed over at the door. You get a photo and the name of who received it.',
  closed: 'Any refund for missing items is sent and the order is finished.',
}

const chapters: { photo: StockPhotoKey; eyebrow: string; title: string; body: string[] }[] = [
  {
    photo: 'stepOrder',
    eyebrow: 'Where you are',
    title: 'You fill the basket from abroad',
    body: [
      'Pick Groceries, household goods, pharmacy or baby items, or start from a ready-made basket. Add the address in Jamaica and a phone number the driver can call.',
      'You pay in US dollars and get an email receipt with a tracking link you can share.',
    ],
  },
  {
    photo: 'stepShop',
    eyebrow: 'In Jamaica',
    title: 'Our driver shops for you',
    body: [
      'A ShipEast driver buys every item at a local store, just as you would. Nothing is shipped: only the money crosses the border.',
      'If something is out of stock, the driver follows the choice you made at checkout. When the shopping is done, you get a photo of the till receipt.',
    ],
  },
  {
    photo: 'stepDoor',
    eyebrow: 'At their door',
    title: 'Your family receives it',
    body: [
      'Your family gets a text when the driver sets off, so someone is ready at the gate.',
      'The driver hands the order over and takes a photo at the door. You see it on your tracking page, with the name of who received it.',
    ],
  },
]

const ruleIcons: Record<SubstitutionRule, typeof Replace> = {
  allow_similar: Replace,
  ask_first: MessageCircleQuestion,
  leave_out: Ban,
}

const faqGroups: Faq['group'][] = ['Ordering', 'Payment', 'Substitutions', 'Delivery']

export default async function HowItWorksPage() {
  const [zones, faqs, settings] = await Promise.all([getActiveZones(), getFaqs(), getSettings()])
  const cutoff = formatClockTime(zones[0]?.cutoffTime ?? '13:00')
  const methods = availablePaymentMethods(settings)
  const bankTransfer = methods.includes('bank_transfer')
  const picked = faqGroups
    .map((g) => faqs.find((f) => f.group === g))
    .filter((f): f is Faq => Boolean(f))

  return (
    <>
      <GuideHero
        eyebrow="How it works"
        title="You order from abroad. We shop and deliver in Jamaica."
        lead="One order, from a laptop in Brooklyn to a door in Morant Bay. You pay online in US dollars, our driver buys everything locally, and you get a photo of the receipt and a photo at the door."
        photo="guideProduce"
      >
        <ul className="flex flex-col gap-3 text-white sm:flex-row sm:flex-wrap sm:gap-x-8">
          <li className="flex items-center gap-2 font-semibold">
            <Clock3 className="size-5 shrink-0 text-blush" aria-hidden />
            Same day if paid by {cutoff}
          </li>
          <li className="flex items-center gap-2 font-semibold">
            <Camera className="size-5 shrink-0 text-blush" aria-hidden />
            Receipt photo and door photo
          </li>
          <li className="flex items-center gap-2 font-semibold">
            <DollarSign className="size-5 shrink-0 text-blush" aria-hidden />
            Pay in US dollars
          </li>
        </ul>
      </GuideHero>

      <Section size="lg" wide aria-labelledby="chapters-h">
        <SectionHeader
          id="chapters-h"
          eyebrow="One order, three places"
          title="From your basket to their door"
          lead="Three people take part in every order: you, our driver and your family. Here is what each of you sees."
        />
        <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {chapters.map((c, i) => (
            <PhotoFeature
              key={c.title}
              photo={c.photo}
              side={i % 2 === 1 ? 'end' : 'start'}
              parallax={i === 1}
              aspect="aspect-4/3 sm:aspect-video lg:aspect-4/5"
            >
              <p className="text-numeral text-signal tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-4 eyebrow text-crimson">{c.eyebrow}</p>
              <h3 className="mt-2 text-h2 text-balance text-ink">{c.title}</h3>
              {c.body.map((p) => (
                <p key={p} className="mt-4 max-w-xl text-lead text-ink-body">
                  {p}
                </p>
              ))}
            </PhotoFeature>
          ))}
        </div>
      </Section>

      <Section tone="surface" wide aria-labelledby="stages-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                id="stages-h"
                eyebrow="Tracking"
                title="Seven steps you can follow"
                lead="Your tracking page shows each step with the time it happened. Share the link and your family can follow along too."
              />
              <Reveal className="mt-8" delay={0.1}>
                <ButtonLink href="/track" variant="outline">
                  Track an order
                  <ArrowRight aria-hidden />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <StageTimeline
              stages={TRACKER_STAGES.map((s) => ({
                key: s.key,
                label: s.label,
                text: stageText[s.key],
              }))}
            />
          </div>
        </div>
      </Section>

      <Section tone="crimson" wide aria-labelledby="proof-h">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="proof-h"
              onDark
              eyebrow="Proof on every order"
              title="Two photos, so you never have to wonder"
              lead="The receipt from the store, and the order in your family’s hands. Both arrive on your tracking page and by email."
            />
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ProofPair
              tilt
              onDark
              className="mx-auto max-w-2xl"
              receipt={{
                store: 'PRICESMART',
                lines: [
                  { name: 'Baby Diapers, Size 3', cents: 4290 },
                  { name: 'Baby Wipes', cents: 2390 },
                  { name: 'Infant Formula', cents: 4590 },
                ],
                totalCents: 11270,
                at: '2026-10-25T16:10:00Z',
              }}
              door={{
                recipient: 'Paulette Brown',
                place: 'Yallahs, St. Thomas',
                at: '2026-10-25T18:20:00Z',
              }}
            />
          </Reveal>
        </div>
      </Section>

      <Section wide aria-labelledby="subs-h">
        <SectionHeader
          id="subs-h"
          eyebrow="Out of stock"
          title="Shelves run out. You decide what happens."
          lead="At checkout you choose what the driver does if an item is missing. The tracking page shows every item as found, swapped or missing."
        />
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {SUBSTITUTION_RULES.map((r) => {
            const Icon = ruleIcons[r.value]
            return (
              <StaggerItem
                key={r.value}
                className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg"
              >
                <span className="grid size-12 place-items-center rounded-full bg-surface-tint">
                  <Icon className="size-6 text-crimson" aria-hidden />
                </span>
                <h3 className="text-h3 text-ink">{r.title}</h3>
                <p className="text-ink-body">{r.body}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Section>

      <Section tone="tint" wide aria-labelledby="family-h">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" y={0}>
            <StockPhoto
              name="familyPhone"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="aspect-4/3 rounded-2xl sm:aspect-video lg:aspect-4/5"
            />
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeader
              id="family-h"
              eyebrow="For your family"
              title="Nothing to install. Just two texts."
              lead="No app and no account. Your family gets one text when the driver sets off and one when the order is delivered."
            />
            <Stagger as="div" className="mt-8 flex flex-col gap-3" delay={0.15}>
              {[
                'ShipEast: Hi Marcia, Andre’s groceries are on the way with Kemar. He will call 1-876-555-0142 when he arrives.',
                'ShipEast: Your order from Andre has been delivered. Thank you!',
              ].map((sms) => (
                <StaggerItem
                  as="p"
                  key={sms}
                  className="flex max-w-md gap-3 rounded-xl rounded-bl-sm border border-line bg-surface p-card text-ink"
                >
                  <MessageSquareText className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
                  <span>
                    <span className="sr-only">Example text message: </span>
                    {sms}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-8" delay={0.2}>
              <p className="max-w-xl text-ink-body">
                Orders paid before <strong className="text-ink">{cutoff}</strong> are delivered the
                same day. Later orders arrive the next day.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section wide tone="surface" aria-labelledby="pay-h">
        <SectionHeader
          id="pay-h"
          eyebrow="Paying"
          title="Pay in US dollars, from wherever you are"
          lead="Prices are in US dollars, with the Jamaican dollar amount shown for reference. You pay before we shop, so the driver never asks your family for money."
        />
        <Stagger className={`mt-10 grid gap-4 ${bankTransfer ? 'md:grid-cols-2' : 'max-w-xl'}`}>
          <StaggerItem className="flex flex-col gap-4 rounded-lg border border-line bg-canvas p-card-lg">
            <span className="grid size-12 place-items-center rounded-full bg-surface-tint">
              <CreditCard className="size-6 text-crimson" aria-hidden />
            </span>
            <h3 className="text-h3 text-ink">PayPal, or a card through PayPal</h3>
            <p className="text-ink-body">
              Use your PayPal account, or pay with a debit or credit card as a guest. No PayPal
              account needed.
            </p>
          </StaggerItem>
          {bankTransfer && (
            <StaggerItem className="flex flex-col gap-4 rounded-lg border border-line bg-canvas p-card-lg">
              <span className="grid size-12 place-items-center rounded-full bg-surface-tint">
                <Landmark className="size-6 text-crimson" aria-hidden />
              </span>
              <h3 className="text-h3 text-ink">Bank transfer</h3>
              <p className="text-ink-body">
                Send the total within {settings.bankTransferHoursToPay} hours, with your order
                number as the reference. We confirm it and schedule the shopping once the money
                arrives.
              </p>
            </StaggerItem>
          )}
        </Stagger>
      </Section>

      {picked.length > 0 && (
        <Section wide aria-labelledby="hiw-faq-h">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader id="hiw-faq-h" eyebrow="Questions" title="What senders ask first" />
              <Reveal className="mt-6" delay={0.1}>
                <Link
                  href="/faq"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-crimson hover:underline"
                >
                  See all questions
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <FaqList faqs={picked} />
            </Reveal>
          </div>
        </Section>
      )}

      <CtaBand
        title="Fill a basket for home today"
        photo="stepFamily"
        secondary={{ href: '/baskets', label: 'See ready-made baskets' }}
      >
        Pay before {cutoff} and it is at their door the same day, with a photo to prove it.
      </CtaBand>
    </>
  )
}
