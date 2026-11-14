import { SiteShell } from '@/components/site/shell'

/** Every public page shares the home page's shell (src/components/site/shell.tsx). */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return <SiteShell>{children}</SiteShell>
}
