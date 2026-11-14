'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, Suspense } from 'react'
import { isCurrent } from '@/components/site/nav-link'

type Props = { href: string; className?: string; children: ReactNode }

function CurrentAisleLink({ href, className, children }: Props) {
  const path = usePathname()
  return (
    <Link
      href={href}
      aria-current={isCurrent(path, href) ? 'page' : undefined}
      className={className}
    >
      {children}
    </Link>
  )
}

/**
 * A link in the header's aisle row that marks its own section `aria-current="page"`. The path
 * is only known at request time on dynamic routes, so the plain link renders first and the
 * marked one streams in.
 */
export function AisleLink(props: Props) {
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={props.className}>
          {props.children}
        </Link>
      }
    >
      <CurrentAisleLink {...props} />
    </Suspense>
  )
}
