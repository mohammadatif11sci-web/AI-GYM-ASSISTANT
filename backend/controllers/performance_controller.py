from database.db import db
from ai.performance_analyzer import analyze_workout


def get_performance_report():
    workouts = list(
        db.workouts.find(
            {},
            {
                "_id": 0,
                "calories": 1
            }
        )
    )

    workout_data = {
        "total_workouts": len(workouts),
        "total_calories": sum(
            workout.get("calories", 0)
            for workout in workouts
        )
    }

    return analyze_workout(workout_data)
