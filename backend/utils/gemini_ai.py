import os

from dotenv import load_dotenv

load_dotenv()

GOOGLE_AI_STUDIO_API_KEY = (
    os.getenv("GOOGLE_AI_STUDIO_API_KEY")
    or os.getenv("GEMINI_API_KEY")
    or os.getenv("GOOGLE_API_KEY")
)

MODEL_NAMES = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
]

def ask_ai(question):
    if not GOOGLE_AI_STUDIO_API_KEY:
        raise ValueError("Google AI API key is not configured")

    import google.generativeai as genai

    genai.configure(api_key=GOOGLE_AI_STUDIO_API_KEY)

    last_error = None

    for model_name in MODEL_NAMES:
        try:
            model = genai.GenerativeModel(model_name)

            response = model.generate_content(
                question
            )

            return response.text

        except Exception as error:
            last_error = error

    raise last_error
