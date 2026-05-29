from database.db import db

def get_dashboard_stats():

    total_workouts = db.workouts.count_documents({})

    workouts = list(db.workouts.find())

    total_calories = 0

    for workout in workouts:

        total_calories += workout["calories"]

    return {

        "total_workouts": total_workouts,

        "total_calories": total_calories,
    }