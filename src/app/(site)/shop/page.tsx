import type { Metadata } from 'next'
import { ShopListing } from '@/components/shop/listing/shop-listing'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Groceries, household, pharmacy and baby items bought in Jamaica for your family, and we aim to deliver the same day.',
  alternates: { canonical: '/shop' },
}

/** Every product in one listing: the department band, filters and the grid. */
export default function ShopPage({ searchParams }: PageProps<'/shop'>) {
  return <ShopListing scope={{ kind: 'all' }} searchParams={searchParams} />
}
