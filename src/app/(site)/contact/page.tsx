import {
  ArrowRight,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
  Repeat2,
  RotateCcw,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { PhotoHero } from '@/components/pages/company/photo-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { getSettings } from '@/lib/data/site'
import { formatJamaicanPhone } from '@/lib/format'
import { site } from '@/lib/site'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Message ShipEast by WhatsApp or email about an order, delivery or payment.',
}

const shortcuts = [
  { href: '/track', icon: PackageSearch, title: 'Track an order', body: 'Receipt and door photos' },
  {
    href: '/delivery',
    icon: MapPin,
    title: 'Delivery areas and fees',
    body: 'St. Thomas and Kingston',
  },
  {
    href: '/faq#payment',
    icon: CreditCard,
    title: 'Paying',
    body: 'PayPal, cards and bank transfer',
  },
  {
    href: '/faq#substitutions',
    icon: Repeat2,
    title: 'Out-of-stock items',
    body: 'How swaps work',
  },
  {
    href: '/faq#refunds',
    icon: RotateCcw,
    title: 'Cancelling and refunds',
    body: 'When you can cancel',
  },
]

export default async function ContactPage() {
  const settings = await getSettings()
  const wa = settings.whatsapp.replace(/\D/g, '')

  return (
    <>
      <PhotoHero
        eyebrow="Help"
        title="Contact us"
        lead={
          <>
            Questions about an order, delivery to your area or paying?{' '}
            {wa ? 'WhatsApp is quickest.' : 'Send us a message and we’ll reply by email.'}
          </>
        }
      />

      <Section size="sm" aria-label="Ways to reach us">
        <Stagger
          className={wa ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-4 md:grid-cols-2'}
        >
          {wa && (
            <StaggerItem>
              <a
                href={`https://wa.me/${wa}`}
                className="flex h-full hover-lift items-center gap-5 rounded-xl bg-oxblood p-card-lg text-white"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-crimson text-blush">
                  <MessageCircle className="size-7" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-h3">WhatsApp us</span>
                  <span className="text-on-crimson-muted">
                    {formatJamaicanPhone(settings.whatsapp) ?? settings.whatsapp}
                  </span>
                </span>
              </a>
            </StaggerItem>
          )}
          <StaggerItem>
            <a
              href={`mailto:${site.email}`}
              className="flex h-full hover-lift items-center gap-5 rounded-xl border border-line bg-surface p-card-lg hover:border-blush"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
                <Mail className="size-7" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-h3 text-ink">Email us</span>
                <span className="break-all text-ink-body">{site.email}</span>
              </span>
            </a>
          </StaggerItem>
          <StaggerItem className={wa ? 'md:col-span-2 lg:col-span-1' : undefined}>
            <div className="flex h-full items-center gap-5 rounded-xl bg-crimson-50 p-card-lg">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
                <Clock3 className="size-7" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-h3 text-ink">When we reply</span>
                {/* PLACEHOLDER hours until ShipEast confirms them. */}
                <span className="text-ink-body">Within one working day, usually sooner.</span>
              </span>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section tone="surface" aria-labelledby="form-h">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" y={0}>
            <StockPhoto
              name="contactPhone"
              sizes="(min-width: 1152px) 400px, (min-width: 1024px) 36vw, 100vw"
              className="aspect-video rounded-2xl lg:aspect-4/5"
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="mb-3 eyebrow text-crimson">Write to us</p>
            <h2 id="form-h" className="text-h2 text-ink">
              Send us a message
            </h2>
            <p className="mt-3 mb-8 text-lead text-ink-body">
              If it’s about an order, include the order number so we can find it quickly.
            </p>
            <div className="rounded-lg border border-line bg-canvas p-card-lg">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="shortcuts-h">
        <SectionHeader
          eyebrow="Quick answers"
          id="shortcuts-h"
          title="You might find it here first"
          action={
            <Link
              href="/faq"
              className="inline-flex min-h-11 items-center font-semibold text-crimson hover:underline"
            >
              All questions and answers
            </Link>
          }
        />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map(({ href, icon: Icon, title, body }) => (
            <StaggerItem key={href}>
              <Link
                href={href}
                className="group flex h-full hover-lift items-center gap-4 rounded-lg border border-line bg-surface p-card hover:border-blush"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink">{title}</span>
                  <span className="text-small text-ink-muted">{body}</span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-crimson transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
