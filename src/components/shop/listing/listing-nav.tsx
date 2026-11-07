'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from 'react'

/**
 * One way for every enhanced listing control (filters, chips, sort, Load more) to change the
 * URL: inside a transition, so the old results stay on screen (dimmed) until the new ones
 * arrive, with `push` so Back undoes a filter. Also owns the page's one polite live region, so
 * result counts and basket changes never compete.
 */

interface ListingNav {
  navigate(url: string): void
  pending: boolean
  announce(message: string): void
}

const Ctx = createContext<ListingNav>({
  navigate: (url) => window.location.assign(url),
  pending: false,
  announce: () => {},
})

export const useListingNav = () => useContext(Ctx)

const noSubscribe = () => () => {}

/** False on the server and during hydration, true once JavaScript runs (no-JS fallbacks hide). */
export const useHydrated = () =>
  useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  )

/** The results heading: the scroll target after a filter change when it has scrolled away. */
export const RESULTS_HEADING = 'results-heading'

/**
 * The visible match for a selector. Pages kept alive by Activity stay in the DOM (hidden), so
 * an earlier URL of the same listing can hold a second copy of every id.
 */
export const visible = <T extends Element = HTMLElement>(selector: string) =>
  [...document.querySelectorAll<T>(selector)].find((el) => el.getClientRects().length > 0) ?? null

export function ListingNavProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [message, setMessage] = useState('')
  const scrollBack = useRef(false)

  const navigate = useCallback(
    (url: string) => {
      const heading = visible(`#${RESULTS_HEADING}`)
      scrollBack.current = Boolean(heading && heading.getBoundingClientRect().top < 0)
      start(() => router.push(url, { scroll: false }))
    },
    [router],
  )

  // After the new results land, bring the top of the list back into view (below the toolbar).
  useEffect(() => {
    if (pending || !scrollBack.current) return
    scrollBack.current = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    visible(`#${RESULTS_HEADING}`)?.scrollIntoView({
      block: 'start',
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [pending])

  const announce = useCallback((text: string) => {
    // Clear first so the same words are read again (two quick adds of the same item).
    setMessage('')
    requestAnimationFrame(() => setMessage(text))
  }, [])

  const value = useMemo(() => ({ navigate, pending, announce }), [navigate, pending, announce])
  return (
    <Ctx.Provider value={value}>
      {children}
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </p>
    </Ctx.Provider>
  )
}

/** A Link that navigates inside the listing transition. Its `href` still works without JS. */
export function ListingLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const { navigate } = useListingNav()
  return (
    <Link
      {...props}
      scroll={false}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)
          return
        e.preventDefault()
        navigate(String(props.href))
      }}
    />
  )
}

/**
 * Wraps the results: busy while a navigation is pending (the grid dims through
 * `group-data-[pending]/results`), and announces the new count once it changes.
 */
export function ResultsRegion({
  total,
  children,
  className,
}: {
  total: number
  children: ReactNode
  className?: string
}) {
  const { pending, announce } = useListingNav()
  const last = useRef(total)
  useEffect(() => {
    if (last.current === total) return
    last.current = total
    announce(total ? `${total} ${total === 1 ? 'item' : 'items'}` : 'No items match these filters')
  }, [total, announce])
  return (
    <div
      aria-busy={pending || undefined}
      data-pending={pending || undefined}
      className={`group/results ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
