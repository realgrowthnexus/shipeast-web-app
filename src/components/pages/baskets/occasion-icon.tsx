import { Baby, Backpack, Pill, ShoppingBasket, TreePine } from 'lucide-react'
import type { Basket } from '@/lib/types'

const icons = {
  everyday: ShoppingBasket,
  baby: Baby,
  pharmacy: Pill,
  christmas: TreePine,
  school: Backpack,
} as const

/** The icon for who a basket is for. Always decorative: the occasion line names it. */
export function OccasionIcon({
  occasion,
  className,
}: {
  occasion: Basket['occasion']
  className?: string
}) {
  const Icon = icons[occasion]
  return <Icon className={className} aria-hidden />
}
