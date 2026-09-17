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

2026-09-17 pending local layout adjustment: src/style.css adds compact desktop rules for >=900px wide / >=650px high, viewport-sized art column, reduced header and copy spacing. Build passed; local browser policy check denied 127.0.0.1:5174. User explicitly requested local validation first, so NOT DEPLOYED. Local Vite preview retained at http://127.0.0.1:5174/private/mio-pitch/. Need visual viewport checks (all tracks, EN/KO) before publication.

2026-09-17: User approved publication after viewing local preview. Compact layout deployed successfully, version 383b298e-ae97-490d-9330-3950a61bf3b2. Prior pending-deployment note is superseded. Build passed; automated visual check remains unavailable.
