from database.db import db


def get_leaderboard():

    pipeline = [
        {
            "$group": {
                "_id": "$email",
                "calories": {
                    "$sum": "$calories"
                },
                "total_reps": {
                    "$sum": "$reps"
                },
                "total_workouts": {
                    "$sum": 1
                }
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "_id",
                "foreignField": "email",
                "as": "user"
            }
        },
        {
            "$unwind": {
                "path": "$user",
                "preserveNullAndEmptyArrays": True
            }
        },
        {
            "$project": {
                "_id": 0,
                "email": "$_id",
                "name": {
                    "$ifNull": [
                        "$user.name",
                        "$_id"
                    ]
                },
                "calories": 1,
                "total_reps": 1,
                "total_workouts": 1
            }
        },
        {
            "$sort": {
                "calories": -1,
                "total_workouts": -1,
                "total_reps": -1,
                "name": 1
            }
        }
    ]

    leaders = list(db.workouts.aggregate(pipeline))

    leaderboard = []

    for index, leader in enumerate(leaders, start=1):

        leaderboard.append({
            "rank": index,
            "name": leader.get("name", "Unknown User"),
            "email": leader.get("email"),
            "calories": leader.get("calories", 0),
            "total_reps": leader.get("total_reps", 0),
            "total_workouts": leader.get("total_workouts", 0)
        })

    return leaderboard
