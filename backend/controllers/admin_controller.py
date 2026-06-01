from datetime import datetime, timedelta

from database.db import db


def get_admin_stats():
    since = datetime.utcnow() - timedelta(days=7)

    workouts = list(
        db.workouts.find(
            {},
            {
                "_id": 0,
                "calories": 1
            }
        )
    )

    active_users = db.workouts.distinct(
        "email",
        {
            "created_at": {
                "$gte": since
            }
        }
    )

    return {
        "total_users": db.users.count_documents({}),
        "total_workouts": len(workouts),
        "total_calories": sum(
            workout.get("calories", 0)
            for workout in workouts
        ),
        "active_users": len(active_users)
    }
