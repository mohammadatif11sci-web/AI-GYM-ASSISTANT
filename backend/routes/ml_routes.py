from fastapi import APIRouter

from controllers.ml_controller import (
    get_ml_prediction
)

router = APIRouter()


@router.get("/ml-prediction")

def ml_prediction():

    return get_ml_prediction()