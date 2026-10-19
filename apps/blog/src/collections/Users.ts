import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    // No public registration. The very first user is created through the
    // admin panel's "create first user" screen, which Payload only offers
    // while the collection is empty. Everyone after that is invited by a
    // signed-in user.
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [],
}
