import {
  Camera,
  DoorOpen,
  Clock3,
  MapPin,
  MessageSquareText,
  Repeat2,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { ProofPair } from '@/components/order/proof-pair'
import { BasketCard, CategoryTile } from '@/components/shop/product-card'
import { CategoryIcon } from '@/components/site/category-icon'
import { Container } from '@/components/site/page-intro'
import { StockPhoto } from '@/components/site/stock-photo'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { getActiveZones, getBaskets, getCategories, getFaqs, getSettings } from '@/lib/data/site'
import { formatClockTime, formatUsd } from '@/lib/format'
import { categoryPhotos, type StockPhotoKey } from '@/lib/stock-photos'

const steps: { title: string; body: string; photo: StockPhotoKey }[] = [
  {
    title: 'Fill a basket',
    photo: 'stepOrder',
    body: 'Pick groceries, household, pharmacy and baby items, or a ready-made basket. Prices are in US dollars.',
  },
  {
    title: 'Tell us who it’s for',
    photo: 'stepFamily',
    body: 'Add your family member’s address, phone and a nearby landmark, and choose what we do if something is out of stock.',
  },
  {
    title: 'We shop in Jamaica',
    photo: 'stepShop',
    body: 'Our driver buys everything at the store and sends you a photo of the receipt.',
  },
  {
    title: 'Delivered to the door',
    photo: 'stepDoor',
    body: 'Your family gets a text when we’re on the way. You get a photo at the door when it’s handed over.',
  },
]

const reasons = [
  {
    icon: Camera,
    title: 'Proof, not promises',
    body: 'A photo of the store receipt and a photo at the door, on every order.',
  },
  {
    icon: Repeat2,
    title: 'You decide on swaps',
    body: 'Allow a similar item, have us ask you first, or leave it out and get that money back.',
  },
  {
    icon: MessageSquareText,
    title: 'Your family installs nothing',
    body: 'They just get a text when the driver is on the way and when it’s delivered.',
  },
  {
    icon: ShieldCheck,
    title: 'A local team you can reach',
    body: 'ShipEast Couriers & Bearer Service Ltd, based in St. Thomas. Message us any time.',
  },
]

export default async function HomePage() {
  const [settings, zones, categories, baskets, faqs] = await Promise.all([
    getSettings(),
    getActiveZones(),
    getCategories(),
    getBaskets({ featured: true }),
    getFaqs(),
  ])
  const parishes = zones.map((z) => z.parish).join(' and ')

  return (
    <>
      {/* Hero: the promise, and the proof of it */}
      <section className="overflow-hidden bg-crimson text-white">
        <Container className="grid items-center gap-12 section-lg lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-display text-balance">Send groceries, not money</h1>
            <p className="mt-6 max-w-xl text-lead text-on-crimson-muted">
              Fill a basket online. We buy it in Jamaica and deliver to your family’s door the same
              day, with a photo of the receipt and a photo at the door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" variant="onDark" size="lg">
                Start shopping
              </ButtonLink>
              <ButtonLink
                href="/how-it-works"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                How it works
              </ButtonLink>
            </div>
            <p className="mt-8 flex items-center gap-2 text-on-crimson-muted">
              <MapPin className="size-5 text-blush" aria-hidden />
              Delivering to {parishes} today
            </p>
          </div>
          {/* The photo says what we send; the proof cards overlap it to say how you know */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <StockPhoto
              name="heroGroceries"
              preload
              sizes="(min-width: 1024px) 520px, (min-width: 448px) 448px, 100vw"
              className="aspect-4/3 rounded-xl"
            />
            <div className="relative -mt-20 px-4 sm:-mt-28 sm:px-8">
              <ProofPair
                tilt
                onDark
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
          </div>
        </Container>
      </section>

      {/* How it works: a real sequence, so the steps are numbered */}
      <section aria-labelledby="how-h" className="section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 eyebrow text-crimson">Four steps</p>
              <h2 id="how-h" className="text-h2 text-ink">
                How it works
              </h2>
            </div>
            <Link href="/how-it-works" className="font-semibold text-crimson hover:underline">
              The full journey of an order
            </Link>
          </div>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <StockPhoto
                  name={step.photo}
                  sizes="(min-width: 1024px) 254px, (min-width: 640px) 50vw, 100vw"
                  className="mb-2 aspect-video sm:aspect-4/3"
                />
                <span className="text-numeral text-signal tabular-nums" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="text-h3 text-ink">{step.title}</h3>
                <p className="text-ink-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Shop by category */}
      <section aria-labelledby="cat-h" className="border-t border-line section">
        <Container>
          <div>
            <p className="mb-3 eyebrow text-crimson">The shop</p>
            <h2 id="cat-h" className="text-h2 text-ink">
              What we can buy for them
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <CategoryTile
                key={c.id}
                href={`/shop/${c.slug}`}
                name={c.name}
                description={c.description}
                count={c.count}
                icon={<CategoryIcon slug={c.slug} />}
                photo={categoryPhotos[c.slug]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Ready-made baskets */}
      <section aria-labelledby="bsk-h" className="bg-surface-tint/60 section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div>
                <p className="mb-3 eyebrow text-crimson">Save on bundles</p>
                <h2 id="bsk-h" className="text-h2 text-ink">
                  Ready-made baskets
                </h2>
              </div>
              <p className="mt-2 max-w-xl text-ink-muted">
                Packed for the usual needs, for less than buying each item on its own.
              </p>
            </div>
            <Link href="/baskets" className="font-semibold text-crimson hover:underline">
              See all baskets
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {baskets.slice(0, 3).map(({ basket, itemCount, separateCents }) => (
              <BasketCard
                key={basket.id}
                basket={basket}
                jmdPerUsd={settings.jmdPerUsd}
                itemCount={itemCount}
                separateCents={separateCents}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Why ShipEast */}
      <section aria-labelledby="why-h" className="section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="mb-3 eyebrow text-crimson">Why ShipEast</p>
            <h2 id="why-h" className="text-h2 text-balance text-ink">
              You see what was bought, and that it arrived
            </h2>
            <StockPhoto
              name="whyFamily"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="mt-8 aspect-4/3 lg:aspect-4/5"
            />
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <Icon className="mt-1 size-6 shrink-0 text-crimson" aria-hidden />
                <div>
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-ink-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Coverage */}
      <section aria-labelledby="zone-h" className="border-t border-line section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div>
              <p className="mb-3 eyebrow text-crimson">Coverage</p>
              <h2 id="zone-h" className="text-h2 text-ink">
                Where we deliver
              </h2>
            </div>
            <p className="mt-3 text-ink-muted">More parishes are coming as we add drivers.</p>
            <Link
              href="/delivery"
              className="mt-4 inline-block font-semibold text-crimson hover:underline"
            >
              Delivery areas and fees
            </Link>
            <StockPhoto
              name="kingston"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="mt-8 aspect-video"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {zones.map((z) => (
              <li key={z.id} className="rounded-lg border border-line bg-surface p-card">
                <p className="flex items-center gap-2 text-h3 text-ink">
                  <MapPin className="size-5 text-crimson" aria-hidden />
                  {z.parish}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-small">
                  <div>
                    <dt className="text-ink-muted">Delivery fee</dt>
                    <dd className="font-semibold text-ink">{formatUsd(z.feeCents)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Same-day cut-off</dt>
                    <dd className="flex items-center gap-1 font-semibold text-ink">
                      <Clock3 className="size-4 text-crimson" aria-hidden />
                      {formatClockTime(z.cutoffTime)}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-h" className="border-t border-line section">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div>
              <p className="mb-3 eyebrow text-crimson">Good to know</p>
              <h2 id="faq-h" className="text-h2 text-ink">
                Questions people ask
              </h2>
            </div>
            <Link
              href="/faq"
              className="mt-4 inline-block font-semibold text-crimson hover:underline"
            >
              All questions and answers
            </Link>
          </div>
          <Accordion
            items={faqs.slice(0, 5).map((f) => ({ id: f.id, title: f.question, body: f.answer }))}
          />
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="bg-crimson text-white">
        <Container className="flex flex-col items-start gap-6 section-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <DoorOpen className="mt-1 size-9 shrink-0 text-blush" strokeWidth={1.5} aria-hidden />
            <p className="max-w-xl text-h2">
              Order before {formatClockTime(zones[0]?.cutoffTime ?? '13:00')} and it’s at their door
              today.
            </p>
          </div>
          <ButtonLink href="/shop" variant="onDark" size="lg">
            Start shopping
          </ButtonLink>
        </Container>
      </section>
    </>
  )
}
