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
import { DemoBanner } from '@/components/site/demo-banner'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { Accordion } from '@/components/ui/accordion'
import { Alert } from '@/components/ui/alert'
import { Badge, StatusPill } from '@/components/ui/badge'
import { Button, IconButton } from '@/components/ui/button'
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
import { baskets, categories, faqs, products, settings } from '@/lib/demo'
import { isDemoMode } from '@/lib/env'
import { formatDate, formatUsd } from '@/lib/format'
import { ORDER_STATUS } from '@/lib/order-status'
import type { OrderStatus } from '@/lib/types'
import { DialogDemo } from './dialog-demo'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

const swatches = [
  ['crimson', '#AE0E31', 'bg-crimson', 'Primary surfaces and buttons'],
  ['crimson-deep', '#7A0A23', 'bg-crimson-deep', 'Hover, gradient middle'],
  ['oxblood', '#2A0A12', 'bg-oxblood', 'Gradient end, footer'],
  ['signal', '#E30D3B', 'bg-signal', 'Accents only, never small text'],
  ['blush', '#FFC6D3', 'bg-blush', 'Text and accents on crimson'],
  ['blush-50', '#F8ECF0', 'bg-blush-50', 'Page background'],
  ['blush-100', '#FFF6F8', 'bg-blush-100', 'Cards'],
  ['line', '#F1D9E0', 'bg-line', 'Borders and dividers'],
  ['ink', '#2B2326', 'bg-ink', 'Text'],
  ['ink-muted', '#6B5C63', 'bg-ink-muted', 'Secondary text'],
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
      className="scroll-mt-24 border-t border-line py-12"
    >
      <h2 id={`${id}-h`} className="text-2xl font-extrabold tracking-tight text-ink">
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
      <main className="mx-auto w-full max-w-6xl px-4 pb-24">
        <header className="py-12">
          <h1 className="text-4xl font-black tracking-tight text-balance text-ink sm:text-5xl">
            Shop &amp; Send design system
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">
            Every building block of the site, driver app and admin panel, in the client&apos;s
            colours and the Figtree typeface. Product names and prices are placeholders.
          </p>
        </header>

        <Section
          id="colour"
          title="Colour"
          intro="Taken from ShipEast's proposal and scope documents. Red is premium: crimson into oxblood with a soft gloss, never flat pink-red."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {swatches.map(([name, hex, cls, use]) => (
              <div key={name} className="overflow-hidden rounded-md border border-line bg-white">
                <div className={`h-16 ${cls}`} />
                <div className="p-2.5 text-sm">
                  <p className="font-semibold text-ink">{name}</p>
                  <p className="text-ink-muted tabular-nums">{hex}</p>
                  <p className="mt-1 text-xs text-ink-muted">{use}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid h-28 place-items-center rounded-lg bg-premium text-lg font-bold text-white">
            Premium gradient with gloss
          </div>
        </Section>

        <Section
          id="type"
          title="Type"
          intro="Figtree throughout. Headlines heavy and tight, body regular at 16px or larger."
        >
          <div className="flex flex-col gap-4">
            <p className="text-5xl font-black tracking-tight text-ink">Send groceries, not money</p>
            <p className="text-3xl font-extrabold tracking-tight text-ink">Ready-made baskets</p>
            <p className="text-xl font-bold text-ink">Who is receiving it?</p>
            <p className="max-w-prose text-base text-ink">
              Your driver buys everything at a store in Jamaica, photographs the receipt, and
              delivers to the door the same day. Your family doesn&apos;t need to install anything.
            </p>
            <p className="text-sm text-ink-muted">
              Prices checked {formatDate('2026-10-20T15:00:00Z')}. Delivery to St. Thomas and
              Kingston.
            </p>
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
          <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-premium p-5">
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
              <span className="text-sm text-ink-muted">Quantity</span>
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
            <div className="rounded-lg bg-blush-200 p-6 sm:p-10">
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
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-blush-100 p-4">
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
                    body: <p className="text-ink-muted">Orders on their way appear here.</p>,
                  },
                  {
                    id: 'past',
                    title: 'Past',
                    count: 14,
                    body: (
                      <p className="text-ink-muted">
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
      <SiteFooter whatsapp={settings.whatsapp} />
    </>
  )
}
