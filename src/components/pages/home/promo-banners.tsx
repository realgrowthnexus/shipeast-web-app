import { ButtonLink } from '@/components/ui/button'
import { StockPhoto } from '@/components/site/stock-photo'
import type { StockPhotoKey } from '@/lib/stock-photos'

type Banner = {
  href: string
  title: string
  body: string
  cta: string
  photo: StockPhotoKey
  /** A real saving, shown as the one gold tag. */
  saving?: string
}

/**
 * Two light banners side by side, like a store's promo row: what to send this week. Text on
 * the left, photo on the right, one dark button. Gold appears only when the saving is real.
 */
export function PromoBanners({ banners }: { banners: Banner[] }) {
  return (
    <section aria-label="This week" className="py-4 sm:py-6">
      <div className="mx-auto grid w-full max-w-wide gap-4 gutter md:grid-cols-2 lg:gap-6">
        {banners.map((b) => (
          <article
            key={b.href}
            className="group grid overflow-hidden rounded-xl bg-canvas sm:grid-cols-[1fr_38%]"
          >
            <div className="flex flex-col items-start p-5 sm:p-8">
              {b.saving && (
                <span className="mb-3 rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink">
                  {b.saving}
                </span>
              )}
              <h3 className="text-title text-ink">{b.title}</h3>
              <p className="mt-2 text-small text-ink-body">{b.body}</p>
              <ButtonLink href={b.href} variant="dark" size="sm" className="mt-5">
                {b.cta}
              </ButtonLink>
            </div>
            <StockPhoto
              name={b.photo}
              sizes="(min-width: 1280px) 240px, (min-width: 768px) 18vw, 38vw"
              className="hidden h-full min-h-44 rounded-none sm:block"
              zoom
            />
          </article>
        ))}
      </div>
    </section>
  )
}
