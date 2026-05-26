# ContextLayer
## Multi-Modal Social Listening Classifier (Images + Text)

ContextLayer goes beyond keyword-based social listening. It feeds social images, meme screenshots, and post text into a vision-language model (Claude 3.5 Sonnet) to detect:

<img width="1213" height="897" alt="Demo1" src="https://github.com/user-attachments/assets/a604654b-41dd-45b6-bb85-087f01c9036c" />

- **Brand logo appearances** in images and memes
- **Visual sentiment** (positive / neutral / negative / ironic)
- **Ironic / sarcastic context** that text-only tools miss
- **Combined multi-modal mention score**

In validation tests on FMCG brand datasets, ContextLayer captured **30%+ additional brand mentions** compared to text-only social listening.

---

## Stack

| Layer | Tech |
|---|---|
| Vision + Language Model | Claude 3.5 Sonnet (Anthropic API) |
| Backend / Classifier | Python 3.10+ (FastAPI) |
| Automation | Make.com scenario (webhook → classifier → Airtable) |
| Output / Data Layer | Airtable base |
| Dashboard | React + Vite + Tailwind (static, reads from Airtable) |

---

## Repo structure

```
contextlayer/
├── backend/              # Python FastAPI classifier service
│   ├── main.py
│   ├── classifier.py
│   ├── airtable_client.py
│   ├── requirements.txt
│   └── .env.example
├── dashboard/            # React dashboard UI
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── StatsCards.jsx
│           ├── MentionsTable.jsx
│           ├── SentimentChart.jsx
│           └── FilterBar.jsx
├── docs/
│   ├── QUICK_START.md
│   ├── DASHBOARD_GUIDE.md
│   ├── MAKE_SCENARIO.md
│   └── AIRTABLE_SCHEMA.md
├── sample_data/
│   └── mentions.json
├── .github/workflows/ci.yml
├── .gitignore
└── README.md
```

## 🚀 Quick Start

Get the dashboard running locally in under a minute.

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version, v18 or higher)
- npm (comes bundled with Node.js)

### Run Locally

```bash
cd dashboard
npm install
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser. 🎉

---

## License
MIT
