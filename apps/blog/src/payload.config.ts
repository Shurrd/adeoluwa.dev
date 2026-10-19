import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { getEnv } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const env = getEnv()

export default buildConfig({
  serverURL: env.siteUrl,
  cors: [env.siteUrl],
  csrf: [env.siteUrl],
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · blog.adeoluwa.dev', robots: 'noindex, nofollow' },
  },
  collections: [Posts, Authors, Categories, Tags, Media, Users],
  editor: lexicalEditor(),
  secret: env.payloadSecret,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: {
      connectionString: env.databaseUrl,
      // Serverless functions each hold their own pool; keep it small and use
      // your provider's pooled connection string.
      max: 5,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(env.blobToken),
      collections: { media: true },
      token: env.blobToken,
      // Upload straight from the browser to Blob; Vercel functions cap request bodies at 4.5 MB.
      clientUploads: true,
      // Same database schema with or without a token, so migrations generated locally match production.
      alwaysInsertFields: true,
    }),
  ],
})
