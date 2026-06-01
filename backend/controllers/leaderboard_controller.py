from database.db import db


def get_leaderboard():
    leaderboard = list(
        db.workouts.aggregate(
            [
                {
                    "$group": {
                        "_id": "$email",
                        "calories": {
                            "$sum": "$calories"
                        },
                        "workouts": {
                            "$sum": 1
                        }
                    }
                },
                {
                    "$sort": {
                        "calories": -1
                    }
                },
                {
                    "$limit": 50
                }
            ]
        )
    )

    users = {
        user.get("email"): user.get("name")
        for user in db.users.find(
            {},
            {
                "_id": 0,
                "email": 1,
                "name": 1
            }
        )
    }

    return [
        {
            "rank": index + 1,
            "name": users.get(item["_id"], item["_id"]),
            "email": item["_id"],
            "calories": item.get("calories", 0),
            "workouts": item.get("workouts", 0)
        }
        for index, item in enumerate(leaderboard)
    ]
