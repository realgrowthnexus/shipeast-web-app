import {
  Baby,
  Banknote,
  CreditCard,
  PackageSearch,
  Pill,
  ShoppingBasket,
  SprayCan,
  Store,
  Truck,
  Wallet,
  Wheat,
} from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { DataTable } from '@/components/admin/data-table'
import { StatTile } from '@/components/admin/stat-tile'
import { ProofPair } from '@/components/order/proof-pair'
import { TrackingTimeline } from '@/components/order/tracking-timeline'
import { BasketCard, CategoryTile, ProductCard } from '@/components/shop/product-card'
import { HeroReceipt } from '@/components/pages/home/hero-receipt'
import { DemoBanner } from '@/components/site/demo-banner'
import { StockPhoto } from '@/components/site/stock-photo'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { Accordion } from '@/components/ui/accordion'
import { Alert } from '@/components/ui/alert'
import { Badge, StatusPill } from '@/components/ui/badge'
import { Button, ButtonLink, IconButton } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import {
  Checkbox,
  ChoiceGroup,
  Field,
  Input,
  PhoneInput,
  Select,
  Textarea,
  describedBy,
} from '@/components/ui/field'
import { Pagination } from '@/components/ui/pagination'
import { Price } from '@/components/ui/price'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { Tabs } from '@/components/ui/tabs'
import { baskets, categories, faqs, products, settings, zones } from '@/lib/demo'
import { isDemoMode } from '@/lib/env'
import { formatDate, formatUsd } from '@/lib/format'
import { buildReceipt, joinParishes } from '@/lib/home'
import { ORDER_STATUS } from '@/lib/order-status'
import type { OrderStatus } from '@/lib/types'
import { DialogDemo } from './dialog-demo'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

/** Role colours, grouped by job. Components use only these (see docs/TOKENS.md). */
const swatchGroups = [
  {
    title: 'Backgrounds',
    items: [
      ['page', '#F7F7F7', 'bg-page', 'The page behind everything'],
      ['surface', '#FFFFFF', 'bg-surface', 'Cards, inputs, panels, menus'],
      ['surface-muted', '#F0F0F0', 'bg-surface-muted', 'Wells, placeholders, icon discs, hover'],
      ['surface-strong', '#E5E5E5', 'bg-surface-strong', 'Hover on a muted fill'],
      ['surface-selected', '#FFE8EE', 'bg-surface-selected', 'The chosen option, search marks'],
    ],
  },
  {
    title: 'Brand',
    items: [
      ['crimson', '#AE0E31', 'bg-crimson', 'Primary action, header, brand blocks, links'],
      ['crimson-deep', '#7A0A23', 'bg-crimson-deep', 'Hover and pressed, panels on crimson'],
      ['oxblood', '#4A0B1C', 'bg-oxblood', 'Dark panels and bands'],
      ['signal', '#E30D3B', 'bg-signal', 'Focus ring, live dot, big numerals'],
      ['blush', '#FFC6D3', 'bg-blush', 'Text and icons on crimson'],
    ],
  },
  {
    title: 'Text',
    items: [
      ['ink', '#2B2326', 'bg-ink', 'Headings, prices, labels'],
      ['ink-body', '#474747', 'bg-ink-body', 'Paragraphs'],
      ['ink-muted', '#666666', 'bg-ink-muted', 'Help text, captions, meta'],
      ['ink-disabled', '#A3A3A3', 'bg-ink-disabled', 'Disabled and decorative only'],
      ['on-crimson-muted', '#F3DBE0', 'bg-on-crimson-muted', 'Secondary text on crimson'],
    ],
  },
  {
    title: 'Lines',
    items: [
      ['line', '#E5E5E5', 'bg-line', 'Card borders, dividers'],
      ['line-hover', '#D1D1D1', 'bg-line-hover', 'Card border on hover'],
      ['line-strong', '#858585', 'bg-line-strong', 'Form control borders (3:1)'],
      ['line-on-dark', '#6E3848', 'bg-line-on-dark', 'Dividers on oxblood'],
    ],
  },
  {
    title: 'Overlays',
    items: [
      ['scrim', 'oxblood 60%', 'bg-scrim', 'Behind dialogs'],
      ['photo-scrim', 'oxblood 80%', 'bg-photo-scrim', 'Flat overlay on a background photo'],
      ['photo-scrim-ink', 'ink 75%', 'bg-photo-scrim-ink', 'Ink overlay, How it works hero'],
    ],
  },
] as const

