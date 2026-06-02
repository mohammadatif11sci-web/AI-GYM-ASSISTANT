def detect_food(image_name):

    image_name = image_name.lower()

    if "pizza" in image_name:

        return {

            "food": "Pepperoni Pizza",

            "calories": "650 kcal",

            "protein": "24g",

            "advice":
            "High calorie meal. Balance with cardio."
        }

    elif "burger" in image_name:

        return {

            "food": "Chicken Burger",

            "calories": "540 kcal",

            "protein": "30g",

            "advice":
            "Moderate protein meal. Avoid excess sauces."
        }

    else:

        return {

            "food": "Unknown Food",

            "calories": "N/A",

            "protein": "N/A",

            "advice":
            "Unable to analyze image."
        }
