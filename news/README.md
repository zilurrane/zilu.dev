# Daily technology briefing — Astro workflow

The authoritative content source is `news/briefings.json`, an array sorted by date descending. Astro builds `/news/`, `/news/archive/`, paginated archive routes, and dated `/news/YYYY-MM-DD-daily-tech-news/` pages from this file.

Each edition contains exactly five entries with `category`, `headline`, `summary`, `why_it_matters`, and `source_url`. Each `source_url` must be a checked HTTPS URL leading to the specific original report or announcement, not a publisher's homepage. Excerpts appear on `/news/`; full text, why-it-matters and primary-source links appear on the dated edition.

## Scheduled publishing contract
- At 08:00 Asia/Kolkata, research announcements from the preceding 24 hours (previous 08:00 through current 08:00 IST). Verify the primary publication time; if not verifiable, do not assert strict recency.
- Decide and preserve a single canonical five-story edition for both ChatGPT and JSON. Do not pad with stale stories or fabricate evidence.
- Fetch `main:news/briefings.json` and its blob SHA; validate its array shape and historical dates.
- Upsert exactly one YYYY-MM-DD object, preserving all other editions; commit **only this JSON file** using GitHub `update_file` and the latest SHA.
- Re-fetch `main` and verify exactly five byte-for-byte identical stories, in the same order. Report the GitHub commit SHA or a clear publication failure.
- A GitHub commit may trigger a Cloudflare build but does not prove live deployment. Verify deployment separately. Do not email the briefing automatically.

Astro's `src/pages/news/` routes and `@astrojs/sitemap` generate all HTML and sitemap entries at build time. Never manually create dated HTML, edit sitemap XML or overwrite the deployed `robots.txt` as part of a daily edition.

## SEO and integrity
- `/news/` contains teasers; the dated edition is the complete article.
- `/news/archive/` and its paginated pages provide crawlable links to every historical edition.
- `public/robots.txt` references the generated `/sitemap-index.xml`.
- Build tests: `npm run build && npm run seo:check`.
- Source link corrections and editorial corrections to previous editions should be clearly separated from each day's automatic publication.

Individual story pages are **not** created; each dated page is a curated digest, not original reporting. Primary sources retain attribution.
