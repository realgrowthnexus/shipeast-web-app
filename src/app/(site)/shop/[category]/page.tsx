import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ShopListing } from '@/components/shop/listing/shop-listing'
import { getCategory } from '@/lib/data/catalogue'
import { getCategories } from '@/lib/data/site'
import { atLeastOne } from '@/lib/static-params'

export async function generateStaticParams() {
  return atLeastOne(
    'category',
    (await getCategories()).map((c) => c.slug),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/shop/[category]'>): Promise<Metadata> {
  const category = await getCategory((await params).category)
  if (!category) return {}
  return {
    title: category.name,
    description: `${category.description} Bought in Jamaica and delivered the same day.`,
    alternates: { canonical: `/shop/${category.slug}` },
  }
}

/** One department in the same listing as `/shop`, with its aisles as a filter. */
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<'/shop/[category]'>) {
  const category = await getCategory((await params).category)
  if (!category) notFound()
  return <ShopListing scope={{ kind: 'department', category }} searchParams={searchParams} />
}
