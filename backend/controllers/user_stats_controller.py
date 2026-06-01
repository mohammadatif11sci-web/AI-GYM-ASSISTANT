from database.db import db


def get_user_stats(email):

    workouts = list(

        db.workouts.find(
            {
                "email": email
            }
        )
    )

    total_workouts = len(workouts)

    total_calories = sum(

        workout.get(
            "calories",
            0
        )

        for workout in workouts
    )

    total_reps = sum(

        workout.get(
            "reps",
            0
        )

        for workout in workouts
    )

    return {

        "email": email,

        "total_workouts":
        total_workouts,

        "total_calories":
        total_calories,

        "total_reps":
        total_reps,
    }