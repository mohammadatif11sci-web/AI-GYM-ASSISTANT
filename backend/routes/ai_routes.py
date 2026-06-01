from fastapi import APIRouter
import subprocess
import sys
import threading
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[1]
COUNTER_PROCESSES = {
    "pushup": None,
    "squat": None,
}
COUNTER_REPS = {
    "pushup": 0,
    "squat": 0,
}


def read_counter_output(counter_name, process):
    for line in process.stdout:
        line = line.strip()

        if line.isdigit():
            COUNTER_REPS[counter_name] = int(line)


def start_counter(counter_name, script_name):
    process = COUNTER_PROCESSES[counter_name]

    if process and process.poll() is None:
        return False

    COUNTER_REPS[counter_name] = 0
    COUNTER_PROCESSES[counter_name] = subprocess.Popen([
        sys.executable,
        "-u",
        str(BASE_DIR / "ai" / "posture_detection" / script_name)
    ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

    threading.Thread(
        target=read_counter_output,
        args=(counter_name, COUNTER_PROCESSES[counter_name]),
        daemon=True
    ).start()

    return True


def stop_counter(counter_name):
    process = COUNTER_PROCESSES[counter_name]

    if not process or process.poll() is not None:
        COUNTER_PROCESSES[counter_name] = None
        return False

    process.terminate()

    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)

    COUNTER_PROCESSES[counter_name] = None
    return True


def get_counter_status(counter_name):
    process = COUNTER_PROCESSES[counter_name]

    return {
        "reps": COUNTER_REPS[counter_name],
        "running": bool(process and process.poll() is None)
    }


# Start Pushup Counter
@router.get("/start-pushup")

def start_pushup():

    started = start_counter(
        "pushup",
        "pushup_counter.py"
    )

    return {
        "status": "success",
        "message": (
            "Pushup Counter Started"
            if started
            else "Pushup Counter Already Running"
        )
    }


@router.get("/stop-pushup")
def stop_pushup():

    stopped = stop_counter("pushup")

    return {
        "status": "success",
        "reps": COUNTER_REPS["pushup"],
        "message": (
            "Pushup Counter Stopped"
            if stopped
            else "Pushup Counter Is Not Running"
        )
    }


# Start Squat Counter
@router.get("/start-squat")

def start_squat():

    started = start_counter(
        "squat",
        "squat_counter.py"
    )

    return {
        "status": "success",
        "message": (
            "Squat Counter Started"
            if started
            else "Squat Counter Already Running"
        )
    }


@router.get("/stop-squat")
def stop_squat():

    stopped = stop_counter("squat")

    return {
        "status": "success",
        "reps": COUNTER_REPS["squat"],
        "message": (
            "Squat Counter Stopped"
            if stopped
            else "Squat Counter Is Not Running"
        )
    }


@router.get("/counter-status")
def counter_status():

    return {
        "pushup": get_counter_status("pushup"),
        "squat": get_counter_status("squat")
    }
