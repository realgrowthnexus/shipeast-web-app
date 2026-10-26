import { Baby, Cake, Gift, GraduationCap, TreePine } from 'lucide-react'
import type { Metadata } from 'next'
import { BasketCard } from '@/components/shop/product-card'
import { Container, PageIntro } from '@/components/site/page-intro'
import { ButtonLink } from '@/components/ui/button'
import { getBaskets, getSettings } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Gifts and occasions',
  description:
    'Christmas hampers, birthdays, back to school and new baby baskets, delivered with a printed gift message.',
}

const occasions = [
  {
    icon: TreePine,
    title: 'Christmas',
    body: 'Hampers with festive staples. Order early for the week before Christmas.',
  },
  { icon: Cake, title: 'Birthdays', body: 'Add their favourites and a gift message for the day.' },
  {
    icon: GraduationCap,
    title: 'Back to school',
    body: 'Lunch-box snacks and household basics for the new term.',
  },
  {
    icon: Baby,
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
      <PageIntro title="Gifts and occasions" tone="crimson">
        A basket at the door, with your own message printed and handed over.
      </PageIntro>
      <Container className="py-16 sm:py-20">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon className="size-8 text-crimson" aria-hidden />
              <h2 className="mt-3 text-xl font-bold text-ink">{title}</h2>
              <p className="mt-1 text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>

        {baskets.length > 0 && (
          <section aria-labelledby="gift-baskets-h" className="mt-16">
            <h2 id="gift-baskets-h" className="text-3xl font-extrabold tracking-tight text-ink">
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

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-line bg-blush-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-lg font-semibold text-ink">
            <Gift className="size-6 shrink-0 text-crimson" aria-hidden />
            Add a gift message to any order at checkout.
          </p>
          <ButtonLink href="/shop">Start shopping</ButtonLink>
        </div>
      </Container>
    </>
  )
}
