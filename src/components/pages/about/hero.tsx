import Link from 'next/link'
import { onDarkLink } from '@/components/site/links'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

/**
 * S1: who we are in one sentence, beside the page's one bold element: the word "bearer" from
 * our registered name, set as a dictionary entry. Pure type on flat colour.
 */
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="bg-crimson section-lg text-on-dark on-dark-focus lg:section"
    >
      <div className="mx-auto max-w-wide gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12">
        <div className="max-w-2xl lg:col-span-7 lg:max-w-none xl:pr-8">
          <h1 id="about-title" className="text-h1 text-balance">
            A St. Thomas courier, shopping for your family
          </h1>
          <p className="mt-5 text-lead text-on-crimson-muted lg:mt-6">
            {site.company} is a courier and errand business based in St. Thomas, Jamaica, also
            serving Kingston. You choose the groceries and essentials and pay in US dollars. Our
            driver buys them at a local store and brings them to the door, with a photo of the
            receipt and a photo at the door.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
              Start shopping
            </ButtonLink>
            <Link href="#company-details" className={`${onDarkLink} self-start sm:self-auto`}>
              Company details and contact
            </Link>
          </div>
        </div>

        <figure
          aria-label="What bearer means"
          className="mt-10 max-w-xl animate-rise rounded-2xl bg-crimson-deep p-card-lg [animation-delay:120ms] md:p-10 lg:col-span-5 lg:mt-0 lg:max-w-none"
        >
          <p lang="en" className="text-display text-blush">
            bearer
          </p>
          <span className="mt-3 inline-flex rounded-sm bg-crimson px-2 py-0.5 text-xs font-bold text-on-dark">
            noun
          </span>
          <p className="mt-4 text-lead font-semibold text-on-dark">
            Someone who carries something to another person, on your behalf.
          </p>
          <p className="mt-6 border-t border-line-on-dark pt-6 text-body text-on-crimson-muted">
            It&apos;s the job in our name: {site.company}. We run errands and deliver for people who
            can&apos;t be there themselves.
          </p>
        </figure>
      </div>
    </section>
  )
}
