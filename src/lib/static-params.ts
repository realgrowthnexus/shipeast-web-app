/**
 * With Cache Components, `generateStaticParams` must return at least one entry or the build
 * fails. A new live shop can have no baskets or products yet, so we fall back to one slug that
 * matches nothing; that page renders the normal "not found" screen.
 */
export const NO_MATCH_SLUG = '_none'

export function atLeastOne<K extends string>(key: K, slugs: string[]): Record<K, string>[] {
  const list = slugs.length ? slugs : [NO_MATCH_SLUG]
  return list.map((slug) => ({ [key]: slug }) as Record<K, string>)
}
