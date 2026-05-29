def generate_achievements(total_workouts):

    achievements = []

    if total_workouts >= 1:

        achievements.append(
            "🏅 First Workout Completed"
        )

    if total_workouts >= 5:

        achievements.append(
            "🔥 Consistency Starter"
        )

    if total_workouts >= 10:

        achievements.append(
            "💪 Fitness Warrior"
        )

    if total_workouts >= 20:

        achievements.append(
            "🚀 Advanced Athlete"
        )

    if total_workouts >= 50:

        achievements.append(
            "👑 Gym Legend"
        )

    return achievements