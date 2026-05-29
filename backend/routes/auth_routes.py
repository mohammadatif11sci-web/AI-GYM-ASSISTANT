from fastapi import APIRouter
from models.user_model import UserSignup, UserLogin
from controllers.auth_controller import signup_user, login_user

router = APIRouter()

# Signup Route
@router.post("/signup")
def signup(user: UserSignup):
    return signup_user(user)

# Login Route
@router.post("/login")
def login(user: UserLogin):
    return login_user(user)