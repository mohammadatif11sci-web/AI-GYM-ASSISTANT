from database.db import db

def get_workout_history():

    workouts = list(
        db.workouts.find(
            {},
            {
                "_id": 0
            }
        )
    )

    return workouts