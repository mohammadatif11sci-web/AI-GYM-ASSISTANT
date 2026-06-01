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

    image_bytes = await file.read()

    result = detect_food(
        image_bytes,
        file.content_type
    )

    return result
