from fastapi import APIRouter

from models.diet_model import DietRequest

from controllers.diet_controller import generate_diet_plan

router = APIRouter()

@router.post("/diet-plan")

def diet_plan(data: DietRequest):

    return generate_diet_plan(data)