from ai.ml_fitness_model import (
    predict_fitness_score
)


def get_ml_prediction():

    # Sample user data

    workouts = 7

    calories = 850

    result = predict_fitness_score(

        workouts,

        calories
    )

    return result