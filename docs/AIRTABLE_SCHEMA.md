# Airtable Schema Checklist

Base name: **ContextLayer**
Table name: **Mentions**

| # | Field | Type | Notes |
|--|--|--|--|
| 1 | Source | Single line text | e.g. twitter, instagram |
| 2 | Text | Long text | The original post text |
| 3 | Image URL | URL | Optional |
| 4 | Brand | Single line text | Detected brand |
| 5 | Logo in Image | Checkbox | True if logo visible |
| 6 | Visual Sentiment | Single select | `positive`, `neutral`, `negative`, `not_applicable` |
| 7 | Text Sentiment | Single select | `positive`, `neutral`, `negative` |
| 8 | Ironic | Checkbox | |
| 9 | Context Summary | Long text | 1-line model summary |
| 10 | Mention Score | Number (decimal) | 0.00 – 1.00 |
| 11 | Classified At | Date with time | ISO timestamp |

Tip: add a **View** filtered to `Mention Score >= 0.7` for your "high-confidence mentions" dashboard.
