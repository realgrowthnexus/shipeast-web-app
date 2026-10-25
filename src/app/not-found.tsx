import { SearchX } from 'lucide-react'
import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { ButtonLink } from '@/components/ui/button'
import { getCategories, getSettings } from '@/lib/data/site'

export default async function NotFound() {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()])
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start gap-5 px-4 py-20 sm:py-28"
      >
        <SearchX className="size-12 text-crimson" strokeWidth={1.5} aria-hidden />
        <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
          We can’t find that page
        </h1>
        <p className="max-w-xl text-lg text-ink-muted">
          The link may be old, or the item may no longer be sold. Try one of these instead.
        </p>
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/shop/${c.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-blush-100 px-4 font-semibold text-ink hover:border-blush [&_svg]:size-5 [&_svg]:text-crimson"
              >
                <CategoryIcon slug={c.slug} />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" className="mt-2">
          Go to the home page
        </ButtonLink>
      </main>
      <SiteFooter whatsapp={settings.whatsapp} />
    </>
  )
}
