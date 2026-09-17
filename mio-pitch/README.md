# Mio pitch — custom domain

Live: https://airapparentmusic.com/private/mio-pitch/
Admin: https://airapparentmusic.com/private/mio-pitch/admin

Standalone Cloudflare Worker with static Vite/React assets and D1. Scoped routes only; EPK root stays on GitHub Pages. No ChatGPT hosting dependency. Public pitch is noindex, not access restricted. Admin uses HTTP Basic auth (username neil), strong password in the Worker secret ADMIN_PASSWORD. Password is kept outside this repo in /Users/neilsethi/Documents/Codex/private/mio-admin-access.txt (0600).

## Updating

`npm ci`, `npm run build`, `npx wrangler deploy`.

Tracking tests: `node tests/worker.mjs` (Worker handlers with real SQLite and simulated bindings; not a browser check).

D1: air-apparent-mio-plays, e85c75f1-dbc0-4272-897f-1df5aed92b33. Migrations: `npx wrangler d1 migrations apply DB --remote`.

Imported six historical plays from original Sites DB on 2026-09-17, excluding known test event. New events retain approximate cf city/region/country, no IP/identities. Resume/replay counts once per playback event; retries deduplicate by UUID.

2026-09-17 deployment: 53cb1fe5-fe09-4f54-9271-1331c85b8ec8. Cloudflare deploy succeeded and both www/apex path routes registered. Domain root HTTP returns a Cloudflare browser challenge; OAuth token cannot read security settings/rulesets (403). Browser automation policy check is also unavailable. Live visual/audio/Instagram preview verification remains outstanding. Do not assert challenge resolved or circumvent it. This may require owner configuration in Cloudflare dashboard.

Parent repository is public. Source/media have not been pushed there; do not inadvertently publish pitch assets through the root GitHub Pages workflow. Deployment uses Cloudflare directly.

Handler tests pass: owner/wrong-password checks, insertion, retry dedup, cf location capture, origin validation, asset path rewrite and unrelated path exclusion. Native local workerd test hit internal runtime startup errors; no claim of local workerd verification.
