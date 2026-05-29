from fastapi import APIRouter

from controllers.prediction_controller import (
    get_prediction
)

router = APIRouter()

@router.get("/prediction")

def prediction():

    return get_prediction()