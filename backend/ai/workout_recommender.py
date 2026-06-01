def generate_workout_plan(score):
    if score >= 80:
        return {
            "level": "Advanced",
            "recommendation": "Maintain intensity and add progressive overload.",
            "plan": [
                "Pushups: 4 sets of 15 reps",
                "Squats: 4 sets of 20 reps",
                "Lunges: 3 sets of 12 reps per leg",
                "Plank: 3 rounds of 60 seconds",
            ],
        }

    if score >= 50:
        return {
            "level": "Intermediate",
            "recommendation": "Build consistency and slowly increase volume.",
            "plan": [
                "Pushups: 3 sets of 10 reps",
                "Squats: 3 sets of 15 reps",
                "Lunges: 2 sets of 10 reps per leg",
                "Plank: 3 rounds of 30 seconds",
            ],
        }

    return {
        "level": "Beginner",
        "recommendation": "Focus on form, control, and regular workouts.",
        "plan": [
            "Wall pushups: 3 sets of 10 reps",
            "Bodyweight squats: 3 sets of 10 reps",
            "Glute bridges: 2 sets of 12 reps",
            "Plank: 2 rounds of 20 seconds",
        ],
    }
