from fastapi import APIRouter

from controllers.history_controller import get_workout_history

router = APIRouter()

@router.get("/workout-history")

def workout_history():

    return get_workout_history()