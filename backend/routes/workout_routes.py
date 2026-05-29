from fastapi import APIRouter

from models.workout_model import Workout

from controllers.workout_controller import save_workout

router = APIRouter()

@router.post("/save-workout")

def save_workout_route(workout: Workout):

    return save_workout(workout)