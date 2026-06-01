from sklearn.linear_model import LinearRegression
import numpy as np


# Sample Training Data

X = np.array([

    [2, 200],
    [4, 400],
    [6, 700],
    [8, 1000],
    [10, 1300]

])

# Fitness Scores

y = np.array([

    20,
    40,
    60,
    80,
    100
])

# Train Model

model = LinearRegression()

model.fit(X, y)


def predict_fitness_score(

    workouts,

    calories
):

    prediction = model.predict([

        [workouts, calories]

    ])

    score = round(

        prediction[0],

        2
    )

    if score >= 80:

        level = "Advanced"

    elif score >= 50:

        level = "Intermediate"

    else:

        level = "Beginner"

    return {

        "predicted_score": score,

        "fitness_level": level,

        "prediction":
        "Performance improving steadily"
    }