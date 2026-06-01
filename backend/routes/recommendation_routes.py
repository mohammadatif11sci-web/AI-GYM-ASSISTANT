from fastapi import APIRouter

from controllers.recommendation_controller import (
    get_recommendations
)

router = APIRouter()

@router.get("/recommendations")
def recommendations():

    return get_recommendations()