"""ContextLayer FastAPI service.

Receives social posts (from Make.com or any HTTP client), runs the
multi-modal classifier, and writes structured results to Airtable.
"""
import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from classifier import classify
from airtable_client import write_mention

load_dotenv()

app = FastAPI(title="ContextLayer", version="1.0.0")


class ClassifyRequest(BaseModel):
    text: str = Field(..., description="Post text content")
    image_url: Optional[str] = Field(None, description="Public image URL (optional)")
    source: str = Field("unknown", description="e.g. twitter, instagram, tiktok")
    target_brand: Optional[str] = Field(None, description="Optional brand to focus on")
    write_to_airtable: bool = True


@app.get("/health")
def health():
    return {"status": "ok", "service": "contextlayer"}


@app.post("/classify")
def classify_endpoint(req: ClassifyRequest):
    try:
        result = classify(req.text, req.image_url, req.target_brand)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"classifier error: {e}")

    record = None
    if req.write_to_airtable:
        try:
            record = write_mention(req.source, req.text, req.image_url, result)
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"airtable error: {e}")

    return {"classification": result, "airtable_record": record}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
