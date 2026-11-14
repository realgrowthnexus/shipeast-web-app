import type { ReactNode } from 'react'
import { SiteShell } from '@/components/site/shell'

/** The home page shares the one site shell (src/components/site/shell.tsx). */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
