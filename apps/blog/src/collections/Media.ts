import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '@/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: {
    // Cover images and inline images are shown on public pages, so files are
    // publicly readable. Only staff can upload, change or delete them.
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'],
    imageSizes: [
      { name: 'card', width: 800, height: undefined, position: 'centre' },
      { name: 'social', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'card',
  },
}
