import { BlocksFeature, HeadingFeature, LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CodeBlock } from '@/blocks/CodeBlock'

/** Article body editor: h2–h4 only (the page title is the h1), plus code blocks. */
export const articleEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => feature.key !== 'heading' && feature.key !== 'link'),
    // Internal links may target other posts only (never users or other private collections).
    LinkFeature({ enabledCollections: ['posts'] }),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BlocksFeature({ blocks: [CodeBlock] }),
  ],
})
