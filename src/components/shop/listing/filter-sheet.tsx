'use client'

import { SlidersHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, buttonStyles } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { cn } from '@/lib/cn'
import { countFacetIndex, type FacetRow, queryFromForm, shopQueryString } from '@/lib/shop-filters'
import { RESULTS_HEADING, useListingNav, visible } from './listing-nav'

const SHEET_ID = 'filter-sheet'
const FORM_ID = 'sheet-filters'

const showLabel = (n: number) => (n ? `Show ${n} ${n === 1 ? 'item' : 'items'}` : 'No items match')

/**
 * Phones and tablets: the "Filters" button and its bottom sheet. Choices are batched: ticking
 * updates "Show N items" live (counted on the device from a compact index), and only "Show"
 * navigates. Without JavaScript the button is a link to `#filters`, which reveals the sidebar
 * form in the page.
 */
export function FilterSheet({
  action,
  activeCount,
  total,
  index,
  children,
  className,
}: {
  action: string
  /** Active filter values, for the badge. */
  activeCount: number
  /** Results for the current URL. */
  total: number
  /** Products in scope that match the find text. */
  index: FacetRow[]
  /** `<FilterFields idPrefix="sheet">` plus hidden `q` and `sort`. */
  children: ReactNode
  className?: string
}) {
  const { navigate } = useListingNav()
  // Open only on the page it was opened on: a department link inside it closes it.
  const path = usePathname()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === path
  const setOpen = (value: boolean) => setOpenOn(value ? path : null)
  const [count, setCount] = useState(total)
  const form = useRef<HTMLFormElement>(null)

  const recount = () => {
    if (form.current) setCount(countFacetIndex(index, queryFromForm(new FormData(form.current))))
  }

  // Opening always starts from the URL: reset() returns every box to its server `defaultChecked`.
  const show = () => {
    form.current?.reset()
    setCount(total)
    setOpen(true)
  }

  // Lock the page behind the sheet, as the menu does.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => void (document.documentElement.style.overflow = '')
  }, [open])

  // Kept-alive pages: never come Back to a sheet that is already open.
  useLayoutEffect(() => () => setOpenOn(null), [])

  const clearAll = () => {
    const f = form.current
    if (!f) return
    for (const input of f.querySelectorAll<HTMLInputElement>('input[type=checkbox]'))
      input.checked = false
    const any = f.querySelector<HTMLInputElement>('input[type=radio][value=any]')
    if (any) any.checked = true
    recount()
  }

  return (
    <>
      <a
        href="#filters"
        aria-haspopup="dialog"
        aria-controls={SHEET_ID}
        onClick={(e) => {
          e.preventDefault()
          show()
        }}
        className={cn(buttonStyles({ variant: 'outline', size: 'md', block: true }), className)}
      >
        <SlidersHorizontal aria-hidden />
        Filters
        {activeCount > 0 && (
          <>
            <span
              aria-hidden
              className="grid min-w-6 place-items-center rounded-full bg-crimson px-1.5 text-xs font-bold text-on-dark tabular-nums"
            >
              {activeCount}
            </span>
            <span className="sr-only">, {activeCount} applied</span>
          </>
        )}
      </a>

      <Dialog
        id={SHEET_ID}
        open={open}
        onClose={() => setOpen(false)}
        title="Filters"
        variant="sheet"
        bodyClassName="max-h-[min(70dvh,40rem)] p-4"
        footer={
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={clearAll}>
              Clear all
            </Button>
            <Button type="submit" form={FORM_ID} block disabled={count === 0}>
              {showLabel(count)}
            </Button>
          </div>
        }
      >
        <form
          ref={form}
          id={FORM_ID}
          method="get"
          action={action}
          onChange={recount}
          onSubmit={(e) => {
            e.preventDefault()
            navigate(action + shopQueryString(queryFromForm(new FormData(e.currentTarget))))
            setOpen(false)
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            visible(`#${RESULTS_HEADING}`)?.scrollIntoView({
              block: 'start',
              behavior: reduce ? 'auto' : 'smooth',
            })
          }}
        >
          {children}
        </form>
      </Dialog>
    </>
  )
}
