# Make.com Scenario Recipe

A minimal automation: when a new social post arrives, POST it to ContextLayer, which classifies and writes to Airtable.

## Modules

### 1. Trigger
Pick one:
- **Twitter / X — Watch Tweets** (search a hashtag or handle)
- **Instagram for Business — Watch media**
- **RSS — Watch RSS feed items**
- **Webhooks — Custom webhook** (for everything else)

### 2. HTTP — Make a request
- **URL:** `https://<your-backend-host>/classify`
- **Method:** POST
- **Headers:** `Content-Type: application/json`
- **Body type:** Raw / JSON
- **Body:**
  ```json
  {
    "text": "{{1.text}}",
    "image_url": "{{1.image_url}}",
    "source": "twitter",
    "target_brand": "YourBrand"
  }
  ```
  Map `text` and `image_url` to whatever fields your trigger module exposes.

### 3. (Optional) Slack / Email notifier
Add a Slack module to ping a channel when `{{2.classification.mention_score}}` > 0.8 and `{{2.classification.text_sentiment}} = negative` — that's your crisis-detection signal.

> The backend writes to Airtable automatically, so no Airtable module is required in Make.

## Scheduling
Set the scenario to run every 15 minutes — that's a good balance of freshness and Make.com operation usage.
