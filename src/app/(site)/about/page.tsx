import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About ShipEast',
  description: `${site.company}: a courier and errand service from St. Thomas, Jamaica, now shopping for families on behalf of their relatives abroad.`,
}

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Who we are" title="About ShipEast" tone="crimson">
        A courier and errand service from St. Thomas, now shopping for the families of Jamaicans
        living abroad.
      </PageIntro>

      <Container className="grid gap-12 section lg:grid-cols-[1.4fr_1fr]">
        <div className="flex max-w-prose flex-col gap-5 text-lead text-ink">
          <h2 className="text-h2">Errands are what we do</h2>
          <p>
            ShipEast started as a courier and bearer service in St. Thomas: picking things up,
            dropping them off, and running errands for people who can’t be there themselves.
          </p>
          <p>
            Shop &amp; Send grew out of a request we kept hearing from Jamaicans in New York,
            Toronto and London. They wanted to look after family at home without sending cash and
            hoping it was spent on groceries, and without shipping a barrel that takes weeks.
          </p>
          <p>
            So we shop for you. Our driver buys what you ordered at a store in Jamaica, sends you a
            photo of the receipt, and hands it over at the door with a photo to prove it.
          </p>
          {/* PLACEHOLDER: replace with ShipEast's own story and team once Derion supplies it. */}
        </div>

        <div className="flex flex-col gap-6">
          <StockPhoto
            name="kingstonStreet"
            sizes="(min-width: 1024px) 440px, 100vw"
            className="aspect-4/3"
          />
          <aside className="flex h-fit flex-col gap-4 rounded-lg border border-line bg-surface p-card">
            <h2 className="text-h3 text-ink">Company details</h2>
            <dl className="flex flex-col gap-3">
              <div>
                <dt className="text-small text-ink-muted">Registered name</dt>
                <dd className="font-semibold text-ink">{site.company}</dd>
              </div>
              <div>
                <dt className="text-small text-ink-muted">Based in</dt>
                <dd className="font-semibold text-ink">St. Thomas, Jamaica</dd>
              </div>
              <div>
                <dt className="text-small text-ink-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-crimson hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </aside>
        </div>
      </Container>
    </>
  )
}
