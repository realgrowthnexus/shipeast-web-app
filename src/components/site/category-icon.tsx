import { Baby, Pill, ShoppingBasket, SprayCan, Wheat } from 'lucide-react'

const icons = {
  groceries: Wheat,
  household: SprayCan,
  pharmacy: Pill,
  'baby-and-child': Baby,
} as const

export function CategoryIcon({ slug }: { slug: string }) {
  const Icon = icons[slug as keyof typeof icons] ?? ShoppingBasket
  return <Icon aria-hidden />
}
