from fastapi import APIRouter

from controllers.leaderboard_controller import (
    get_leaderboard
)

router = APIRouter()


@router.get("/leaderboard")

def leaderboard():

    return get_leaderboard()