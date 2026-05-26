# ContextLayer · Quick Start Guide

You don't need to be a developer to get this running. Follow the steps below.

---

## What you'll set up (15 minutes)

1. An **Airtable** base (the database where mentions land)
2. The **Python backend** (the classifier — runs locally or on any host)
3. A **Make.com** scenario (pulls posts from social sources → calls the classifier)
4. The **dashboard** (a simple web UI to view the results)

---

## 1. Airtable (3 min)

1. Create a free account at https://airtable.com
2. Create a new base called **ContextLayer**
3. Add a table called **Mentions** with these fields (exact names matter):

| Field name | Type |
|---|---|
| Source | Single line text |
| Text | Long text |
| Image URL | URL |
| Brand | Single line text |
| Logo in Image | Checkbox |
| Visual Sentiment | Single select (positive, neutral, negative, not_applicable) |
| Text Sentiment | Single select (positive, neutral, negative) |
| Ironic | Checkbox |
| Context Summary | Long text |
| Mention Score | Number (decimal, 2 places) |
| Classified At | Date+time |

4. Go to **Account → Developer hub → Personal access tokens** and create one with `data.records:write` scope for your base. Copy the token.
5. Copy your base ID from `https://airtable.com/<BASE_ID>/...`.

See `docs/AIRTABLE_SCHEMA.md` for a checklist version.

---

## 2. Backend (5 min)

1. Get an Anthropic API key at https://console.anthropic.com → API Keys
2. In the `backend/` folder, copy `.env.example` to `.env` and fill in:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   AIRTABLE_TABLE_NAME=Mentions
   ```
3. Install + run:
   ```bash
   cd backend
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   python main.py
   ```
4. Confirm it works: open http://localhost:8000/health → should return `{"status":"ok"}`.

> **Easier hosting option:** deploy `backend/` to https://render.com or https://railway.app — both auto-deploy from GitHub and give you a public URL like `https://contextlayer.onrender.com`. Use that URL in Make.com.

---

## 3. Make.com scenario (4 min)

See `docs/MAKE_SCENARIO.md` for the full module-by-module recipe. Summary:

```
[Trigger: Twitter / Instagram / RSS / Webhook]
        ↓
[HTTP module: POST to /classify]
   URL: https://<your-backend>/classify
   Body (JSON):
   {
     "text": "{{trigger.text}}",
     "image_url": "{{trigger.image_url}}",
     "source": "twitter",
     "target_brand": "YourBrand"
   }
        ↓
(Airtable row is written automatically by the backend)
```

That's it — the backend handles classification *and* Airtable writes, so the Make scenario stays simple.

---

## 4. Dashboard (3 min)

The dashboard reads sample data out-of-the-box. To point it at your Airtable, see `docs/DASHBOARD_GUIDE.md`.

```bash
cd dashboard
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

---

## Pushing to GitHub

1. Create a new empty repo on GitHub (e.g. `contextlayer`).
2. From the unzipped folder:
   ```bash
   git init
   git add .
   git commit -m "Initial ContextLayer commit"
   git branch -M main
   git remote add origin https://github.com/<you>/contextlayer.git
   git push -u origin main
   ```
3. **Important:** never commit your `.env` file — it's already excluded in `.gitignore`.

---

## Need help?
- Anthropic docs: https://docs.anthropic.com
- Airtable API docs: https://airtable.com/developers/web/api
- Make.com academy: https://www.make.com/en/academy
