import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '@/lib/access'
import { revalidateEverything } from '@/lib/revalidate'
import { slugify, validateSlug } from '@/lib/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'] },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.name === 'string') data.slug = slugify(data.name)
        return data
      },
    ],
    afterChange: [({ doc }) => (revalidateEverything(), doc)],
    afterDelete: [({ doc }) => (revalidateEverything(), doc)],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) => validateSlug(value),
      admin: { description: 'Generated from the name when left empty.' },
    },
  ],
}
