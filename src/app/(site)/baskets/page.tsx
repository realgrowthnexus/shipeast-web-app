import { Gift } from 'lucide-react'
import type { Metadata } from 'next'
import { BasketCard } from '@/components/shop/product-card'
import { Container, PageIntro } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/card'
import { getBaskets, getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Ready-made baskets',
  description:
    'Family food baskets, baby care packs, pharmacy packs and Christmas hampers, at one price, delivered in Jamaica the same day.',
}

export default async function BasketsPage() {
  const [settings, baskets] = await Promise.all([getSettings(), getBaskets()])

  return (
    <>
      <PageIntro title="Ready-made baskets" tone="crimson">
        Put together by our team so you can send a full basket in one tap. Each one costs less than
        buying the items separately.
      </PageIntro>
      <Container className="py-12">
        {baskets.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {baskets.map(({ basket, itemCount, separateCents }) => (
              <li key={basket.id} className="flex [&>article]:flex-1">
                <BasketCard
                  basket={basket}
                  jmdPerUsd={settings.jmdPerUsd}
                  itemCount={itemCount}
                  separateCents={separateCents}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<Gift aria-hidden />}
            title="New baskets are on the way"
            action={<ButtonLink href="/shop">Shop single items</ButtonLink>}
          >
            In the meantime you can build your own basket from the shop.
          </EmptyState>
        )}
      </Container>
    </>
  )
}
