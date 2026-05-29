def calculate_bmi(weight, height):

    height_in_meters = height / 100

    bmi = weight / (
        height_in_meters ** 2
    )

    return round(bmi, 2)

def get_category(bmi):

    if bmi < 18.5:

        return "Underweight"

    elif bmi < 25:

        return "Normal Weight"

    elif bmi < 30:

        return "Overweight"

    else:

        return "Obese"

def calorie_recommendation(weight):

    calories = weight * 35

    return round(calories)

def generate_advice(category):

    if category == "Underweight":

        return "Increase calorie and protein intake."

    elif category == "Normal Weight":

        return "Maintain balanced nutrition and workouts."

    elif category == "Overweight":

        return "Focus on cardio and calorie deficit."

    else:

        return "Consult fitness and nutrition experts."