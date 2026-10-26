import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { photoPageUrl, photographerUrl, stockPhotos, unsplashUrl } from '@/lib/stock-photos'

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'The photographers whose work appears on the ShipEast website.',
}

export default function PhotoCreditsPage() {
  // The same photo can be registered under two names; credit it once.
  const photos = [...new Map(Object.values(stockPhotos).map((p) => [p.unsplashId, p])).values()]
  return (
    <>
      <PageIntro eyebrow="Policies" title="Photo credits">
        Photos of people and places on this site are from{' '}
        <a href={unsplashUrl} className="font-semibold text-crimson underline">
          Unsplash
        </a>
        , used under the Unsplash License. Product photos are ShipEast’s own.
      </PageIntro>
      <Container className="section-sm">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li key={p.unsplashId} className="border-b border-line pb-4">
              <a href={photoPageUrl(p)} className="font-semibold text-ink hover:underline">
                {p.alt}
              </a>
              <p className="text-small text-ink-muted">
                by{' '}
                <a href={photographerUrl(p)} className="text-crimson hover:underline">
                  {p.photographer}
                </a>{' '}
                · {p.usedOn}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
