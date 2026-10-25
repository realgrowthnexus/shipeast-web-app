import { ArrowLeft, Download } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Container } from '@/components/site/page-intro'
import { Skeleton } from '@/components/ui/card'
import { formatDateTime } from '@/lib/format'
import { getSenderOrder } from '@/lib/orders/store'

export const metadata: Metadata = {
  title: 'Receipt and door photos',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default function PhotosPage({ params }: PageProps<'/track/[token]/photos'>) {
  return (
    <Container className="py-10 sm:py-14">
      <Suspense fallback={<Skeleton className="h-[40rem]" />}>
        <Photos params={params} />
      </Suspense>
    </Container>
  )
}

async function Photos({ params }: { params: PageProps<'/track/[token]/photos'>['params'] }) {
  const { token } = await params
  const order = await getSenderOrder(token)
  if (!order) notFound()
  const shots = [
    { key: 'receipt', title: 'Store receipt', photo: order.photos.receipt },
    {
      key: 'door',
      title: `At the door${order.receiverName ? `, received by ${order.receiverName}` : ''}`,
      photo: order.photos.door,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <Link
        href={`/track/${order.token}`}
        className="flex items-center gap-1 self-start font-semibold text-crimson"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to order {order.orderNo}
      </Link>
      <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
        Receipt and door photos
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {shots.map(({ key, title, photo }) => (
          <figure key={key} className="flex flex-col gap-3">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo.url} alt={title} className="w-full rounded-lg border border-line" />
            ) : (
              <div className="grid aspect-[3/4] place-items-center rounded-lg border-2 border-dashed border-line p-6 text-center text-ink-muted">
                Not taken yet.
              </div>
            )}
            <figcaption className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-ink">
                {title}
                {photo && (
                  <span className="block text-sm font-normal text-ink-muted">
                    {formatDateTime(photo.at)}
                  </span>
                )}
              </span>
              {photo && (
                <a
                  href={photo.url}
                  download
                  className="flex min-h-11 items-center gap-1.5 rounded-md px-3 font-semibold text-crimson hover:bg-blush-200"
                >
                  <Download className="size-4" aria-hidden /> Download
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
