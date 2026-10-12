# Daily news on zilu.dev

The standalone page at `/news/` reads `/news/briefings.json` and uses the site's terminal-inspired design. It leaves the existing React hash routes unchanged.

Each briefing is a JSON object of the form:

```json
{
  "date": "2026-10-12",
  "stories": [
    {
      "category": "AI",
      "headline": "Verified headline",
      "summary": "Two to four sentences in original wording.",
      "why_it_matters": "A practical takeaway.",
      "source_url": "https://example.com/primary-source",
      "image_url": "https://example.com/licensed-image.jpg",
      "image_alt": "Descriptive alternative text"
    }
  ]
}
```

Every edition must contain **exactly five stories**; the JSON example shows only one story for brevity. Put the newest edition first in the JSON array. Image fields are optional; include an image only with suitable usage rights. Cite original sources, verify facts and avoid copied article text.

**Automation not configured:** ChatGPT Scheduled Tasks do not directly provide their response as an API feed. A separate authenticated publishing workflow is necessary to reproduce the exact content automatically.

**Deployment check:** Cloudflare must serve `news/index.html` as `/news/`, and serve `news/briefings.json` as a static asset.
