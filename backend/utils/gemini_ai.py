import google.generativeai as genai

genai.configure(
    api_key="AIzaSyC2kKGQBdzayPmK7IMR6nWzDd26iX5lbpI"
)

MODEL_NAMES = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
]

def ask_ai(question):
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
