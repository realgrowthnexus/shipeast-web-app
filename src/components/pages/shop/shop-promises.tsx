/** Where to ask for an item we don't list: the request form when it's on, otherwise contact. */
export function requestLink(itemRequests: boolean) {
  return itemRequests
    ? { href: '/request', label: 'Request an item' }
    : { href: '/contact', label: 'Ask us about it' }
}
