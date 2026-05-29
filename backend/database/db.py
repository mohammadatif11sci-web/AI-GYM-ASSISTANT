from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

db = client["ai_gym_database"]

print("MongoDB Connected Successfully")