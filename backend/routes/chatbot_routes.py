from fastapi import APIRouter

from controllers.chatbot_controller import chatbot_response

router = APIRouter()

@router.get("/chatbot")

def chatbot(question: str):

    return chatbot_response(question)