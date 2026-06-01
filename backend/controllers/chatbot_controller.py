def local_fitness_response(question):
    normalized_question = question.lower()

    if "leg" in normalized_question:
        return (
            "Here is a simple leg workout: 3 sets of 12 squats, "
            "3 sets of 10 lunges per leg, 3 sets of 15 glute bridges, "
            "and 3 sets of 20 calf raises. Rest 60 to 90 seconds between sets."
        )

    if "push" in normalized_question or "chest" in normalized_question:
        return (
            "Try this push workout: 3 sets of 10 pushups, "
            "3 sets of 12 incline pushups, 3 sets of 10 shoulder taps, "
            "and a 30-second plank finisher."
        )

    if "diet" in normalized_question or "meal" in normalized_question:
        return (
            "For a balanced fitness meal, include lean protein, complex carbs, "
            "healthy fats, and vegetables. Example: grilled chicken or paneer, "
            "rice or roti, salad, and curd."
        )

    if "weight loss" in normalized_question or "fat loss" in normalized_question:
        return (
            "For fat loss, combine a small calorie deficit with strength training, "
            "daily walking, enough protein, and 7 to 8 hours of sleep."
        )

    return (
        "I can help with workouts, diet, form tips, and fitness planning. "
        "Tell me your goal, fitness level, and available equipment."
    )


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
            "answer": local_fitness_response(question),
            "fallback": True,
            "error": str(error),
        }
