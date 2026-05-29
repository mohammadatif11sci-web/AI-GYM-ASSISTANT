from pydantic import BaseModel

class DietRequest(BaseModel):

    age: int
    weight: float
    height: float