import { MapPin, Pencil, Plus, Star } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountHeading } from '@/components/account/account-heading'
import { AddressCard } from '@/components/account/address-card'
import { Alert } from '@/components/ui/alert'
import { Button, ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { listAddresses } from '@/lib/account/store'
import { param } from '@/lib/auth/redirect'
import { requireAccount } from '@/lib/auth/session'
import { makeDefaultAddressAction } from '../actions'

export const metadata: Metadata = { title: 'Family addresses' }

export default function AddressesPage({ searchParams }: PageProps<'/account/addresses'>) {
  return (
    <>
      <AccountHeading
        title="Family addresses"
        action={
          <ButtonLink href="/account/addresses/new">
            <Plus aria-hidden />
            Add an address
          </ButtonLink>
        }
      >
        The people you send to. Pick one at checkout and the delivery details fill themselves in.
      </AccountHeading>
      <Suspense fallback={<Skeleton className="h-72" />}>
        <Addresses searchParams={searchParams} />
      </Suspense>
    </>
  )
}

async function Addresses({
  searchParams,
}: {
  searchParams: PageProps<'/account/addresses'>['searchParams']
}) {
  const account = await requireAccount('/account/addresses')
  const [addresses, sp] = await Promise.all([listAddresses(account), searchParams])
  return (
    <div className="flex flex-col gap-6">
      {param(sp.saved) && <Alert tone="ok" title="Address saved" />}
      {param(sp.deleted) && <Alert tone="ok" title="Address deleted" />}
      {addresses.length ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {addresses.map((a) => (
            <li key={a.id}>
              <AddressCard
                address={a}
                actions={
                  <>
                    <ButtonLink href={`/account/addresses/${a.id}`} variant="secondary" size="sm">
                      <Pencil aria-hidden />
                      Edit
                    </ButtonLink>
                    {!a.isDefault && (
                      <form action={makeDefaultAddressAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <Button type="submit" variant="ghost" size="sm">
                          <Star aria-hidden />
                          Make default
                        </Button>
                      </form>
                    )}
                  </>
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<MapPin aria-hidden />}
          title="No saved addresses yet"
          action={<ButtonLink href="/account/addresses/new">Add an address</ButtonLink>}
        >
          Save Mum, Grandma or anyone you send to, with a landmark the driver can look for.
        </EmptyState>
      )}
    </div>
  )
}
