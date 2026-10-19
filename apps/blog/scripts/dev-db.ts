/**
 * Optional: a disposable local PostgreSQL (no Docker needed) for development.
 *   npx tsx scripts/dev-db.ts
 * Then set DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54329/blog_dev
 */
import { startTestDatabase } from '../tests/helpers/postgres'

const db = await startTestDatabase(54329, 'blog_dev')
console.log(`PostgreSQL ready: ${db.url}`)
process.on('SIGINT', async () => {
  await db.stop()
  process.exit(0)
})
setInterval(() => {}, 1 << 30)
