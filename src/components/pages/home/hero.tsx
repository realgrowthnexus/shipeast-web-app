import { Camera, Clock3, MapPin, Receipt } from 'lucide-react'
import { ProofPair } from '@/components/order/proof-pair'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { sampleDoor, sampleReceipt } from './sample-proof'

const chips = [
  { icon: Receipt, text: 'Receipt photo' },
  { icon: Camera, text: 'Photo at the door' },
  { icon: Clock3, text: 'Same day' },
]

/**
 * The home hero: the promise on the left, and a photo of what we send with the two proof
 * photos overlapping it on the right. CSS entrances only, so nothing waits for JavaScript.
 */
export function HomeHero({ parishes }: { parishes: string }) {
  return (
    <section className="overflow-hidden bg-crimson text-white">
      <div className="mx-auto grid w-full max-w-wide items-center gap-14 gutter section-lg lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="mb-5 flex animate-rise items-center gap-2 eyebrow text-blush">
            <MapPin className="size-4" aria-hidden />
            Delivering to {parishes} today
          </p>
          <h1 className="animate-rise text-display text-balance [animation-delay:60ms]">
            Send groceries, not money
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-lead text-on-crimson-muted [animation-delay:140ms]">
            Fill a basket online and pay in US dollars. We buy it in Jamaica and deliver it to your
            family’s door the same day, with a photo of the receipt and a photo at the door.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:220ms]">
            <ButtonLink href="/shop" variant="onDark" size="lg">
              Start shopping
            </ButtonLink>
            <ButtonLink
              href="/how-it-works"
              size="lg"
              variant="ghost"
              className="text-white hover:bg-crimson-700"
            >
              How it works
            </ButtonLink>
          </div>
          <ul className="mt-10 flex animate-rise flex-wrap gap-2 [animation-delay:300ms]">
            {chips.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex min-h-9 items-center gap-2 rounded-full bg-crimson-700 px-4 text-small"
              >
                <Icon className="size-4 text-blush" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* The photo says what we send; the proof cards overlap it to say how you know */}
        <div className="mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
          <div className="animate-rise [animation-delay:100ms] lg:pl-16">
            <StockPhoto
              name="heroGroceries"
              preload
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 512px) 512px, 100vw"
              className="aspect-4/3 rounded-2xl sm:aspect-5/4"
            />
          </div>
          <div className="relative -mt-24 w-[94%] animate-rise px-2 [animation-delay:380ms] sm:-mt-40 sm:w-[82%] lg:-mt-52 lg:w-[72%] lg:px-0">
            <ProofPair tilt onDark receipt={sampleReceipt} door={sampleDoor} />
          </div>
        </div>
      </div>
    </section>
  )
}