/** Primitive ramps. They make no classes: they only feed the roles above. */
const ramps = [
  ['crimson', ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']],
  ['grey', ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900']],
] as const

const typeStyles = [
  ['text-poster', '72 to 130px, 900, one word per page', 'bearer'],
  ['text-display', '48 to 77px, 900', 'Send groceries, not money'],
  ['text-numeral', '40 to 59px, 900', '1 2 3 4'],
  ['text-h1', '33 to 46px, 800', 'Delivery areas and fees'],
  ['text-h2', '28 to 35px, 800', 'Ready-made baskets'],
  ['text-title', '23 to 27px, 800', 'Popular this week'],
  ['text-h3', '19 to 21px, 700', 'Who is receiving it?'],
  ['text-lead', '18 to 20px, 400', 'We buy it in Jamaica and deliver the same day.'],
  ['text-body', '16px, 400', 'Your driver buys everything and photographs the receipt.'],
  ['text-small', '14px, 500', 'Prices checked October 20, 2026.'],
  ['eyebrow', '14px, 700, sentence case', 'How it works'],
] as const

/** The home hero receipt, from the demo Family Food Basket. */
const sampleReceipt = buildReceipt(baskets[0], products, settings.jmdPerUsd)

const radii = [
  ['rounded-sm', '4px'],
  ['rounded-md', '8px'],
  ['rounded-lg', '12px'],
  ['rounded-xl', '16px'],
  ['rounded-2xl', '24px'],
  ['rounded-full', 'Pill'],
] as const

const categoryIcons: Record<string, ReactNode> = {
  'cat-groceries': <Wheat aria-hidden />,
  'cat-household': <SprayCan aria-hidden />,
  'cat-pharmacy': <Pill aria-hidden />,
  'cat-baby': <Baby aria-hidden />,
}

const recentOrders: {
  no: string
  recipient: string
  parish: string
  total: number
  status: OrderStatus
  at: string
}[] = [
  {
    no: 'SE-10428',
    recipient: 'Marcia Campbell',
    parish: 'St. Thomas',
    total: 8640,
    status: 'shopping',
    at: '2026-10-25T14:12:00Z',
  },
  {
    no: 'SE-10427',
    recipient: 'Delroy Williams',
    parish: 'Kingston',
    total: 5210,
    status: 'awaiting_driver',
    at: '2026-10-25T13:40:00Z',
  },
  {
    no: 'SE-10426',
    recipient: 'Paulette Brown',
    parish: 'St. Thomas',
    total: 12900,
    status: 'awaiting_payment',
    at: '2026-10-25T12:05:00Z',
  },
  {
    no: 'SE-10425',
    recipient: 'Andre Thompson',
    parish: 'Kingston',
    total: 4490,
    status: 'delivered',
    at: '2026-10-24T19:30:00Z',
  },
]

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-header border-t border-line py-12"
    >
      <h2 id={`${id}-h`} className="text-h2 text-ink">
        {title}
      </h2>
      {intro && <p className="mt-1 max-w-2xl text-ink-muted">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function StyleguidePage() {
  if (!isDemoMode() && process.env.NODE_ENV === 'production') notFound()
  const rate = settings.jmdPerUsd
  const byId = new Map(products.map((p) => [p.id, p]))

  return (
    <>
      <DemoBanner />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl gutter pb-24">
        <header className="py-12">
          <h1 className="text-h1 text-balance text-ink">Shop &amp; Send design system</h1>
          <p className="mt-3 max-w-2xl text-lead text-ink-body">
            Every building block of the site, driver app and admin panel, in the client&apos;s
            colours and the Figtree typeface. Product names and prices are placeholders.
          </p>
        </header>

        <Section
          id="colour"
          title="Colour"
          intro="Taken from ShipEast's proposal and scope documents. Flat colours only, never a gradient. Red feels premium through large solid crimson and oxblood blocks."
        >
          <div className="flex flex-col gap-8">
            {swatchGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-h3 text-ink">{group.title}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {group.items.map(([name, hex, cls, use]) => (
                    <div
                      key={name}
                      className="overflow-hidden rounded-md border border-line bg-surface"
                    >
                      <div className={`h-16 border-b border-line ${cls}`} />
                      <div className="p-2.5 text-small">
                        <p className="font-semibold text-ink">{name}</p>
                        <p className="text-ink-muted tabular-nums">{hex}</p>
                        <p className="mt-1 text-xs text-ink-muted">{use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="text-h3 text-ink">Primitive ramps</h3>
              <p className="mt-1 max-w-2xl text-small text-ink-muted">
                Raw steps that feed the roles. They make no classes, so components cannot use them.
              </p>
              {ramps.map(([name, steps]) => (
                <div
                  key={name}
                  className="mt-3 grid grid-cols-11 overflow-hidden rounded-md border border-line"
                >
                  {steps.map((step) => (
                    <div key={step} className="flex flex-col">
                      <div className="h-12" style={{ background: `var(--${name}-${step})` }} />
                      <p className="bg-surface py-1 text-center text-xs text-ink-muted tabular-nums">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid h-28 place-items-center rounded-lg bg-crimson text-h3 text-on-dark">
            Solid crimson surface
          </div>
        </Section>

        <Section
          id="type"
          title="Type"
          intro="Figtree throughout. Headlines heavy and tight, body regular at 16px or larger."
        >
          <dl className="flex flex-col divide-y divide-line">
            {typeStyles.map(([cls, spec, sample]) => (
              <div key={cls} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="text-small text-ink-muted">
                  <code className="font-semibold text-ink">{cls}</code>
                  <br />
                  {spec}
                </dt>
                <dd
                  className={
                    cls === 'eyebrow'
                      ? 'eyebrow text-crimson'
                      : `${cls} ${cls === 'text-numeral' ? 'text-signal' : 'text-ink'}`
                  }
                >
                  {sample}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          id="shape"
          title="Spacing and shape"
          intro="A 4px grid. Touch targets are at least h-control (44px). Sections use section-sm, section or section-lg; cards use p-card or p-card-lg. Bigger surfaces get bigger corners. Cards are flat with a 1px line; only floating layers get a shadow."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
            {radii.map(([cls, size]) => (
              <div key={cls} className="flex flex-col gap-2">
                <div className={`h-16 border border-line bg-surface ${cls}`} />
                <p className="text-small text-ink-muted">
                  <code className="font-semibold text-ink">{cls}</code> {size}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-card">
              <p className="text-h3 text-ink">Card</p>
              <p className="text-small text-ink-muted">surface, 1px line, rounded-lg, p-card</p>
            </div>
            <div className="rounded-xl bg-crimson p-card-lg text-on-dark">
              <p className="text-h3">Feature panel</p>
              <p className="text-small text-on-crimson-muted">crimson, rounded-xl, p-card-lg</p>
            </div>
          </div>
        </Section>

        <Section
          id="overlay-focus-motion"
          title="Overlays, focus and motion"
          intro="A photo may sit under one flat overlay (photo-scrim, oxblood at 80%, or photo-scrim-ink, ink at 75%), with on-dark text only. On crimson and oxblood (not the header, which is light) the focus ring turns blush (on-dark-focus): press Tab to see it. Anchors stop below the sticky header (scroll-mt-header, --header-height 64 / 72px). The home receipt prints once on load (animate-print)."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative isolate overflow-hidden rounded-lg p-card text-on-dark on-dark-focus">
              <StockPhoto
                name="jmKingstonHills"
                alt=""
                sizes="(min-width: 1024px) 380px, 100vw"
                className="absolute inset-0 -z-10 rounded-none"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim" />
              <p className="text-h3">bg-photo-scrim</p>
              <p className="mt-2 text-body">On-dark text only: 8.7:1 over a white pixel.</p>
              <a
                href="#overlay-focus-motion"
                className="mt-2 inline-flex min-h-control items-center font-semibold underline underline-offset-4"
              >
                A link on the overlay
              </a>
            </div>
            <div className="relative isolate overflow-hidden rounded-lg p-card text-on-dark on-dark-focus">
              <StockPhoto
                name="hiwSender"
                alt=""
                sizes="(min-width: 1024px) 380px, 100vw"
                className="absolute inset-0 -z-10 rounded-none"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim-ink" />
              <p className="text-h3">bg-photo-scrim-ink</p>
              <p className="mt-2 text-body">
                On-dark text only: 6.7:1 over a white pixel. No blush text.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 rounded-lg bg-crimson p-card text-on-dark on-dark-focus">
              <p className="text-h3">on-dark-focus</p>
              <p className="text-small text-on-crimson-muted">
                Blush ring on dark; signal is 1.6:1 here.
              </p>
              <ButtonLink href="#overlay-focus-motion" variant="onDark">
                Focus me
              </ButtonLink>
            </div>
            {sampleReceipt && (
              <div className="rounded-lg bg-crimson p-card">
                <HeroReceipt receipt={sampleReceipt} className="mx-auto w-60" />
              </div>
            )}
          </div>
        </Section>

        <Section id="buttons" title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Start shopping</Button>
            <Button variant="secondary">Add to basket</Button>
            <Button variant="outline">Send this basket again</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="destructive">Refund order</Button>
            <Button loading>Paying</Button>
            <Button disabled>Out of stock</Button>
            <IconButton label="Search">
              <PackageSearch aria-hidden />
            </IconButton>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-crimson p-5">
            <Button variant="onDark">On crimson</Button>
          </div>
        </Section>

        <Section
          id="forms"
          title="Forms"
          intro="Labels are always visible. Errors sit right under the field and say how to fix it."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field id="sg-name" label="Recipient's full name">
              <Input
                {...describedBy('sg-name')}
                defaultValue="Marcia Campbell"
                autoComplete="name"
              />
            </Field>
            <Field
              id="sg-phone"
              label="Recipient's phone"
              help="We text them when the driver is on the way."
            >
              <PhoneInput {...describedBy('sg-phone')} />
            </Field>
            <Field id="sg-parish" label="Parish">
              <Select {...describedBy('sg-parish')} defaultValue="St. Thomas">
                <option>St. Thomas</option>
                <option>Kingston</option>
              </Select>
            </Field>
            <Field
              id="sg-email"
              label="Your email"
              error="Enter an email address like name@example.com."
            >
              <Input {...describedBy('sg-email', 'x')} defaultValue="marcia@" type="email" />
            </Field>
            <Field
              id="sg-landmark"
              label="Nearby landmark"
              optional
              className="md:col-span-2"
              help="Helps the driver find the gate. For example: blue gate opposite the Texaco."
            >
              <Textarea {...describedBy('sg-landmark')} />
            </Field>
            <div className="md:col-span-2">
              <ChoiceGroup
                name="sg-sub"
                legend="If an item is out of stock"
                defaultValue="allow_similar"
                columns={3}
                options={[
                  {
                    value: 'allow_similar',
                    title: 'Allow similar',
                    description: 'Driver picks the closest match at the same price or less.',
                  },
                  {
                    value: 'ask_first',
                    title: 'Ask me first',
                    description: 'We message you before swapping anything.',
                  },
                  {
                    value: 'leave_out',
                    title: 'Leave it out',
                    description: 'Skip it and refund that item.',
                  },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <ChoiceGroup
                name="sg-pay"
                legend="How do you want to pay?"
                defaultValue="paypal"
                columns={3}
                options={[
                  {
                    value: 'paypal',
                    title: 'PayPal',
                    icon: <Wallet className="size-5 text-crimson" aria-hidden />,
                  },
                  {
                    value: 'card',
                    title: 'Debit or credit card',
                    description: 'Processed securely by PayPal.',
                    icon: <CreditCard className="size-5 text-crimson" aria-hidden />,
                  },
                  {
                    value: 'bank_transfer',
                    title: 'Bank transfer',
                    description: 'We shop once it arrives.',
                    icon: <Banknote className="size-5 text-crimson" aria-hidden />,
                  },
                ]}
              />
            </div>
            <Checkbox label="Save this address for next time" defaultChecked />
            <div className="flex items-center gap-4">
              <QuantityStepper label="Quantity of Long Grain Rice" defaultValue={2} />
              <span className="text-small text-ink-muted">Quantity</span>
            </div>
          </div>
        </Section>

        <Section
          id="status"
          title="Order statuses"
          intro="Every status has one specific label, the same for the sender, driver and admin. Never a vague 'Pending'."
        >
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ORDER_STATUS) as OrderStatus[]).map((s) => (
              <StatusPill key={s} status={s} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>Out of stock</Badge>
            <Badge tone="ok">Price checked today</Badge>
            <Badge tone="warn">Price may be out of date</Badge>
          </div>
        </Section>

        <Section
          id="prices"
          title="Prices"
          intro="US dollars first, with the Jamaican dollar amount alongside at the admin-set rate."
        >
          <div className="flex flex-wrap items-end gap-10">
            <Price cents={1450} jmdPerUsd={rate} size="sm" />
            <Price cents={3150} jmdPerUsd={rate} />
            <Price cents={6900} jmdPerUsd={rate} size="lg" was={8205} />
          </div>
        </Section>

        <Section id="shop" title="Shop">
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <CategoryTile
                key={c.id}
                href={`/shop/${c.slug}`}
                name={c.name}
                description={c.description}
                count={products.filter((p) => p.categoryId === c.id).length}
                icon={categoryIcons[c.id]}
              />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                jmdPerUsd={rate}
                action={
                  <IconButton label={`Add ${p.name} to basket`} variant="secondary">
                    <ShoppingBasket aria-hidden />
                  </IconButton>
                }
              />
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {baskets.slice(0, 3).map((b) => (
              <BasketCard
                key={b.id}
                basket={b}
                jmdPerUsd={rate}
                itemCount={b.items.reduce((n, i) => n + i.quantity, 0)}
                separateCents={b.items.reduce(
                  (sum, i) => sum + (byId.get(i.productId)?.priceCents ?? 0) * i.quantity,
                  0,
                )}
              />
            ))}
          </div>
        </Section>

        <Section
          id="proof"
          title="Proof pair"
          intro="The signature element: the store receipt and the photo at the door. It is the product's promise, so it gets the boldest treatment and everything around it stays quiet."
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="rounded-lg bg-surface-muted p-6 sm:p-10">
              <ProofPair
                tilt
                receipt={{
                  store: 'PRICESMART',
                  lines: [
                    { name: 'Long Grain Rice', cents: 1450 },
                    { name: 'Cooking Oil', cents: 1325 },
                    { name: 'Corned Beef x2', cents: 950 },
                    { name: 'Evaporated Milk', cents: 1590 },
                  ],
                  totalCents: 5315,
                  at: '2026-10-25T15:40:00Z',
                }}
                door={{
                  recipient: 'Marcia Campbell',
                  place: 'Morant Bay, St. Thomas',
                  at: '2026-10-25T17:05:00Z',
                }}
              />
            </div>
            <ProofPair
              receipt={{
                store: 'PRICESMART',
                lines: [
                  { name: 'Baby Diapers, Size 3', cents: 4290 },
                  { name: 'Baby Wipes', cents: 2390 },
                ],
                totalCents: 6680,
              }}
              door={{ recipient: 'Delroy Williams', place: 'Half Way Tree, Kingston' }}
            />
          </div>
        </Section>

        <Section
          id="tracking"
          title="Tracking"
          intro="Seven stages, with times from the order's history. The current step pulses unless the visitor prefers less motion."
        >
          <div className="grid gap-10 md:grid-cols-2">
            <TrackingTimeline
              status="shopping"
              times={{
                paid: '2026-10-25T14:12:00Z',
                confirmed: '2026-10-25T14:20:00Z',
                shopping: '2026-10-25T15:02:00Z',
              }}
            />
            <TrackingTimeline
              status="closed"
              times={{
                paid: '2026-10-24T13:00:00Z',
                confirmed: '2026-10-24T13:08:00Z',
                shopping: '2026-10-24T14:30:00Z',
                shopped: '2026-10-24T15:10:00Z',
                out_for_delivery: '2026-10-24T15:25:00Z',
                delivered: '2026-10-24T16:40:00Z',
                closed: '2026-10-24T18:00:00Z',
              }}
            />
          </div>
        </Section>

        <Section id="feedback" title="Messages and empty states">
          <div className="grid gap-3 md:grid-cols-2">
            <Alert tone="info" title="Same-day cut-off is 1:00 PM">
              Orders after that are delivered tomorrow.
            </Alert>
            <Alert tone="ok" title="Order SE-10428 confirmed">
              We sent the tracking link to your email.
            </Alert>
            <Alert tone="warn" title="Waiting for your bank transfer">
              Send {formatUsd(12900)} with SE-10426 as the reference within 48 hours.
            </Alert>
            <Alert
              tone="danger"
              title="Your payment didn't go through"
              action={<Button size="sm">Try again</Button>}
            >
              PayPal declined the card. Your basket is saved.
            </Alert>
          </div>
          <div className="mt-6 grid items-start gap-6 md:grid-cols-2">
            <EmptyState
              icon={<ShoppingBasket aria-hidden />}
              title="Your basket is empty"
              action={<Button>Start shopping</Button>}
            >
              Pick from groceries, household, pharmacy and baby items, or choose a ready-made
              basket.
            </EmptyState>
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </Section>

        <Section id="disclosure" title="Questions, tabs and dialogs">
          <div className="grid gap-8 lg:grid-cols-2">
            <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
            <div className="flex flex-col gap-8">
              <Tabs
                label="Your orders"
                tabs={[
                  {
                    id: 'active',
                    title: 'Active',
                    count: 2,
                    body: <p className="text-ink-body">Orders on their way appear here.</p>,
                  },
                  {
                    id: 'past',
                    title: 'Past',
                    count: 14,
                    body: (
                      <p className="text-ink-body">
                        Delivered and closed orders, ready to send again.
                      </p>
                    ),
                  },
                ]}
              />
              <DialogDemo />
              <Pagination page={2} pages={4} href={(n) => `/styleguide?page=${n}#disclosure`} />
            </div>
          </div>
        </Section>

        <Section
          id="admin"
          title="Admin"
          intro="Numbers appear only for things the system really tracks."
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="Orders today" value={12} icon={<ShoppingBasket aria-hidden />} />
            <StatTile
              label="Money in today"
              value={formatUsd(84210)}
              icon={<Banknote aria-hidden />}
            />
            <StatTile label="Shopping now" value={3} icon={<Store aria-hidden />} />
            <StatTile
              label="Needs a driver"
              value={2}
              hint="Oldest waiting 18 minutes"
              icon={<Truck aria-hidden />}
              attention
            />
          </div>
          <div className="mt-6">
            <DataTable
              caption="Recent orders"
              rows={recentOrders}
              rowKey={(r) => r.no}
              columns={[
                {
                  key: 'no',
                  header: 'Order',
                  cell: (r) => <span className="font-semibold whitespace-nowrap">{r.no}</span>,
                },
                { key: 'recipient', header: 'Recipient', cell: (r) => r.recipient },
                { key: 'parish', header: 'Parish', cell: (r) => r.parish, hideBelow: 'md' },
                { key: 'placed', header: 'Placed', cell: (r) => formatDate(r.at), hideBelow: 'lg' },
                { key: 'status', header: 'Status', cell: (r) => <StatusPill status={r.status} /> },
                { key: 'total', header: 'Total', cell: (r) => formatUsd(r.total), align: 'right' },
              ]}
            />
          </div>
        </Section>
      </main>
      <SiteFooter
        settings={settings}
        categories={categories}
        parishList={joinParishes(zones.filter((z) => z.active).map((z) => z.parish))}
      />
    </>
  )
}
