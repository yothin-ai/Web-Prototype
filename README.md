# Mock Prototype Showcase

A clickable set of mock sites (E-Commerce, Landing Page, Educational) for pitching a decision. Nothing is sent to a server: what a Viewer enters stays in their own browser. Terms are defined in [GLOSSARY.md](GLOSSARY.md), the visual rules in [MOODBOARD.md](MOODBOARD.md).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # typecheck + "no values outside tokens" check
```

Useful addresses: `/#/` Hub, `/#/moodboard`, `/#/ecommerce`, `/#/landing`, `/#/education`. Add `?clean=1` after the path to hide the Shell (press Esc to bring it back).

## Build and deploy

The site is fully static and uses hash routes, so it needs no server rewrite rules and works from any folder or sub-path.

| Command | Output | Use for |
| --- | --- | --- |
| `npm run build` | `dist/` (folder) | Any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 |
| `npm run build:offline` | `dist-offline/index.html` (one file, about 0.9 MB) | Emailing, a USB stick, or a meeting room with no internet: double-click to open |

**Netlify or Cloudflare Pages:** build command `npm run build`, publish directory `dist`.
**Vercel:** framework preset "Vite" (build `npm run build`, output `dist`).
**GitHub Pages:** push to a repository's `main` branch and set Settings → Pages → Source to "GitHub Actions"; [.github/workflows/deploy.yml](.github/workflows/deploy.yml) does the rest.
