import { Gift, HandHeart, PackageCheck, PiggyBank } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { BasketCard } from '@/components/shop/product-card'
import { CtaBand } from '@/components/site/cta-band'
import { PhotoFeature } from '@/components/site/photo-feature'
import { Section, SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/card'
import { getBaskets, getSettings } from '@/lib/data/site'
import { formatUsd } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Ready-made baskets',
  description:
    'Family food baskets, baby care packs, pharmacy packs and Christmas hampers, at one price, delivered in Jamaica the same day.',
}

export default async function BasketsPage() {
  const [settings, baskets] = await Promise.all([getSettings(), getBaskets()])
  const withSaving = baskets.filter((b) => b.separateCents > b.basket.priceCents)
  const allSave = baskets.length > 0 && withSaving.length === baskets.length

  return (
    <>
      <section className="bg-crimson text-white">
        <div className="mx-auto grid w-full max-w-page items-center gap-10 gutter section lg:grid-cols-12 lg:gap-16">
          <div className="animate-rise lg:col-span-7">
            <p className="mb-3 eyebrow text-blush">Ready-made baskets</p>
            <h1 className="text-h1 text-balance">A full basket for the family, in one tap</h1>
            <p className="mt-4 max-w-2xl text-lead text-on-crimson-muted">
              Put together by our team for the things families actually need: the week’s food, the
              baby’s supplies, the medicine cabinet.
              {allSave && ' Each one costs less than buying the items one by one.'}
            </p>
          </div>
          <StockPhoto
            name="staples"
            sizes="(min-width: 1024px) 480px, 0px"
            className="hidden aspect-4/3 animate-rise rounded-2xl [animation-delay:120ms] lg:col-span-5 lg:block"
          />
        </div>
      </section>

      <Section size="sm" aria-labelledby="all-baskets">
        <h2 id="all-baskets" className="sr-only">
          All baskets
        </h2>
        {baskets.length ? (
          <Stagger
            className={`grid gap-4 sm:grid-cols-2 ${baskets.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
          >
            {baskets.map(({ basket, itemCount, separateCents }) => (
              <StaggerItem key={basket.id} className="flex [&>article]:flex-1">
                <BasketCard
                  basket={basket}
                  jmdPerUsd={settings.jmdPerUsd}
                  itemCount={itemCount}
                  separateCents={separateCents}
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <EmptyState
            icon={<Gift aria-hidden />}
            title="New baskets are on the way"
            action={<ButtonLink href="/shop">Shop single items</ButtonLink>}
          >
            In the meantime you can build your own basket from the shop.
          </EmptyState>
        )}
      </Section>

      {baskets.length > 0 && (
        <Section tone="surface" aria-labelledby="why-basket">
          <SectionHeader
            id="why-basket"
            eyebrow="Why a basket"
            title="Less to think about, and less to pay"
            className="mb-10"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Stagger className="flex flex-col gap-8 lg:col-span-5">
              <StaggerItem className="flex gap-4">
                <Reason icon={HandHeart} title="Packed for a real need">
                  Each basket is built around one need, like the week’s pantry staples or the baby’s
                  supplies, so nothing important gets missed.
                </Reason>
              </StaggerItem>
              {withSaving.length > 0 && (
                <StaggerItem className="flex gap-4">
                  <Reason icon={PiggyBank} title="Costs less than the items one by one">
                    {allSave ? 'Every basket' : 'Most baskets'} cost less than adding the same items
                    to your basket separately. See the table for the numbers.
                  </Reason>
                </StaggerItem>
              )}
              <StaggerItem className="flex gap-4">
                <Reason icon={PackageCheck} title="Bought fresh, with photo proof">
                  Our driver buys every item fresh, sends you a photo of the receipt, and a photo at
                  the door when it’s handed over.
                </Reason>
              </StaggerItem>
            </Stagger>

            {withSaving.length > 0 && (
              <div className="lg:col-span-7">
                <div className="overflow-x-auto">
                  <table className="w-full overflow-hidden rounded-lg border border-line bg-canvas text-left text-small">
                    <caption className="sr-only">
                      Basket prices compared with buying the same items one by one
                    </caption>
                    <thead className="bg-surface-tint text-ink">
                      <tr>
                        <th scope="col" className="p-2 font-bold sm:p-4">
                          Basket
                        </th>
                        <th scope="col" className="p-2 text-right font-bold sm:p-4">
                          One by one
                        </th>
                        <th scope="col" className="p-2 text-right font-bold sm:p-4">
                          Basket
                        </th>
                        <th scope="col" className="p-2 text-right font-bold sm:p-4">
                          You save
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line text-ink-body">
                      {withSaving.map(({ basket, separateCents }) => (
                        <tr key={basket.id}>
                          <th scope="row" className="p-2 font-semibold text-ink sm:p-4">
                            <Link
                              href={`/baskets/${basket.slug}`}
                              className="underline-offset-2 hover:text-crimson hover:underline"
                            >
                              {basket.name}
                            </Link>
                          </th>
                          <td className="p-2 text-right tabular-nums sm:p-4">
                            <s>{formatUsd(separateCents)}</s>
                          </td>
                          <td className="p-2 text-right font-bold text-ink tabular-nums sm:p-4">
                            {formatUsd(basket.priceCents)}
                          </td>
                          <td className="p-2 text-right font-bold text-crimson tabular-nums sm:p-4">
                            {formatUsd(separateCents - basket.priceCents)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-small text-ink-muted">
                  “One by one” is today’s shop price for the same items and quantities.
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section aria-labelledby="gifts">
        <PhotoFeature photo="giftChristmas" aspect="aspect-4/3">
          <p className="mb-3 eyebrow text-crimson">Sending for an occasion?</p>
          <h2 id="gifts" className="text-h2 text-balance text-ink">
            Birthdays, Christmas, back to school
          </h2>
          <p className="mt-4 max-w-xl text-lead text-ink-body">
            Pick a basket for the occasion and add a gift message at checkout. We print it and hand
            it over with the basket.
          </p>
          <ButtonLink href="/gifts" variant="outline" size="lg" className="mt-6">
            See gift ideas
          </ButtonLink>
        </PhotoFeature>
      </Section>

      <CtaBand
        title="Rather choose every item?"
        href="/shop"
        label="Build your own basket"
        photo="shopProduce"
      >
        Shop groceries, household, pharmacy and baby items one by one and fill the basket yourself.
      </CtaBand>
    </>
  )
}

function Reason({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Gift
  title: string
  children: ReactNode
}) {
  return (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-crimson text-white">
        <Icon className="size-6" aria-hidden />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-h3 text-ink">{title}</span>
        <span className="text-ink-body">{children}</span>
      </span>
    </>
  )
}
