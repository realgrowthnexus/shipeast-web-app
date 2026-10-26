import { ArrowLeft, Trash2 } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AccountHeading } from '@/components/account/account-heading'
import { ConfirmSubmit } from '@/components/account/confirm-submit'
import { Skeleton } from '@/components/ui/card'
import { getAddress } from '@/lib/account/store'
import { addressTitle } from '@/lib/account/types'
import { param } from '@/lib/auth/redirect'
import { requireAccount } from '@/lib/auth/session'
import { getActiveZones } from '@/lib/data/site'
import { deleteAddressAction } from '../../actions'
import { AddressForm } from './address-form'

export async function generateMetadata({
  params,
}: PageProps<'/account/addresses/[id]'>): Promise<Metadata> {
  return { title: (await params).id === 'new' ? 'Add an address' : 'Edit address' }
}

export default function AddressEditorPage(props: PageProps<'/account/addresses/[id]'>) {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <Link
        href="/account/addresses"
        className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-crimson underline-offset-2 hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Family addresses
      </Link>
      <Suspense fallback={<Skeleton className="h-[36rem]" />}>
        <Editor {...props} />
      </Suspense>
    </div>
  )
}

async function Editor({ params, searchParams }: PageProps<'/account/addresses/[id]'>) {
  const [{ id }, sp] = await Promise.all([params, searchParams])
  const account = await requireAccount(`/account/addresses/${id}`)
  const isNew = id === 'new'
  const [address, zones] = await Promise.all([
    isNew ? null : getAddress(account, id),
    getActiveZones(),
  ])
  if (!isNew && !address) notFound()

  return (
    <>
      <AccountHeading title={address ? addressTitle(address) : 'Add an address'}>
        {isNew &&
          'Who are you sending to? Add a landmark: many roads in Jamaica have no house numbers.'}
      </AccountHeading>
      <AddressForm
        address={address}
        parishes={zones.map((z) => z.parish)}
        next={param(sp.next) === 'checkout' ? 'checkout' : undefined}
      />
      {address && (
        <form
          action={deleteAddressAction}
          className="flex flex-col gap-3 border-t border-line pt-6"
        >
          <input type="hidden" name="id" value={address.id} />
          <ConfirmSubmit
            label="Delete this address"
            confirmLabel="Yes, delete"
            question="Delete this address?"
            icon={<Trash2 aria-hidden />}
          />
          <p className="text-small text-ink-muted">Past orders to this address aren’t affected.</p>
        </form>
      )}
    </>
  )
}
