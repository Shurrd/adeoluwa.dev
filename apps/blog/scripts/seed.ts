/**
 * Creates the default author profile for the site owner. Idempotent.
 *   npm run seed
 * Only the name (from the portfolio footer) and the portfolio URL are set; add
 * a bio yourself in the admin panel if you want one.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

const existing = await payload.find({ collection: 'authors', limit: 1, depth: 0 })
if (existing.totalDocs > 0) {
  payload.logger.info('An author already exists; nothing to seed.')
} else {
  await payload.create({
    collection: 'authors',
    data: { name: 'Adéolúwa Abraham Adéyẹmí', url: 'https://adeoluwa.dev' },
  })
  payload.logger.info('Created the default author.')
}

process.exit(0)
