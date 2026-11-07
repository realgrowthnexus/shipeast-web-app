import type { Metadata } from 'next'
import { ShopListing } from '@/components/shop/listing/shop-listing'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Groceries, household, pharmacy and baby items bought in Jamaica and delivered to your family the same day.',
  alternates: { canonical: '/shop' },
}

/** Every product in one listing: department tabs, filters, and the grid. */
export default function ShopPage({ searchParams }: PageProps<'/shop'>) {
  return <ShopListing scope={{ kind: 'all' }} searchParams={searchParams} />
}
