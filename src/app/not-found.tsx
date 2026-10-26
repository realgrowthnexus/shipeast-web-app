import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MotionProvider } from '@/components/motion/motion-provider'
import { SearchBox } from '@/components/shop/search-box'
import { CategoryIcon } from '@/components/site/category-icon'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { getCategories, getSettings } from '@/lib/data/site'

export default async function NotFound() {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()])
  return (
    <MotionProvider>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-crimson text-white">
          <div className="mx-auto grid w-full max-w-wide items-center gap-10 gutter section lg:grid-cols-12 lg:gap-16">
            <div className="animate-rise lg:col-span-6">
              <p className="mb-4 eyebrow text-blush">Page not found</p>
              <h1 className="text-h1 text-balance">We can’t find that page</h1>
              <p className="mt-5 max-w-xl text-lead text-on-crimson-muted">
                The link may be old, or the item may no longer be sold. Search the shop, or pick a
                category below.
              </p>
              <SearchBox className="mt-8 max-w-xl" />
            </div>
            <div className="animate-rise [animation-delay:120ms] lg:col-span-6">
              <StockPhoto
                name="emptyCart"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
                className="aspect-4/3 rounded-2xl"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="nf-categories-h" className="section-sm">
          <div className="mx-auto w-full max-w-page gutter">
            <h2 id="nf-categories-h" className="text-h2 text-ink">
              Shop by category
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="group flex min-h-16 hover-lift items-center gap-4 rounded-lg border border-line bg-surface p-card font-bold text-ink hover:border-blush"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson [&_svg]:size-5">
                      <CategoryIcon slug={c.slug} />
                    </span>
                    <span className="flex-1">{c.name}</span>
                    <ArrowRight
                      className="size-5 shrink-0 text-crimson transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/" size="lg">
                Go to the home page
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter whatsapp={settings.whatsapp} />
    </MotionProvider>
  )
}
