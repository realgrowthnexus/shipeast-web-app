import {
  ArrowRight,
  Clock3,
  MessageCircle,
  PackagePlus,
  Receipt,
  Repeat2,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type Point = { icon: LucideIcon; title: string; text: string }

/** The three things every order carries, written for the shop pages. */
export function shopPoints(sameDay: string): Point[] {
  return [
    {
      icon: Clock3,
      title: 'Bought fresh on the day',
      text: `Our driver buys your items at a store in Jamaica on the day we deliver. ${sameDay}`.trim(),
    },
    {
      icon: Receipt,
      title: 'A photo of the receipt',
      text: 'You see the store’s till receipt for your order, then a photo at the door when it’s handed over.',
    },
    {
      icon: Repeat2,
      title: 'Your swap rules',
      text: 'If the store has run out, you choose at checkout: a similar item, a call first, or leave it out and get that amount back.',
    },
  ]
}

/** "How we shop for you": an oxblood band with the three promises and a photo of the till. */
export function HowWeShop({ sameDay }: { sameDay: string }) {
  return (
    <Section tone="oxblood" aria-labelledby="how-we-shop">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <SectionHeader
            id="how-we-shop"
            eyebrow="How we shop for you"
            title="Bought in Jamaica, the same way you would"
            lead="Nothing is shipped from overseas. Only your payment crosses the border."
            onDark
          />
          <Stagger className="grid gap-6 sm:grid-cols-3 lg:gap-8">
            {shopPoints(sameDay).map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="flex flex-col gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-crimson text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="text-h3">{title}</h3>
                <p className="text-small text-on-oxblood-muted">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Link
            href="/how-it-works"
            className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-blush underline-offset-4 hover:underline"
          >
            See how an order works
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>
        <div className="hidden grid-cols-2 gap-4 md:grid lg:col-span-5">
          <StockPhoto
            name="shopCheckout"
            sizes="(min-width: 1024px) 240px, (min-width: 768px) 50vw, 0px"
            className="aspect-3/4 rounded-2xl"
          />
          <StockPhoto
            name="shopReceipt"
            sizes="(min-width: 1024px) 240px, (min-width: 768px) 50vw, 0px"
            className="mt-10 aspect-3/4 rounded-2xl"
          />
        </div>
      </div>
    </Section>
  )
}

/** The same promises as a quiet row of cards, for the product page. */
export function TrustRow({ sameDay = '', className }: { sameDay?: string; className?: string }) {
  return (
    <Stagger className={cn('grid gap-3 md:grid-cols-3', className)}>
      {shopPoints(sameDay).map(({ icon: Icon, title, text }) => (
        <StaggerItem
          key={title}
          className="flex gap-4 rounded-lg border border-line bg-surface p-card"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-bold text-ink">{title}</span>
            <span className="text-small text-ink-body">{text}</span>
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/** Where to ask for an item we don't list: the request form when it's on, otherwise contact. */
export function requestLink(itemRequests: boolean) {
  return itemRequests
    ? { href: '/request', label: 'Request an item' }
    : { href: '/contact', label: 'Ask us about it' }
}

/** "Can't find it?": a tint band that sends the sender to the request form. */
export function CantFindBanner({ itemRequests }: { itemRequests: boolean }) {
  const link = requestLink(itemRequests)
  return (
    <Section tone="tint" size="sm" aria-labelledby="cant-find">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-card-lg sm:flex-row sm:items-center sm:p-10">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-crimson text-white">
          <PackagePlus className="size-7" aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <h2 id="cant-find" className="text-h2 text-ink">
            Can’t find it?
          </h2>
          <p className="max-w-2xl text-ink-body">
            {itemRequests
              ? 'Tell us the item, the brand and the size. We check the stores in Jamaica and send you a price, and you only pay once you accept it.'
              : 'Tell us the item, the brand and the size, and we’ll let you know if we can buy it for you.'}
          </p>
        </div>
        <ButtonLink href={link.href} size="lg">
          {link.label}
        </ButtonLink>
      </div>
    </Section>
  )
}

/** Bottom-of-page help: request an item, WhatsApp us, how substitutions work. */
export function HelpStrip({
  itemRequests,
  whatsapp,
}: {
  itemRequests: boolean
  whatsapp?: string
}) {
  const link = requestLink(itemRequests)
  const wa = whatsapp?.replace(/\D/g, '')
  const items = [
    {
      icon: PackagePlus,
      title: 'Looking for something else?',
      text: 'Tell us what you need and we’ll check if we can buy it.',
      href: link.href,
      cta: link.label,
      external: false,
    },
    ...(wa
      ? [
          {
            icon: MessageCircle,
            title: 'Questions before you order?',
            text: 'Message our team in St. Thomas on WhatsApp.',
            href: `https://wa.me/${wa}`,
            cta: 'Chat on WhatsApp',
            external: true,
          },
        ]
      : []),
    {
      icon: Repeat2,
      title: 'If the store runs out',
      text: 'You choose the swap rule at checkout, so nothing changes without your say.',
      href: '/legal/substitutions',
      cta: 'How substitutions work',
      external: false,
    },
  ]
  return (
    <Stagger
      as="ul"
      className={cn('grid gap-3', items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}
    >
      {items.map(({ icon: Icon, title, text, href, cta, external }) => (
        <StaggerItem key={title} className="flex">
          <Link
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex w-full hover-lift gap-4 rounded-lg border border-line bg-surface p-card hover:border-blush"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-bold text-ink">{title}</span>
              <span className="text-small text-ink-body">{text}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-small font-semibold text-crimson">
                {cta}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
