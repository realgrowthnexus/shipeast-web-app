import { HeartHandshake, MapPin, ShoppingBasket } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { JamaicaFlag } from '@/components/site/jamaica'
import { Section } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'

const points = [
  {
    icon: MapPin,
    title: 'Run from St. Thomas',
    body: 'Our team lives and works here, so we know the roads and the stores your family uses.',
  },
  {
    icon: ShoppingBasket,
    title: 'Bought off Jamaican shelves',
    body: 'Everything comes from local stores, so it’s the brands and staples they already cook with.',
  },
  {
    icon: HeartHandshake,
    title: 'Packed like it’s for our own',
    body: 'We pick the produce and pack the bags the way we would for our own table.',
  },
]

/**
 * Says plainly that this is a Jamaican service: the flag, a plate of ackee and saltfish, and
 * three facts about where the shopping happens.
 */
export function RootedInJamaica() {
  return (
    <Section tone="tint" wide aria-labelledby="rooted-h">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mb-3 flex items-center gap-3 eyebrow text-crimson">
            <JamaicaFlag className="w-7" />
            Rooted in Jamaica
          </p>
          <h2 id="rooted-h" className="text-h2 text-balance text-ink">
            Out of many, one people. And one basket for home.
          </h2>
          <p className="mt-3 max-w-2xl text-lead text-ink-body">
            ShipEast is a Jamaican company. Your order is shopped, packed and driven by our own team
            on the island, not sent from a warehouse abroad.
          </p>
          <Stagger className="mt-8 grid gap-6">
            {points.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface">
                  <Icon className="size-6 text-crimson" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{title}</h3>
                  <p className="mt-1 text-ink-body">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Two photos, offset: the flag, and the taste of home it stands for */}
        <div className="grid grid-cols-5 items-start gap-4 lg:col-span-6">
          <Reveal className="col-span-3" y={0}>
            <StockPhoto
              name="jmFlag"
              sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, 60vw"
              className="aspect-3/4 rounded-2xl"
            />
          </Reveal>
          <Reveal className="col-span-2 mt-16 sm:mt-24" delay={0.15}>
            <StockPhoto
              name="jmAckee"
              sizes="(min-width: 1280px) 230px, (min-width: 1024px) 19vw, 40vw"
              className="aspect-3/4 rounded-2xl"
            />
            <p className="mt-3 text-small text-ink-muted">Ackee and saltfish, the taste of home.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
