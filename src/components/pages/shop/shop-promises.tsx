import { Clock3, Receipt, Repeat2, type LucideIcon } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/cn'

type Point = { icon: LucideIcon; title: string; text: string }

/** The three things every order carries, written for the shop pages. */
export function shopPoints(sameDay: string): Point[] {
  return [
    {
      icon: Clock3,
      title: 'Bought on the day we deliver',
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
      text: 'If the store has run out, you choose at checkout: a similar item, a message to you first, or leave it out and get that amount back.',
    },
  ]
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
          <span className="grid size-control shrink-0 place-items-center rounded-full bg-surface-muted text-crimson">
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
