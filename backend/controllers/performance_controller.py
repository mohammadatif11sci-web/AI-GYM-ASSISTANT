from ai.performance_analyzer import analyze_workout


def get_performance_report():

    sample_data = {
        "total_workouts": 7,
        "total_calories": 3200
    }

    result = analyze_workout(sample_data)

    return result