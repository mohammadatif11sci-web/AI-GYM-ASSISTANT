from database.db import db
from ai.posture_detection.performance_analyzer import analyze_workout

def save_workout(workout):

    analysis = analyze_workout(

        workout.reps,

        workout.calories
    )

    workout_data = {

        "email": workout.email,

        "workout_type": workout.workout_type,

        "reps": workout.reps,

        "calories": workout.calories,

        "score": analysis["score"],

        "level": analysis["level"],

        "feedback": analysis["feedback"],
    }

    db.workouts.insert_one(workout_data)

    return {

        "message": "Workout Saved Successfully",

        "analysis": analysis
    }
