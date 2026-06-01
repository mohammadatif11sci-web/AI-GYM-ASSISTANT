from fastapi import APIRouter

from controllers.gym_controller import (
    get_nearby_gyms
)

router = APIRouter()


@router.get("/nearby-gyms")

def nearby_gyms():

    return get_nearby_gyms()