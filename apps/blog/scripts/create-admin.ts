/**
 * Creates the first admin user from the command line, so the "create first
 * user" screen at /admin is never left open on a fresh production database.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
 *
 * Refuses to run if any user already exists. Credentials come from the
 * environment only; nothing is stored or defaulted.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password || password.length < 12) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters).')
  process.exit(1)
}

const payload = await getPayload({ config })
const { totalDocs } = await payload.find({ collection: 'users', limit: 1, depth: 0 })

if (totalDocs > 0) {
  console.error('A user already exists; sign in at /admin and invite others from there.')
  process.exit(1)
}

await payload.create({ collection: 'users', data: { email, password } })
payload.logger.info(`Created admin user ${email}`)
process.exit(0)
