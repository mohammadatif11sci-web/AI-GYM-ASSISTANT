import json
import os

from dotenv import load_dotenv

load_dotenv()

GOOGLE_AI_STUDIO_API_KEY = (
    os.getenv("GOOGLE_AI_STUDIO_API_KEY")
    or os.getenv("GEMINI_API_KEY")
    or os.getenv("GOOGLE_API_KEY")
)


def detect_food(image_bytes, mime_type):
    if not GOOGLE_AI_STUDIO_API_KEY:
        return {
            "food": "Unavailable",
            "calories": "N/A",
            "protein": "N/A",
            "advice": "Cloud food analysis is not configured."
        }

    import google.generativeai as genai

    genai.configure(api_key=GOOGLE_AI_STUDIO_API_KEY)

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    response = model.generate_content(
        [
            (
                "Analyze this food image. Return only JSON with these keys: "
                "food, calories, protein, advice. Use concise values."
            ),
            {
                "mime_type": mime_type,
                "data": image_bytes
            }
        ]
    )

    text = response.text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        data = {
            "food": "Unknown",
            "calories": "N/A",
            "protein": "N/A",
            "advice": text
        }

    return {
        "food": data.get("food", "Unknown"),
        "calories": data.get("calories", "N/A"),
        "protein": data.get("protein", "N/A"),
        "advice": data.get("advice", "")
    }
