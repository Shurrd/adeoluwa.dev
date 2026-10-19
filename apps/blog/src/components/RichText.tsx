import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import type { CodeBlock as CodeBlockFields, Media } from '@/payload-types'
import { collectHeadings } from '@/lib/headings'
import { mediaSrc } from '@/lib/postView'
import { CodeBlock } from './CodeBlock'

type Nodes = DefaultNodeTypes | SerializedBlockNode<CodeBlockFields>

export function ArticleImage({ media, priority = false }: { media: Media; priority?: boolean }) {
  if (!media.url) return null
  const isSvg = media.mimeType === 'image/svg+xml'
  return (
    <figure className="figure">
      <Image
        src={mediaSrc(media.url)}
        alt={media.alt}
        width={media.width || 1200}
        height={media.height || 675}
        sizes="(min-width: 760px) 680px, 100vw"
        unoptimized={isSvg}
        priority={priority}
      />
      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  )
}

export function RichText({ data }: { data: SerializedEditorState }) {
  const { ids } = collectHeadings(data)

  const converters: JSXConvertersFunction<Nodes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag
      const id = ids.get(node)
      return (
        <Tag id={id}>
          {id ? (
            <a className="anchor" href={`#${id}`}>
              {nodesToJSX({ nodes: node.children })}
            </a>
          ) : (
            nodesToJSX({ nodes: node.children })
          )}
        </Tag>
      )
    },
    upload: ({ node }) => {
      const media = node.value as Media | number
      return typeof media === 'object' ? <ArticleImage media={media} /> : null
    },
    blocks: {
      code: ({ node }) => (
        <CodeBlock
          code={node.fields.code}
          language={node.fields.language}
          filename={node.fields.filename}
        />
      ),
    },
  })

  return <PayloadRichText data={data} converters={converters} />
}
