import type { CollectionConfig } from 'payload'
import { articleEditor } from '@/fields/editor'
import {
  computeDerivedFields,
  generateSlug,
  revalidatePostAfterChange,
  revalidatePostAfterDelete,
} from '@/hooks/postHooks'
import { isAuthenticated, publishedOrStaff } from '@/lib/access'
import { previewUrl } from '@/lib/previewUrl'
import { validateSlug } from '@/lib/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'publishedAt', 'category', 'updatedAt'],
    livePreview: {
      url: ({ data }) => previewUrl(typeof data?.slug === 'string' ? data.slug : undefined),
    },
    preview: (doc) => previewUrl(typeof doc?.slug === 'string' ? doc.slug : undefined),
  },
  access: {
    read: publishedOrStaff,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
    readVersions: isAuthenticated,
  },
  versions: {
    maxPerDoc: 25,
    drafts: { autosave: { interval: 1500 } },
  },
  hooks: {
    beforeValidate: [generateSlug],
    beforeChange: [computeDerivedFields],
    afterChange: [revalidatePostAfterChange],
    afterDelete: [revalidatePostAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', required: true, maxLength: 140 },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 300,
              admin: { description: 'Shown in lists and used as the default social description.' },
            },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', editor: articleEditor, required: true },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              maxLength: 70,
              admin: { description: 'Defaults to the article title. Aim for 60 characters or fewer.' },
            },
            {
              name: 'description',
              type: 'textarea',
              maxLength: 170,
              admin: { description: 'Defaults to the excerpt. Aim for 160 characters or fewer.' },
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) => validateSlug(value),
      admin: {
        position: 'sidebar',
        description: 'Public URL: blog.adeoluwa.dev/<slug>. Generated from the title when empty.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Set automatically on first publish; edit to backdate.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', readOnly: true, description: 'Minutes. Calculated on save.' },
    },
  ],
}
