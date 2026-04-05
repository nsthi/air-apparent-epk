# Air Apparent — EPK

Single-page Electronic Press Kit built with Vite + React.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output lands in `dist/`. `vite.config.js` uses `base: "./"` so the build is
portable — the same `dist/` works on GitHub Pages project sites, user sites,
Netlify, or any static host.

## Deploy to GitHub Pages

### Option A — automated (recommended)

1. Create a GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` runs on every push to
   `main`, builds, and publishes `dist/` to Pages. The URL shows up in the
   workflow run summary.

### Option B — manual one-shot

```bash
npm run build
npx gh-pages -d dist
```

(You'll need `npx gh-pages` once and a repo already pushed.)

## Structure

- `air_apparent_epk.jsx` — the EPK component (single file, embedded
  thumbnail images as base64).
- `src/main.jsx` — React entry, imports the component.
- `src/styles.css` — root-level niceties (font smoothing, reduced motion).
- `index.html` — document shell with SEO + OG tags.
- `vite.config.js` — Vite config, `base: "./"` for portable builds.
- `.github/workflows/deploy.yml` — GH Pages CI.
