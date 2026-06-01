from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from ai.food_detector import detect_food

router = APIRouter()


@router.post("/food-analysis")

async def food_analysis(

    file: UploadFile = File(...)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid food image."
        )

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    result = detect_food(
        image_bytes,
        file.content_type
    )

    return result
