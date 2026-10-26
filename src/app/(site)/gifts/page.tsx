import { Gift } from 'lucide-react'
import type { Metadata } from 'next'
import { BasketCard } from '@/components/shop/product-card'
import { Container, PageIntro } from '@/components/site/page-intro'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { getBaskets, getSettings } from '@/lib/data/site'
import type { StockPhotoKey } from '@/lib/stock-photos'

export const metadata: Metadata = {
  title: 'Gifts and occasions',
  description:
    'Christmas hampers, birthdays, back to school and new baby baskets, delivered with a printed gift message.',
}

const occasions: { photo: StockPhotoKey; title: string; body: string }[] = [
  {
    photo: 'giftChristmas',
    title: 'Christmas',
    body: 'Hampers with festive staples. Order early for the week before Christmas.',
  },
  {
    photo: 'giftBirthday',
    title: 'Birthdays',
    body: 'Add their favourites and a gift message for the day.',
  },
  {
    photo: 'giftSchool',
    title: 'Back to school',
    body: 'Lunch-box snacks and household basics for the new term.',
  },
  {
    photo: 'giftBaby',
    title: 'New baby',
    body: 'Diapers, wipes and formula, so the new parents can rest.',
  },
]

export default async function GiftsPage() {
  const [settings, baskets] = await Promise.all([
    getSettings(),
    getBaskets({ occasion: ['christmas', 'baby', 'school'] }),
  ])

  return (
    <>
      <PageIntro eyebrow="Shop" title="Gifts and occasions" tone="crimson">
        A basket at the door, with your own message printed and handed over.
      </PageIntro>
      <Container className="section">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map(({ photo, title, body }) => (
            <li key={title}>
              <StockPhoto
                name={photo}
                sizes="(min-width: 1024px) 254px, (min-width: 640px) 50vw, 100vw"
                className="aspect-4/3"
              />
              <h2 className="mt-4 text-h3 text-ink">{title}</h2>
              <p className="mt-1 text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>

        {baskets.length > 0 && (
          <section aria-labelledby="gift-baskets-h" className="mt-16">
            <h2 id="gift-baskets-h" className="text-h2 text-ink">
              Baskets for the occasion
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {baskets.map(({ basket, itemCount, separateCents }) => (
                <BasketCard
                  key={basket.id}
                  basket={basket}
                  jmdPerUsd={settings.jmdPerUsd}
                  itemCount={itemCount}
                  separateCents={separateCents}
                />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-card sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-lead font-semibold text-ink">
            <Gift className="size-6 shrink-0 text-crimson" aria-hidden />
            Add a gift message to any order at checkout.
          </p>
          <ButtonLink href="/shop">Start shopping</ButtonLink>
        </div>
      </Container>
    </>
  )
}
