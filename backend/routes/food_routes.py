import os

from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from ai.food_detector import (
    detect_food
)

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post(
    "/food-analysis"
)
async def food_analysis(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    result = detect_food(
        file_path
    )

    return result