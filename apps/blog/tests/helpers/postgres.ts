import EmbeddedPostgres from 'embedded-postgres'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export type TestDatabase = { url: string; stop: () => Promise<void> }

/** Starts a throwaway PostgreSQL server (no Docker or system install needed). */
export async function startTestDatabase(port: number, name = 'blog_test'): Promise<TestDatabase> {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-pg-'))
  const pg = new EmbeddedPostgres({
    databaseDir: dataDir,
    user: 'postgres',
    password: 'postgres',
    port,
    persistent: false,
    onLog: () => {},
    onError: () => {},
  })
  await pg.initialise()
  await pg.start()
  await pg.createDatabase(name)
  return {
    url: `postgresql://postgres:postgres@127.0.0.1:${port}/${name}`,
    stop: async () => {
      await pg.stop()
      fs.rmSync(dataDir, { recursive: true, force: true })
    },
  }
}
