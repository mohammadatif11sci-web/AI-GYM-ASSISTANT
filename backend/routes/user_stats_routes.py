from fastapi import APIRouter

from controllers.user_stats_controller import (
    get_user_stats
)

router = APIRouter()


@router.get("/user-stats/{email}")

def user_stats(email):

    return get_user_stats(email)