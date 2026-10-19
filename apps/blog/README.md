# blog.adeoluwa.dev

Minimal engineering blog for [adeoluwa.dev](https://adeoluwa.dev): Next.js (App Router) + Payload CMS 3 on PostgreSQL.

It lives in `apps/blog` and is **independent of the portfolio** at the repo root: its own `package.json`, lockfile, Next.js and React versions (the portfolio is on Next 14; Payload 3 needs Next 15.4+/16), and its own Vercel project. The only change outside this folder is `apps` being excluded from the portfolio's `tsconfig.json`, so the portfolio build never type-checks the blog.

| | |
|---|---|
| Public site | `/`, `/page/N`, `/[slug]`, `/category/[slug]`, `/tag/[slug]`, `/feed.xml`, `/sitemap.xml`, `/robots.txt` |
| CMS | `/admin` (Payload admin, Lexical editor) |
| Data | Payload Local API on the server only; no credentials reach the browser |
| Media | Vercel Blob in production, `./media` on disk locally |
| Config | `src/payload.config.ts`, collections in `src/collections`, data access in `src/lib/posts.ts` |

## Local setup

Requires Node 20.18.1+ and npm.

```bash
cd apps/blog
npm install
cp .env.example .env        # then fill in the secrets (see below)
```

Generate the two secrets and paste them into `.env`:

```bash
openssl rand -hex 32   # PAYLOAD_SECRET
openssl rand -hex 32   # PREVIEW_SECRET
```

**Database.** Use any PostgreSQL 14+. If you have none installed, this repo includes a disposable one that needs no Docker:

```bash
npx tsx scripts/dev-db.ts   # leave running; DATABASE_URL is already the .env.example default
```

Then:

```bash
npm run migrate    # apply migrations
npm run seed       # creates the default author (name + portfolio URL only; add a bio in the admin if you like)
npm run dev        # http://localhost:3000
```

In development Payload also pushes schema changes automatically; **in production only migrations run**.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string (use the pooled string on serverless) |
| `PAYLOAD_SECRET` | yes, ≥32 chars | Signs sessions / encrypts Payload internals |
| `PREVIEW_SECRET` | yes, ≥32 chars | Token embedded in admin preview links |
| `SITE_URL` | yes in Vercel *Production* | Canonical origin, e.g. `https://blog.adeoluwa.dev`. Falls back to `VERCEL_URL` on preview deployments and `http://localhost:3000` in dev |
| `BLOB_READ_WRITE_TOKEN` | yes in production | Enables Vercel Blob storage for uploads; empty = local disk |

Missing or weak values fail the build/boot with a readable list (`src/lib/env.ts`).

### Scripts

`dev`, `build`, `build:prod` (migrate, then build), `start`, `lint`, `typecheck`, `test`, `migrate`, `migrate:create`, `generate:types`, `generate:importmap`, `seed`, `create-admin`.

## Database migrations

Schema changes ship as migrations in `src/migrations` (the initial one is committed).

```bash
npm run migrate:create -- add_something   # after editing a collection; review and commit the output
                                          # (schema is identical with or without BLOB_READ_WRITE_TOKEN)
npm run migrate                           # apply
npm run generate:types                    # refresh src/payload-types.ts
```

On Vercel the build command `npm run build:prod` applies pending migrations before building.

## Creating the admin user

There is **no public registration**: only signed-in users can create users. The very first user is the exception, because someone has to be, so do not leave a fresh production database exposed:

```bash
# Run once against the production DATABASE_URL, right after the first migration
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' DATABASE_URL=... PAYLOAD_SECRET=... PREVIEW_SECRET=... npm run create-admin
```

(Or open `/admin` yourself immediately after the first deploy and use the "create first user" screen.) Add collaborators from *Users* in the admin. Password-reset emails need an email adapter, which this project does not configure; an existing user can change a password from their account page.

## Writing, previewing, publishing

1. **Posts → Create new.** Title, excerpt, category and author are required to publish; slug is generated from the title (lowercase letters, numbers, hyphens; unique; reserved names like `admin`, `tag`, `category` are refused). Reading time is calculated on save.
2. The editor offers h2–h4, lists, quotes, links to other posts, images from the media library (alt text and optional caption live on the media item) and a **Code block** (language, optional filename).
3. **Drafts autosave** every ~1.5 s; nothing is public until you press **Publish**. Version history is under *Versions*.
4. **Preview.** The *Preview* button opens the draft in a new tab; the *Live Preview* tab shows it beside the editor and re-renders on every save/autosave.
5. **Publish** sets `publishedAt` (editable to backdate). **Unpublish** (Save Draft on a published post) takes it off the site, feed and sitemap immediately.

### How preview works

Preview links point to `/next/preview?previewSecret=…&path=/<slug>`. The route (`src/app/(frontend)/next/preview/route.ts`) requires **both** the secret (constant-time comparison) **and** a valid Payload admin session, accepts only same-site absolute paths, then turns on Next.js draft mode and redirects. In draft mode the article page loads the latest draft through the Local API *as the signed-in user*, so Payload's access rules still apply, and responds `noindex`. Draft-mode responses are never cached. Use the admin from the same origin as `SITE_URL` so the session cookie is sent to the preview iframe. "Exit preview" (`/next/exit-preview`) turns it off.

## Caching and revalidation

Pages use ISR (`revalidate = 3600` as a safety net). Payload hooks call `revalidatePath` in-process on publish, update of a published post, unpublish and delete, covering the home list and pagination, the article (old and new slug), its categories and tags, `/feed.xml` and `/sitemap.xml`. Renaming a category, tag or author revalidates the whole site. Because this happens inside the same deployment, **no webhook endpoint exists**, so there is nothing to protect or leak.

## Tests

```bash
npm test
```

Vitest, against a real throwaway PostgreSQL started by `tests/globalSetup.ts` (via `embedded-postgres`; no Docker, and `.env` is never read). Covers: published posts on the home page, article rendering by slug, drafts and invalid slugs returning 404, anonymous users unable to create/update/publish/delete or register, RSS and sitemap excluding drafts, revalidation paths per action, preview-token and session checks (including open-redirect attempts), env validation and slug/reading-time/heading helpers. There are no browser (Playwright) tests.

## Deploying to Vercel

The portfolio keeps its existing Vercel project untouched. The blog is a **second Vercel project from the same repository**.

1. **Database.** Create a managed PostgreSQL (Neon, Supabase, Vercel Postgres via the Marketplace, RDS…). Copy its *pooled* connection string. If your pooler (PgBouncer in transaction mode) rejects migrations, run `npm run migrate` once from your machine with the *direct* connection string and use `npm run build` as the build command instead.
2. **Project.** Vercel → *Add New… → Project* → import the same Git repository → set **Root Directory** to `apps/blog` (framework preset: Next.js). The Build Command (`npm run build:prod`, which applies migrations first) is set in `vercel.json`, so no dashboard override is needed.
3. **Media.** Project → *Storage* → create a **Blob** store and connect it; Vercel adds `BLOB_READ_WRITE_TOKEN`. Uploads go browser → Blob directly, avoiding the 4.5 MB function body limit. Uploaded files are served from public Blob URLs; the media collection is therefore public-readable (only staff can write), so do not upload anything confidential.
4. **Environment variables** (Production, and Preview if you want previews): `DATABASE_URL`, `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `SITE_URL=https://blog.adeoluwa.dev` (Production only), `BLOB_READ_WRITE_TOKEN`. Use different secrets from local.
5. **Deploy**, then immediately create the admin user (see above) and run `npm run seed` or create an author in the admin.
6. *Optional:* stop each project rebuilding for the other's commits with *Settings → Git → Ignored Build Step*:
   - blog: `git diff HEAD^ HEAD --quiet -- .`
   - portfolio: `git diff HEAD^ HEAD --quiet -- . ':!apps'`

   (Exit code 0 skips the build. Test this before relying on it; changes to shared root files are ignored by the blog command by design.)

### Attaching `blog.adeoluwa.dev`

1. Blog project → *Settings → Domains* → add `blog.adeoluwa.dev`.
2. Vercel shows the exact DNS record it wants. For a subdomain this is normally a **CNAME** with host/name `blog` pointing at the target Vercel displays (older projects use `cname.vercel-dns.com`). Create exactly that record at whichever DNS provider hosts `adeoluwa.dev`; the portfolio's existing apex records are not touched.
3. Wait for Vercel to show the domain as valid; it issues the TLS certificate automatically. Make sure `SITE_URL` is set to the same origin, then redeploy.
4. Submit `https://blog.adeoluwa.dev/sitemap.xml` to Search Console if you use it.

## Security notes

- Anonymous requests can only read published posts (enforced in Payload access control, and again in every query via `overrideAccess: false`). Create/update/delete/publish of posts, media, authors, categories, tags and users need a signed-in user.
- Sessions: HTTP-only cookie, `Secure` in production, `SameSite=Lax`, 7-day expiry, account lock after 5 failed logins. CORS/CSRF are restricted to `SITE_URL`.
- GraphQL is disabled; `/admin` and `/api` are `noindex` and disallowed in `robots.txt`.
- All users are equal editors (no role separation); invite only people you trust to publish.
- Not included: email delivery (password reset), rate limiting beyond account lockout, or private media.
