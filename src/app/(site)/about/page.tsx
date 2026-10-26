import { Camera, HandCoins, MapPin, Receipt, Repeat2, Wallet } from 'lucide-react'
import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/reveal'
import { IconList } from '@/components/pages/company/icon-list'
import { PhotoHero } from '@/components/pages/company/photo-hero'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'
import { JamaicaFlag } from '@/components/site/jamaica'

export const metadata: Metadata = {
  title: 'About ShipEast',
  description: `${site.company}: a courier and errand service from St. Thomas, Jamaica, now shopping for families on behalf of their relatives abroad.`,
}

const values = [
  {
    icon: Camera,
    title: 'Proof, not promises',
    body: 'Every order comes with a photo of the store receipt and a photo at the door. You see what was bought, and that it arrived.',
  },
  {
    icon: HandCoins,
    title: 'Your money, spent the way you chose',
    body: 'You pick every item and pay for exactly that. If something is out of stock, your substitution rule decides what we do.',
  },
  {
    icon: MapPin,
    title: 'A local team you can reach',
    body: 'We are a courier and errand service in St. Thomas, not a call centre. Your questions go to the people who shop and deliver.',
  },
]

const care = [
  {
    icon: Receipt,
    title: 'A photo of the receipt',
    body: 'Our driver photographs the till receipt at the store, so you can check every item and price.',
  },
  {
    icon: Camera,
    title: 'A photo at the door',
    body: 'The handover is photographed at the door and added to your tracking link.',
  },
  {
    icon: Repeat2,
    title: 'Your swaps, your refunds',
    body: 'At checkout you choose: a similar item, ask you first, or leave it out and refund it. You can cancel for a full refund until our driver starts shopping.',
  },
  {
    icon: Wallet,
    title: 'Pay in US dollars',
    body: 'Pay with PayPal, a debit or credit card through PayPal, or a bank transfer that our team confirms.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        eyebrow="Who we are"
        title="About ShipEast"
        photo="companyCoast"
        lead="A courier and errand service from St. Thomas, now shopping for the families of Jamaicans living abroad."
      />

      <Section aria-labelledby="story-h">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="mb-3 eyebrow text-crimson">Our story</p>
            <h2 id="story-h" className="text-h2 text-balance text-ink">
              Errands are what we do
            </h2>
          </Reveal>
          <Reveal className="flex flex-col gap-5 text-lead text-ink-body lg:col-span-7" delay={0.1}>
            <p>
              ShipEast started as a courier and bearer service in St. Thomas: picking things up,
              dropping them off, and running errands for people who can’t be there themselves.
            </p>
            <p>
              Shop &amp; Send grew out of a request we kept hearing from Jamaicans in New York,
              Toronto and London. They wanted to look after family at home without sending cash and
              hoping it was spent on groceries, and without shipping a barrel that takes weeks.
            </p>
            <p>
              So we shop for you. Our driver buys what you ordered at a store in Jamaica, sends you
              a photo of the receipt, and hands it over at the door with a photo to prove it.
              Nothing is shipped, so there are no barrels, customs or freight. Only the money
              crosses the border.
            </p>
            {/* PLACEHOLDER: replace with ShipEast's own story and team once Derion supplies it. */}
          </Reveal>
        </div>
      </Section>

      <Section tone="oxblood" aria-labelledby="values-h">
        <SectionHeader
          onDark
          eyebrow="What we believe"
          id="values-h"
          title="Three things we hold to on every order"
        />
        <div className="mt-10">
          <IconList points={values} onDark />
        </div>
      </Section>

      <Section wide aria-labelledby="roots-h">
        <PhotoFeature photo="jmFlag" parallax>
          <p className="mb-3 flex items-center gap-3 eyebrow text-crimson">
            <JamaicaFlag className="w-7" />
            Our roots
          </p>
          <h2 id="roots-h" className="text-h2 text-balance text-ink">
            Rooted in St. Thomas
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-lead text-ink-body">
            <p>
              ShipEast is a St. Thomas business, and our team runs errands on these roads. For now
              we deliver to St. Thomas and Kingston only, the parishes we already know well.
            </p>
            <p>Out of many, one people. We shop for your family the way we shop for our own.</p>
            <p>
              Your family installs nothing. They get a text message when the order is on its way,
              and our driver hands it over at the door.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/delivery" variant="outline">
              Delivery areas and fees
            </ButtonLink>
          </div>
        </PhotoFeature>
      </Section>

      <Section tone="tint" aria-labelledby="care-h">
        <SectionHeader
          eyebrow="Your order and your money"
          id="care-h"
          title="How we look after both"
          lead="The same four things on every order, whether it’s a weekly shop or a Christmas hamper."
        />
        <div className="mt-10">
          <IconList points={care} columns={4} />
        </div>
      </Section>

      <Section aria-labelledby="details-h">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6" y={0}>
            <StockPhoto
              name="kingstonStreet"
              sizes="(min-width: 1024px) 540px, 100vw"
              className="aspect-video rounded-2xl"
            />
          </Reveal>
          <Reveal className="flex flex-col gap-6 lg:col-span-6" delay={0.1}>
            <div>
              <p className="mb-3 eyebrow text-crimson">Company details</p>
              <h2 id="details-h" className="text-h2 text-balance text-ink">
                Who you’re dealing with
              </h2>
            </div>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-small text-ink-muted">Registered name</dt>
                <dd className="text-lead font-bold text-ink">{site.company}</dd>
              </div>
              <div>
                <dt className="text-small text-ink-muted">Based in</dt>
                <dd className="font-semibold text-ink">St. Thomas, Jamaica</dd>
              </div>
              <div>
                <dt className="text-small text-ink-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-11 items-center font-semibold break-all text-crimson hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <div>
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Look after them from wherever you are"
        photo="companyCountryRoad"
        secondary={{ href: '/how-it-works', label: 'How it works' }}
      >
        Fill a basket in US dollars. We shop in Jamaica and send you the receipt and the door photo.
      </CtaBand>
    </>
  )
}
