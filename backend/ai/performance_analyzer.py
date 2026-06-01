def analyze_workout(data):

    workouts = data.get("total_workouts", 0)
    calories = data.get("total_calories", 0)

    score = 0

    # Workout Score
    score += workouts * 10

    # Calorie Score
    score += calories // 100

    # Cap Score
    if score > 100:
        score = 100

    # Determine Fitness Level
    if score >= 80:
        level = "Advanced"

    elif score >= 50:
        level = "Intermediate"

    else:
        level = "Beginner"

    # AI Feedback
    if score >= 80:
        feedback = "Excellent consistency and workout intensity."

    elif score >= 50:
        feedback = "Good progress. Increase workout consistency."

    else:
        feedback = "You need more consistent workouts."

    # Future Prediction
    prediction = f"You may improve by {score // 8}% next week."

    return {
        "score": score,
        "level": level,
        "feedback": feedback,
        "prediction": prediction
    }