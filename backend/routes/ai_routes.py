from fastapi import APIRouter
import subprocess
import sys

router = APIRouter()

# Start Pushup Counter
@router.get("/start-pushup")

def start_pushup():

    subprocess.Popen([
        sys.executable,
        "ai/posture_detection/pushup_counter.py"
    ])

    return {
        "status": "success",
        "message": "Pushup Counter Started"
    }

# Start Squat Counter
@router.get("/start-squat")

def start_squat():

    subprocess.Popen([
        sys.executable,
        "ai/posture_detection/squat_counter.py"
    ])

    return {
        "status": "success",
        "message": "Squat Counter Started"
    }