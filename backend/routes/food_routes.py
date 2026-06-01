from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from ai.food_detector import detect_food

router = APIRouter()


@router.post("/food-analysis")

async def food_analysis(

    file: UploadFile = File(...)
):

    filename = file.filename

    result = detect_food(filename)

    return result