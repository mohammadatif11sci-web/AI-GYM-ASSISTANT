def predict_progress(total_workouts):

    predicted_calories = (
        total_workouts * 120
    )

    consistency = min(
        100,
        total_workouts * 8
    )

    if total_workouts >= 10:

        trend = "Excellent Progress"

    elif total_workouts >= 5:

        trend = "Improving"

    else:

        trend = "Needs Consistency"

    return {

        "predicted_calories":
        predicted_calories,

        "consistency":
        consistency,

        "trend":
        trend,
    }