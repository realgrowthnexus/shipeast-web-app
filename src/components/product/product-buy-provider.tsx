'use client'

import { createContext, type ReactNode, use } from 'react'
import { useListingNav } from '@/components/shop/listing/listing-nav'
import { useQuantityAction } from '@/lib/basket/use-quantity-control'

type QuantityAction = ReturnType<typeof useQuantityAction>

interface ProductBuy extends QuantityAction {
  productId: string
  name: string
  inStock: boolean
  /** This product's quantity in the basket cookie, read on the server inside a Suspense boundary. */
  quantity: Promise<number>
}

const Ctx = createContext<ProductBuy | null>(null)

/**
 * One basket action for the whole product page, so the buy box's control and the phone dock
 * stay in step: a tap in either shows the same number in both at once. Announces through the
 * page's one live region (`ListingNavProvider`).
 */
export function ProductBuyProvider({
  productId,
  name,
  inStock,
  quantity,
  children,
}: {
  productId: string
  name: string
  inStock: boolean
  quantity: Promise<number>
  children: ReactNode
}) {
  const { announce } = useListingNav()
  const control = useQuantityAction(name, announce)
  return <Ctx value={{ ...control, productId, name, inStock, quantity }}>{children}</Ctx>
}

export function useProductBuy() {
  const ctx = use(Ctx)
  if (!ctx) throw new Error('useProductBuy must be used inside ProductBuyProvider')
  return ctx
}

/** The quantity shown right now. Suspends until the basket cookie is read: keep it in Suspense. */
export function useShownQuantity() {
  const { quantity, shownFor } = useProductBuy()
  return shownFor(use(quantity))
}
