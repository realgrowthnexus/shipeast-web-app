import { CalendarClock, PauseCircle, Pencil, Repeat2 } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Monthly orders',
  description:
    'Set up Mum’s basket once and send it again every month, or reorder any past order in one tap.',
}

export default async function MonthlyPage() {
  const { features } = await getSettings()
  const monthly = features.monthly_orders

  const points = monthly
    ? [
        {
          icon: CalendarClock,
          title: 'Pick the day',
          body: 'Choose the date each month, and we charge and shop on that day.',
        },
        {
          icon: Pencil,
          title: 'Change it any time',
          body: 'Add or remove items, or change the address, before the next order.',
        },
        {
          icon: PauseCircle,
          title: 'Pause or stop',
          body: 'Skip a month, pause, or cancel whenever you like.',
        },
      ]
    : [
        {
          icon: Repeat2,
          title: 'Send it again in one tap',
          body: 'Every past order has a "Send this again" button with the same items and address.',
        },
        {
          icon: Pencil,
          title: 'Saved family addresses',
          body: 'Save Mum, Grandad and anyone else once, with their landmark and phone.',
        },
        {
          icon: CalendarClock,
          title: 'Same proof every time',
          body: 'Receipt photo and door photo on every order, so you know it arrived.',
        },
      ]

  return (
    <>
      <PageIntro
        title={monthly ? 'Set up their basket once' : 'Sending every month?'}
        tone="crimson"
      >
        {monthly
          ? 'Choose the items once, pick a day, and we shop and deliver every month. Each delivery comes with the receipt photo and the door photo.'
          : 'Make it quick. With a free account, the next order is one tap.'}
      </PageIntro>
      <Container className="py-16 sm:py-20">
        <ul className="grid gap-8 md:grid-cols-3">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3">
              <Icon className="size-8 text-crimson" aria-hidden />
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/baskets" size="lg">
            Choose a basket
          </ButtonLink>
          <ButtonLink href="/signup" size="lg" variant="outline">
            Create a free account
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}
