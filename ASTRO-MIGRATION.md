# zilu.dev Astro redesign

This work lives on the **astro-redesign** branch; production `main` remains unchanged.

## Design
- Static Astro, no runtime React required for content.
- Responsive editorial layout, cream/dark palette, orange accent, minimal JS (theme toggle).
- Reusable Base layout for metadata, nav, footer, Person entity and per-page schemas.
- Complete HTML for homepage, projects, writing, news and resume.

## Run locally
```sh
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare Workers
Static assets from `dist` with Wrangler:
```sh
npm run deploy
```
Do not point the existing production deployment to this branch until the build and preview have been validated.

## Content
News is built from the root-level `news/briefings.json` used by the scheduled briefing. Every new JSON commit triggers a fresh Astro build when connected to your GitHub-based Cloudflare deployment. Astro generates the daily `/news/YYYY-MM-DD-daily-tech-news/` route via `getStaticPaths` and updates the sitemap automatically. The task should update JSON only after switching to the Astro deployment (not create separate HTML files).

## SEO/AEO
- Static HTML, distinct canonical URLs, semantic headings, Person/Article/CreativeWork structured data, sitemap and AI-search bot access.
- Training crawlers stay blocked by choice.
- `llms.txt` is informational, not a ranking mechanism.
- No old URL redirects are configured, per the requested new URL structure; broken inbound links and ranking changes are possible.
- External DEV articles stay on DEV rather than claiming copied authorship; published date/source stays accurate.

## Pre-launch checks
- Verify biography/title/role dates (some old portfolio claims disagree).
- Run Lighthouse mobile, accessibility, Google Rich Results and Search Console URL Inspection.
- Verify all source links and protect secrets.
- Update scheduled task to write ONLY news JSON after launch.
