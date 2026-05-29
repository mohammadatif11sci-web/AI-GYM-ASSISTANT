from database.db import db
from models.user_model import UserSignup, UserLogin
import bcrypt
from utils.jwt_handler import create_access_token

users_collection = db["users"]

# Signup Function
def signup_user(user: UserSignup):

    print("Signup API Hit")

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        return {
            "status": "error",
            "message": "User already exists"
        }

    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'),
        bcrypt.gensalt()
    )

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(user_data)

    print("User Inserted")

    return {
        "status": "success",
        "message": "User registered successfully"
    }

# Login Function
def login_user(user: UserLogin):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        return {
            "status": "error",
            "message": "User not found"
        }

    password_match = bcrypt.checkpw(
        user.password.encode('utf-8'),
        existing_user["password"]
    )

    if not password_match:
        return {
            "status": "error",
            "message": "Invalid password"
        }

    # Create JWT Token
    token = create_access_token({

        "email": user.email
    })

    return {

        "status": "success",

        "message": "Login Successful",

        "token": token,
    }