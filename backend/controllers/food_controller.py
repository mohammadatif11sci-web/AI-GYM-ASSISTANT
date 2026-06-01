from ai.food_detector import detect_food


def analyze_food():

    # Temporary sample image name

    image_name = "pizza.jpg"

    result = detect_food(image_name)

    return result