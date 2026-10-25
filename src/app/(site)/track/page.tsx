import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageIntro } from '@/components/site/page-intro'
import { Card } from '@/components/ui/card'
import { isDemoMode } from '@/lib/env'
import { ORDER_STATUS } from '@/lib/order-status'
import { demoOrders } from '@/lib/demo/orders'
import { TrackForm } from './track-form'

export const metadata: Metadata = {
  title: 'Track an order',
  description:
    'Follow your Shop & Send order: shopping, the receipt photo, delivery and the door photo.',
}

export default function TrackPage() {
  return (
    <>
      <PageIntro title="Track an order">
        Use the link in your order email, or enter your order number and email below. Your family
        can use the same link; no account needed.
      </PageIntro>
      <Container className="grid max-w-4xl gap-8 py-12 md:grid-cols-[1fr_16rem]">
        <Card className="p-5 sm:p-8">
          <TrackForm />
        </Card>
        {isDemoMode() && (
          <aside className="flex flex-col gap-2 text-sm">
            <p className="font-semibold text-ink">Preview orders</p>
            <ul className="flex flex-col gap-1">
              {demoOrders.map((o) => (
                <li key={o.token}>
                  <Link
                    href={`/track/${o.token}`}
                    className="font-semibold text-crimson underline underline-offset-2"
                  >
                    {o.orderNo}
                  </Link>{' '}
                  <span className="text-ink-muted">({ORDER_STATUS[o.status].label})</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </Container>
    </>
  )
}
