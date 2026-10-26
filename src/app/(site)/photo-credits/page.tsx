import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { Container, PageIntro } from '@/components/site/page-intro'
import { photoPageUrl, photographerUrl, stockPhotos, unsplashUrl } from '@/lib/stock-photos'

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'The photographers whose work appears on the ShipEast website.',
}

export default function PhotoCreditsPage() {
  // The same photo can be registered under two names; credit it once.
  const photos = [
    ...new Map(Object.values(stockPhotos).map((p) => [p.unsplashId, p])).values(),
  ].sort((a, b) => a.photographer.localeCompare(b.photographer))
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
        <h2 className="sr-only">Photos and photographers</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li
              key={p.unsplashId}
              className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-card"
            >
              <a
                href={photoPageUrl(p)}
                className="group inline-flex items-start gap-2 font-semibold text-ink hover:text-crimson"
              >
                <span className="group-hover:underline">{p.alt}</span>
                <ExternalLink className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden />
                <span className="sr-only">(photo on Unsplash)</span>
              </a>
              <p className="text-small text-ink-muted">
                Photo by{' '}
                <a href={photographerUrl(p)} className="font-semibold text-crimson hover:underline">
                  {p.photographer}
                </a>
              </p>
              <p className="mt-auto">
                <span className="inline-flex rounded-full bg-surface-tint px-3 py-1 text-xs font-semibold text-crimson-deep">
                  {p.usedOn}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
