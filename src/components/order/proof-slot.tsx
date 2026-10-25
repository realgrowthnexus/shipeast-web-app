import { Camera, DoorOpen, ReceiptText } from 'lucide-react'
import { formatTime } from '@/lib/format'

/**
 * One proof photo on the tracking page, or an honest empty slot saying when it will appear.
 * Signed photo URLs expire, so they skip the image optimiser.
 */
export function ProofSlot({
  kind,
  photo,
  alt,
}: {
  kind: 'receipt' | 'door'
  photo: { url: string; at: string } | null
  alt: string
}) {
  const Icon = kind === 'receipt' ? ReceiptText : DoorOpen
  const title = kind === 'receipt' ? 'Store receipt' : 'At the door'
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-blush-200">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt={alt} className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <Icon className="size-10 text-crimson/40" strokeWidth={1.5} aria-hidden />
            <p className="text-sm text-ink-muted">
              {kind === 'receipt'
                ? 'The receipt photo appears here once the driver has shopped.'
                : 'The door photo appears here once it’s delivered.'}
            </p>
          </div>
        )}
      </div>
      <figcaption className="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
        <Camera className="size-4 text-crimson" aria-hidden />
        {title}
        {photo ? `, ${formatTime(photo.at)}` : ''}
      </figcaption>
    </figure>
  )
}
