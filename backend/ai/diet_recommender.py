def calculate_bmi(weight, height):
    height_in_meters = height / 100

    bmi = weight / (height_in_meters ** 2)

    return round(bmi, 2)


def get_category(bmi):
    if bmi < 18.5:
        return "Underweight"

    if bmi < 25:
        return "Normal Weight"

    if bmi < 30:
        return "Overweight"

    return "Obese"


def calorie_recommendation(weight):
    calories = weight * 35

    return round(calories)


def generate_advice(category):
    if category == "Underweight":
        return "Increase calorie and protein intake."

    if category == "Normal Weight":
        return "Maintain balanced nutrition and workouts."

    if category == "Overweight":
        return "Focus on cardio and calorie deficit."

    return "Consult fitness and nutrition experts."
