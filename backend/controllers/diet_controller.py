from ai.diet_recommender import *

def generate_diet_plan(data):

    bmi = calculate_bmi(

        data.weight,

        data.height
    )

    category = get_category(bmi)

    calories = calorie_recommendation(
        data.weight
    )

    advice = generate_advice(
        category
    )

    return {

        "bmi": bmi,

        "category": category,

        "daily_calories": calories,

        "advice": advice,
    }