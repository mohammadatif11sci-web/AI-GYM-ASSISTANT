from database.db import db

from ai.achievement_engine import (
    generate_achievements
)

def get_achievements():

    total_workouts = db.workouts.count_documents(
        {}
    )

    achievements = generate_achievements(
        total_workouts
    )

    return {

        "total_workouts":
        total_workouts,

        "achievements":
        achievements,
    }