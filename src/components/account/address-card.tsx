import { MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { addressTitle, type SavedAddress } from '@/lib/account/types'

/** A saved family address: who, where, and the landmark the driver looks for. */
export function AddressCard({
  address,
  actions,
  compact,
}: {
  address: SavedAddress
  actions?: ReactNode
  compact?: boolean
}) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-bold text-ink">{addressTitle(address)}</h3>
        {address.isDefault && <Badge tone="progress">Default</Badge>}
      </div>
      <div className="flex gap-2 text-ink-body">
        <MapPin className="mt-1 size-4 shrink-0 text-crimson" aria-hidden />
        <p>
          {address.label && (
            <>
              {address.recipientName}
              <br />
            </>
          )}
          {address.street}, {address.community},{' '}
          <span className="whitespace-nowrap">{address.parish}</span>
          {!compact && address.landmark && (
            <span className="block text-small text-ink-muted">Landmark: {address.landmark}</span>
          )}
        </p>
      </div>
      {!compact && (
        <p className="flex items-center gap-2 text-ink-body">
          <Phone className="size-4 shrink-0 text-crimson" aria-hidden />
          {address.phone}
        </p>
      )}
      {actions && <div className="mt-auto flex flex-wrap gap-2 pt-1">{actions}</div>}
    </div>
  )
}
