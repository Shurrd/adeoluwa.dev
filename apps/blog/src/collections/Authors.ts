import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '@/lib/access'
import { revalidateEverything } from '@/lib/revalidate'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'url'] },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [({ doc }) => (revalidateEverything(), doc)],
    afterDelete: [({ doc }) => (revalidateEverything(), doc)],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'url', type: 'text', admin: { description: 'Optional link to the author’s site or profile.' } },
    { name: 'bio', type: 'textarea', admin: { description: 'Optional. Leave empty rather than guess.' } },
  ],
}
