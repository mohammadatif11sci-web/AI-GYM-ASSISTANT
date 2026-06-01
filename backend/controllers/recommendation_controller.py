from database.db import db
from ai.performance_analyzer import analyze_workout
from ai.workout_recommender import (
    generate_workout_plan
)


def get_recommendations():
    workouts = list(
        db.workouts.find(
            {},
            {
                "_id": 0,
                "calories": 1
            }
        )
    )

    performance = analyze_workout(
        {
            "total_workouts": len(workouts),
            "total_calories": sum(
                workout.get("calories", 0)
                for workout in workouts
            )
        }
    )

    return generate_workout_plan(
        performance["score"]
    )
