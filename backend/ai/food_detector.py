import json

from utils.gemini_ai import (
    analyze_food_image
)


def detect_food(
    image_path
):

    prompt = """
You are a certified nutrition expert.

Analyze the uploaded food image.

Identify:

1. Food name
2. Estimated calories
3. Estimated protein
4. Short health advice

Return ONLY valid JSON.

Format:

{
    "food": "",
    "calories": "",
    "protein": "",
    "advice": ""
}
"""

    response = analyze_food_image(
        image_path,
        prompt
    )

    try:

        text = response["text"]

        start = text.find("{")
        end = text.rfind("}") + 1

        json_text = text[start:end]

        return json.loads(
            json_text
        )

    except Exception:

        return {
            "food": "Unknown",
            "calories": "N/A",
            "protein": "N/A",
            "advice": response.get(
                "text",
                "Unable to analyze image."
            )
        }