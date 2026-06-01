from ai.workout_recommender import (
    generate_workout_plan
)

def get_recommendations():

    # Temporary sample score
    score = 72

    result = generate_workout_plan(score)

    return result