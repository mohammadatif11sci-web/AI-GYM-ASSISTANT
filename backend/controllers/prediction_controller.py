from database.db import db

from ai.progress_predictor import (
    predict_progress
)

def get_prediction():

    total_workouts = db.workouts.count_documents(
        {}
    )

    prediction = predict_progress(
        total_workouts
    )

    return prediction