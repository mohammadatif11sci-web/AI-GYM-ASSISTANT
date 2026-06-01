from database.db import db
from datetime import datetime, timedelta

def get_dashboard_stats():

    total_workouts = db.workouts.count_documents({})

    workouts = list(
        db.workouts.find(
            {},
            {
                "_id": 0,
                "calories": 1,
                "created_at": 1
            }
        )
    )

    total_calories = sum(
        workout.get("calories", 0)
        for workout in workouts
    )

    workout_days = {
        workout["created_at"].date()
        for workout in workouts
        if workout.get("created_at")
    }

    current_streak = 0
    current_day = datetime.utcnow().date()

    while current_day in workout_days:
        current_streak += 1
        current_day -= timedelta(days=1)

    return {

        "total_workouts": total_workouts,

        "total_calories": total_calories,

        "current_streak": current_streak,
    }
