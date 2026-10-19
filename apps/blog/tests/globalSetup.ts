import { startTestDatabase, type TestDatabase } from './helpers/postgres'

let database: TestDatabase | undefined

/**
 * Boots a real PostgreSQL for the integration specs and points the app at it.
 * Test config never reads .env, so a developer's real database is never touched.
 */
export async function setup() {
  database = await startTestDatabase(54330, 'blog_test')
  process.env.DATABASE_URL = database.url
  process.env.PAYLOAD_SECRET = 'test-payload-secret-0123456789abcdef0123'
  process.env.PREVIEW_SECRET = 'test-preview-secret-0123456789abcdef012'
  process.env.SITE_URL = 'https://blog.example.test'
  delete process.env.BLOB_READ_WRITE_TOKEN
}

export async function teardown() {
  await database?.stop()
}
