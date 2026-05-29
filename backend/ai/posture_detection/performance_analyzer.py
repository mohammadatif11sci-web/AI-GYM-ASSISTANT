def analyze_workout(reps, calories):

    score = (reps * 2) + (calories / 10)

    if score >= 90:

        level = "Advanced"

        feedback = "Excellent workout performance!"

    elif score >= 60:

        level = "Intermediate"

        feedback = "Good job! Keep improving consistency."

    else:

        level = "Beginner"

        feedback = "Focus on improving workout intensity."

    return {

        "score": round(score, 2),

        "level": level,

        "feedback": feedback,
    }