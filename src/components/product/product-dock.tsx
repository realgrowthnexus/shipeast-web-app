'use client'

import { type ReactNode, Suspense, useEffect, useState } from 'react'
import { BUY_CONTROL_ATTR } from './dock-target'
import { ProductBasketControl } from './product-basket-control'

/**
 * The phone and tablet buy bar (docs/product-v2/PLAN.md §2.H): sticky, not fixed, as the last
 * child of the page's content, so it settles above the help strip at the end and can never
 * cover the footer. It slides away while the buy box's own control row is on screen. Below
 * 1024px only; not rendered at all for an out-of-stock item.
 */
export function ProductDock({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const row = document.querySelector(`[${BUY_CONTROL_ATTR}]`)
    if (!row) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting))
    io.observe(row)
    return () => io.disconnect()
  }, [])

  return (
    <div
      data-product-dock=""
      data-hidden={hidden || undefined}
      inert={hidden}
      className="sticky bottom-0 z-sticky mt-8 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-float transition-[translate,opacity] duration-250 ease-out-soft data-[hidden]:pointer-events-none data-[hidden]:translate-y-full data-[hidden]:opacity-0 motion-reduce:transition-none lg:hidden"
    >
      {/* Without JavaScript the bar simply stays in view. */}
      <noscript>
        <style>{`[data-product-dock]{translate:none!important;opacity:1!important;pointer-events:auto!important}`}</style>
      </noscript>
      <div className="mx-auto flex h-16 max-w-wide items-center gap-3 gutter">
        {children}
        <div className="w-36 shrink-0">
          <Suspense fallback={<div aria-busy="true" className="h-control w-full skeleton" />}>
            <ProductBasketControl variant="dock" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
