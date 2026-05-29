from pydantic import BaseModel

class Workout(BaseModel):

    email: str
    workout_type: str
    reps: int
    calories: int