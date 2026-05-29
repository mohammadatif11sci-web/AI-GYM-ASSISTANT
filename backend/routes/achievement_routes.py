from fastapi import APIRouter

from controllers.achievement_controller import (
    get_achievements
)

router = APIRouter()

@router.get("/achievements")

def achievements():

    return get_achievements()