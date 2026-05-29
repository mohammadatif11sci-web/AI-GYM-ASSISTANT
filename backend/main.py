from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import db
from routes.auth_routes import router as auth_router
from routes.ai_routes import router as ai_router
from routes.workout_routes import router as workout_router
from routes.analytics_routes import router as analytics_router
from routes.history_routes import router as history_router
from routes.diet_routes import router as diet_router
from routes.chatbot_routes import router as chatbot_router
from routes.prediction_routes import router as prediction_router
from routes.achievement_routes import (
    router as achievement_router
)

app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth Routes
app.include_router(
    achievement_router)
app.include_router(prediction_router)
app.include_router(chatbot_router)
app.include_router(diet_router)
app.include_router(history_router)
app.include_router(analytics_router)
app.include_router(workout_router)
app.include_router(ai_router)
app.include_router(auth_router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Gym Backend Running Successfully"
    }