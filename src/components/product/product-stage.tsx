import { ShoppingBasket } from 'lucide-react'
import { departmentIcons } from '@/components/shop/product-image'
import { FadeImage, StockImage } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { productPhotos } from '@/lib/photos/products'
import type { Product } from '@/lib/types'

/**
 * The product page's stage (docs/product-v2/PLAN.md §2.B): a grey square (4:3 on phones) that
 * shows the store's pack shot whole, a stock photo of the item filling the frame, or, with
 * neither, a designed shelf label. The pack shots are 640px at most, so they are never shown
 * wider than 440 CSS px, and there is no zoom.
 */
export function ProductStage({ product }: { product: Product }) {
  const outOfStock = product.status !== 'visible'
  const packShot = product.imagePath?.startsWith('/products/') ? product.imagePath : null
  const stock = !product.imagePath ? productPhotos[product.slug] : undefined
  const alt = product.size ? `${product.name}, ${product.size}` : product.name
  const Icon = departmentIcons[product.categoryId] ?? ShoppingBasket

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-muted md:aspect-square md:max-w-[34rem] lg:max-w-none',
        (packShot || stock) && 'photo-loading',
      )}
    >
      {packShot ? (
        <>
          <div className="absolute inset-[12%] m-auto max-h-[440px] max-w-[440px] lg:inset-[14%]">
            <FadeImage
              src={packShot}
              alt={alt}
              fill
              preload
              sizes="(min-width: 1024px) 440px, 76vw"
              className={cn('object-contain mix-blend-multiply', outOfStock && 'opacity-60')}
            />
          </div>
          <p className="absolute inset-x-0 bottom-0 px-4 pb-3 text-center text-xs text-ink-muted">
            Store catalogue picture. Packaging may vary.
          </p>
        </>
      ) : stock ? (
        <StockImage
          photo={stock}
          alt={alt}
          sizes="(min-width: 1024px) 592px, (min-width: 768px) 544px, 100vw"
          preload
          className={cn('absolute inset-0 rounded-none', outOfStock && 'opacity-60')}
        />
      ) : (
        // Decorative: the h1 beside it names the item.
        <div aria-hidden className="absolute inset-0 grid place-items-center p-4">
          <div className="w-[72%] max-w-[22rem] rounded-xl border-t-4 border-crimson bg-surface p-card shadow-lift md:p-card-lg">
            <span className="grid size-10 place-items-center rounded-md bg-surface-selected text-crimson md:size-12">
              <Icon className="size-icon md:size-icon-lg" />
            </span>
            <p className="mt-4 line-clamp-2 font-display text-title font-semibold text-balance text-ink">
              {product.name}
            </p>
            {product.size && <p className="mt-1 text-small text-ink-muted">{product.size}</p>}
            <p className="mt-3 hidden border-t border-line pt-3 text-xs text-ink-muted md:block">
              No picture yet. We buy exactly the item named.
            </p>
          </div>
        </div>
      )}
      {outOfStock && (
        <p className="absolute top-4 left-4 rounded-md bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-lift">
          Out of stock today
        </p>
      )}
    </div>
  )
}
