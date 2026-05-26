"""ContextLayer multi-modal classifier.

Sends a social post (text + optional image URL) to Claude 3.5 Sonnet
and returns a structured classification: logo presence, visual sentiment,
ironic context, and a combined mention score.
"""
from __future__ import annotations

import base64
import json
import os
from typing import Optional

import httpx
from anthropic import Anthropic

MODEL = "claude-3-5-sonnet-20241022"

SYSTEM_PROMPT = """You are ContextLayer, a multi-modal social listening classifier.
Given a social post (text and optionally an image), analyze BOTH modalities and return
strictly valid JSON with this schema:

{
  "brand_detected": string | null,        // brand name if a logo or clear brand reference is present, else null
  "logo_in_image": boolean,                // true if a brand logo appears in the image
  "visual_sentiment": "positive" | "neutral" | "negative" | "not_applicable",
  "text_sentiment":   "positive" | "neutral" | "negative",
  "is_ironic": boolean,                    // true if the post is sarcastic / ironic about the brand
  "context_summary": string,               // 1-sentence human summary
  "mention_score": number                  // 0.0 - 1.0 confidence that this is a real brand mention
}

Return ONLY the JSON object, no prose, no markdown fences."""


def _fetch_image_b64(url: str) -> tuple[str, str]:
    r = httpx.get(url, timeout=20.0, follow_redirects=True)
    r.raise_for_status()
    media_type = r.headers.get("content-type", "image/jpeg").split(";")[0]
    return base64.standard_b64encode(r.content).decode("utf-8"), media_type


def classify(text: str, image_url: Optional[str] = None, target_brand: Optional[str] = None) -> dict:
    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    user_content: list[dict] = []
    if image_url:
        data, media_type = _fetch_image_b64(image_url)
        user_content.append({
            "type": "image",
            "source": {"type": "base64", "media_type": media_type, "data": data},
        })

    prompt = f"Post text:\n\"\"\"{text}\"\"\""
    if target_brand:
        prompt += f"\n\nTarget brand to evaluate: {target_brand}"
    user_content.append({"type": "text", "text": prompt})

    msg = client.messages.create(
        model=MODEL,
        max_tokens=600,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_content}],
    )

    raw = msg.content[0].text.strip()
    # Defensive: strip code fences if model adds them
    if raw.startswith("```"):
        raw = raw.strip("`")
        if raw.lower().startswith("json"):
            raw = raw[4:].strip()
    return json.loads(raw)
