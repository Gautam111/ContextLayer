"""Thin Airtable writer for ContextLayer classification results."""
import os
from datetime import datetime, timezone
from pyairtable import Api


def get_table():
    api = Api(os.environ["AIRTABLE_API_KEY"])
    return api.table(os.environ["AIRTABLE_BASE_ID"],
                     os.environ.get("AIRTABLE_TABLE_NAME", "Mentions"))


def write_mention(source: str, text: str, image_url: str | None, result: dict) -> dict:
    table = get_table()
    record = {
        "Source": source,
        "Text": text,
        "Image URL": image_url or "",
        "Brand": result.get("brand_detected") or "",
        "Logo in Image": bool(result.get("logo_in_image")),
        "Visual Sentiment": result.get("visual_sentiment", "not_applicable"),
        "Text Sentiment": result.get("text_sentiment", "neutral"),
        "Ironic": bool(result.get("is_ironic")),
        "Context Summary": result.get("context_summary", ""),
        "Mention Score": float(result.get("mention_score", 0.0)),
        "Classified At": datetime.now(timezone.utc).isoformat(),
    }
    return table.create(record)
