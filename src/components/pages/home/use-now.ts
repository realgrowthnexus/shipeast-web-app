import { useEffect, useState } from 'react'

/** Re-reads the clock every 30 seconds in the browser; `null` until hydrated. */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = setInterval(tick, 30_000)
    return () => clearInterval(timer)
  }, [])
  return now
}
