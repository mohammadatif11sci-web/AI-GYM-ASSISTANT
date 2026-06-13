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

    # Grocery list based on BMI category
    if "Under" in category:
        grocery_list = [
            "Milk",
            "Bananas",
            "Peanut Butter",
            "Oats",
            "Eggs",
            "Rice",
            "Chicken Breast",
            "Dry Fruits"
        ]

    elif "Normal" in category:
        grocery_list = [
            "Oats",
            "Brown Rice",
            "Eggs",
            "Chicken Breast",
            "Fish",
            "Greek Yogurt",
            "Spinach",
            "Apples",
            "Bananas",
            "Almonds"
        ]

    else:
        grocery_list = [
            "Oats",
            "Broccoli",
            "Spinach",
            "Cucumber",
            "Tomatoes",
            "Lentils",
            "Chicken Breast",
            "Fish",
            "Green Tea",
            "Apples"
        ]

    return {
        "bmi": bmi,
        "category": category,
        "daily_calories": calories,
        "advice": advice,
        "grocery_list": grocery_list
    }