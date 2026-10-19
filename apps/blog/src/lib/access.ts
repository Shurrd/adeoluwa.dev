import type { Access } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

/** Anonymous visitors see published documents only; signed-in staff see everything. */
export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
