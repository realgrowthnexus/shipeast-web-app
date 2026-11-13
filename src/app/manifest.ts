import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/** Lets a phone add the shop to its home screen with the right name, icon and colour. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'ShipEast',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff8ee',
    theme_color: '#ae0e31',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/brand/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
