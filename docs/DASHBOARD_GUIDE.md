# Dashboard Quick Access Guide

## What the dashboard shows

The ContextLayer dashboard is your at-a-glance view of multi-modal brand mentions.

### Top row — Stats cards
- **Total mentions** — how many posts were classified.
- **With brand logo** — how many had a logo detected *in the image* (text-only tools would miss these).
- **Ironic / sarcastic** — posts flagged as ironic. Keyword tools usually score these as positive — they're often negative.
- **Avg mention score** — average confidence (0–1) that posts are real brand mentions.

### Filter bar
- **Brand** — narrow down to one brand.
- **Source** — twitter, instagram, tiktok, etc.

### Visual sentiment pie
Sentiment classified from **the image content**, not just text. This is where ContextLayer adds the most lift over legacy tools.

### Mentions table
Every classified post with:
- Source platform
- Detected brand
- Original post text
- Signal badges: `logo`, `visual: …`, `text: …`, `ironic`
- Final mention score

---

## Running the dashboard

```bash
cd dashboard
npm install
npm run dev
```

Then open http://localhost:5173.

To build a static version for hosting (Vercel, Netlify, GitHub Pages):
```bash
npm run build
# Output in dashboard/dist
```

---

## Connecting the dashboard to live Airtable data

By default the dashboard loads `public/sample_data/mentions.json`. To use real data, the simplest path is:

**Option A — Airtable's built-in interface** (no code):
Create an **Airtable Interface** on top of your `Mentions` table. This gives you a hosted dashboard automatically.

**Option B — Wire this dashboard to Airtable:**
1. In Airtable → personal access token with `data.records:read` scope.
2. Replace the `fetch(SAMPLE_URL)` call in `dashboard/src/App.jsx` with:
   ```js
   fetch(`https://api.airtable.com/v0/${BASE_ID}/Mentions?pageSize=100`, {
     headers: { Authorization: `Bearer ${TOKEN}` }
   })
   .then(r => r.json())
   .then(j => setData(j.records.map(r => ({
     id: r.id,
     source: r.fields.Source,
     text:   r.fields.Text,
     brand:  r.fields.Brand,
     logo_in_image:    !!r.fields['Logo in Image'],
     visual_sentiment: r.fields['Visual Sentiment'],
     text_sentiment:   r.fields['Text Sentiment'],
     ironic:           !!r.fields.Ironic,
     mention_score:    r.fields['Mention Score'] || 0,
     classified_at:    r.fields['Classified At'],
   }))))
   ```
3. ⚠️ For production, proxy this call through your backend so your token isn't exposed in the browser.
