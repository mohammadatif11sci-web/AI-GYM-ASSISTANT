from database.db import db


def get_nearby_gyms():
    return list(
        db.gyms.find(
            {},
            {
                "_id": 0
            }
        )
    )
