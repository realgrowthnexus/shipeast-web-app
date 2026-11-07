import Link from 'next/link'
import { onDarkLink } from '@/components/site/links'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site'

const numeral = 'w-10 shrink-0 text-h1 text-blush tabular-nums md:w-16 lg:w-24'

/**
 * S1 "The dictionary entry": type only on solid oxblood. The word "bearer" from our registered
 * name at poster size, its part of speech, and two numbered senses on a hanging indent; sense 2
 * is the page's h1. Then the lead, the origin note and the actions on the same indent.
 */
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="bg-oxblood section-lg text-on-dark on-dark-focus"
    >
      <div className="mx-auto max-w-wide gutter">
        <p lang="en" className="text-poster text-blush">
          bearer
        </p>
        <span className="mt-4 inline-flex rounded-sm bg-crimson px-2 py-0.5 text-xs font-bold text-on-dark md:ml-16 lg:ml-24">
          noun
        </span>

        <div className="mt-8 max-w-5xl lg:mt-10">
          <div className="flex animate-rise [animation-delay:80ms]">
            <span aria-hidden className={numeral}>
              1
            </span>
            <p className="text-h1 text-balance text-on-oxblood-muted">
              Someone who carries something to another person, on your behalf.
            </p>
          </div>
          <div className="mt-6 flex animate-rise [animation-delay:160ms] lg:mt-8">
            <span aria-hidden className={numeral}>
              2
            </span>
            <h1 id="about-title" className="text-h1 text-balance text-on-dark">
              A St. Thomas courier, shopping for your family.
            </h1>
          </div>
        </div>

        <div className="mt-8 max-w-2xl md:ml-16 lg:mt-10 lg:ml-24">
          <p className="text-lead text-on-dark">
            {site.company} is a courier and errand business based in St. Thomas, Jamaica, also
            serving Kingston. You choose the groceries and essentials and pay in US dollars. Our
            driver buys them at a local store and brings them to the door, with a photo of the
            receipt and a photo at the door.
          </p>
          <p className="mt-4 border-t border-line-on-dark pt-4 text-body text-on-oxblood-muted">
            From our registered name, {site.company}. We run errands and deliver for people who
            can&apos;t be there themselves.
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
      </div>
    </section>
  )
}
