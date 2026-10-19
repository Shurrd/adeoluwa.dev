import type { Block } from 'payload'
import { CODE_LANGUAGES } from '@/lib/languages'

export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: { singular: 'Code block', plural: 'Code blocks' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'typescript',
          options: [...CODE_LANGUAGES],
          admin: { width: '40%' },
        },
        {
          name: 'filename',
          type: 'text',
          admin: { width: '60%', description: 'Optional caption shown above the code.' },
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: { components: { Field: '/fields/CodeBlockField#CodeBlockField' } },
    },
  ],
}
