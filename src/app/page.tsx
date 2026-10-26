import { site } from '@/lib/site'

/** Phase 0 holding page. Replaced by the real home page in Phase 2. */
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-crimson px-4 py-24 text-white">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold tracking-wide uppercase">
          Ship<span className="text-blush">East</span> Shop &amp; Send
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-balance sm:text-5xl">
          Send groceries, not money
        </h1>
        <p className="mt-4 text-lg text-white/85">
          We shop in Jamaica for your family and deliver the same day, with a photo of the receipt
          and a photo at the door.
        </p>
        <p className="mt-10 text-sm text-white/70">{site.company}</p>
      </div>
    </main>
  )
}
