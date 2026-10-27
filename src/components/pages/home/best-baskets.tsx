import { ArrowRight } from 'lucide-react'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { BasketCard } from '@/components/shop/product-card'
import { ButtonLink } from '@/components/ui/button'
import type { BasketSummary } from '@/lib/data/site'
import { HomeSection } from './home-section'

/**
 * The store's best value: a crimson lead tile that says why baskets are cheaper, then up to
 * three baskets, each with its saving and an Add button. On phones the tile sits on top and the
 * baskets scroll sideways.
 */
export function BestBaskets({
  baskets,
  jmdPerUsd,
  bestSaving,
}: {
  baskets: BasketSummary[]
  jmdPerUsd: number
  /** The biggest real saving across these baskets, as a whole percent. */
  bestSaving: number
}) {
  const shown = baskets.slice(0, 3)
  return (
    <HomeSection
      id="bsk-h"
      title="Best value baskets"
      link={{ href: '/baskets', label: 'See all baskets', short: 'See all' }}
    >
      <div className="grid gap-4 lg:grid-cols-4 lg:gap-4">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-crimson p-6 text-white sm:p-8">
          <div>
            {bestSaving > 0 && <p className="text-h1 text-blush">Save up to {bestSaving}%</p>}
            <p className="mt-3 text-lead font-bold">A whole week of food in one tap.</p>
            <p className="mt-2 text-small text-on-crimson-muted">
              Each basket costs less than buying the same items one by one. Our driver still sends
              the receipt.
            </p>
          </div>
          <ButtonLink href="/baskets" variant="onDark" size="sm">
            Compare baskets
            <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
        <ul
          className={`-mx-4 grid snap-x scroll-px-4 auto-cols-[82%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:auto-cols-[45%] lg:col-span-3 lg:mx-0 lg:auto-cols-auto lg:grid-flow-row lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 ${shown.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}
        >
          {shown.map(({ basket, itemCount, separateCents }) => (
            <li key={basket.id} className="flex snap-start [&>article]:flex-1">
              <BasketCard
                basket={basket}
                jmdPerUsd={jmdPerUsd}
                itemCount={itemCount}
                separateCents={separateCents}
                action={
                  <AddToBasket
                    kind="basket"
                    id={basket.id}
                    name={basket.name}
                    className="group-hover:bg-crimson group-hover:text-white"
                  />
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  )
}
