import { Camera, DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { formatTime, formatUsd } from '@/lib/format'

/**
 * The product's promise in one picture: the store receipt and the photo at the door, side
 * by side. Used on the home hero, how it works, tracking and order detail. Before a photo
 * exists, each side shows what will appear there.
 */
export function ProofPair({
  receipt,
  door,
  tilt = false,
  onDark = false,
  className,
}: {
  receipt: {
    store: string
    lines: { name: string; cents: number }[]
    totalCents: number
    at?: string
    photo?: string | null
  }
  door: { recipient: string; place: string; at?: string; photo?: string | null }
  /** Fanned-out look for marketing pages; flat for tracking and order detail. */
  tilt?: boolean
  /** Sitting on a crimson section: lighter captions and an oxblood door card. */
  onDark?: boolean
  className?: string
}) {
  const caption = cn(
    'flex items-center gap-1.5 text-xs font-medium sm:text-sm',
    onDark ? 'text-white/85' : 'text-ink-muted',
  )
  const captionIcon = cn('size-4', onDark ? 'text-blush' : 'text-crimson')
  return (
    <div className={cn('grid grid-cols-2 items-start gap-3 sm:gap-5', className)}>
      <figure className={cn('flex flex-col gap-2', tilt && '-rotate-2 sm:-rotate-3')}>
        {receipt.photo ? (
          <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-lift">
            <Image
              src={receipt.photo}
              alt={`Receipt from ${receipt.store}`}
              fill
              sizes="(min-width: 640px) 240px, 45vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-white px-3 pt-4 pb-6 text-[11px] leading-relaxed text-ink shadow-lift receipt-edge sm:px-4 sm:text-xs">
            <p className="text-center font-bold tracking-wide">{receipt.store}</p>
            <p className="mb-2 text-center text-ink-muted">Kingston, Jamaica</p>
            <ul className="border-y border-dashed border-ink/25 py-2">
              {receipt.lines.map((l) => (
                <li key={l.name} className="flex justify-between gap-2">
                  <span className="truncate">{l.name}</span>
                  <span className="tabular-nums">{formatUsd(l.cents).replace('USD', '')}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="tabular-nums">{formatUsd(receipt.totalCents)}</span>
            </p>
          </div>
        )}
        <figcaption className={caption}>
          <Camera className={captionIcon} aria-hidden />
          Receipt{receipt.at ? `, ${formatTime(receipt.at)}` : ''}
        </figcaption>
      </figure>

      <figure className={cn('flex flex-col gap-2', tilt && 'mt-6 rotate-2 sm:mt-10 sm:rotate-3')}>
        <div
          className={cn(
            'relative aspect-[3/4] overflow-hidden rounded-md shadow-lift',
            onDark ? 'border border-white/15 bg-oxblood' : 'bg-premium',
          )}
        >
          {door.photo ? (
            <Image
              src={door.photo}
              alt={`Delivery to ${door.recipient}`}
              fill
              sizes="(min-width: 640px) 240px, 45vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-3 text-white sm:p-4">
              <DoorOpen
                className="size-10 text-blush/80 sm:size-12"
                strokeWidth={1.5}
                aria-hidden
              />
              <div>
                <p className="text-xs text-blush sm:text-sm">Delivered to</p>
                <p className="text-sm leading-tight font-bold sm:text-base">{door.recipient}</p>
                <p className="text-xs text-white/75 sm:text-sm">{door.place}</p>
              </div>
            </div>
          )}
        </div>
        <figcaption className={caption}>
          <Camera className={captionIcon} aria-hidden />
          At the door{door.at ? `, ${formatTime(door.at)}` : ''}
        </figcaption>
      </figure>
    </div>
  )
}
