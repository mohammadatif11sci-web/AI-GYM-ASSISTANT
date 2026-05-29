def chatbot_response(question):
    try:
        from utils.gemini_ai import ask_ai

        answer = ask_ai(question)

        return {
            "question": question,
            "answer": answer,
        }

    except Exception as error:
        return {
            "question": question,
            "answer": "AI chatbot is currently unavailable.",
            "error": str(error),
        }
