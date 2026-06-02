import React, { useCallback, useEffect, useRef, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { speak } from "../utils/voiceHelper";

function Workout() {
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [timer, setTimer] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [activeCounter, setActiveCounter] = useState(null);
  const [caloriesPerRep, setCaloriesPerRep] = useState(0);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let interval;

    if (activeWorkout) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeWorkout]);

  useEffect(() => {
    let interval;

    if (activeCounter) {
      interval = setInterval(async () => {
        try {
          const response = await API.get("/counter-status");
          const currentReps = response.data[activeCounter].reps;

          setReps(currentReps);
          setCalories(Math.round(currentReps * caloriesPerRep));
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCounter, caloriesPerRep]);

  const stopCamera = useCallback(() => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setCameraError("");

      if (streamRef.current) {
        return true;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      return true;
    } catch (error) {
      console.error(error);
      setCameraError(
        "Camera access failed. Please allow webcam permission and use HTTPS or localhost."
      );
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const showAnalysis = (analysis) => {
    alert(
      `AI Analysis\n\n` +
        `Score: ${analysis.score}\n` +
        `Level: ${analysis.level}\n\n` +
        analysis.feedback
    );
  };

  const startWorkout = async ({
    startEndpoint,
    caloriesPerRep,
    startVoiceMessage,
    errorMessage,
    counterType,
  }) => {
    try {
      const cameraStarted = await startCamera();

      if (!cameraStarted) {
        return;
      }

      const startResponse = await API.get(startEndpoint);
      alert(startResponse.data.message);
      speak(startVoiceMessage);
      setActiveWorkout(true);
      setActiveCounter(counterType);
      setCaloriesPerRep(caloriesPerRep);
      setReps(0);
      setCalories(0);
      setTimer(0);
    } catch (error) {
      setActiveWorkout(false);
      setActiveCounter(null);
      stopCamera();
      console.error(error);
      alert(errorMessage);
    }
  };

  const stopWorkout = async ({
    stopEndpoint,
    workoutType,
    caloriesPerRep,
    stopVoiceMessage,
    errorMessage,
  }) => {
    try {
      const stopResponse = await API.get(stopEndpoint);
      const finalReps = stopResponse.data.reps || 0;
      const finalCalories = Math.round(finalReps * caloriesPerRep);

      setReps(finalReps);
      setCalories(finalCalories);
      alert(stopResponse.data.message);
      speak(stopVoiceMessage);
      setActiveWorkout(false);
      setActiveCounter(null);
      stopCamera();

      const saveResponse = await API.post("/save-workout", {
        email: "atif@gmail.com",
        workout_type: workoutType,
        reps: finalReps,
        calories: finalCalories,
      });

      showAnalysis(saveResponse.data.analysis);
      speak(
        `Workout completed. Your level is ${saveResponse.data.analysis.level}`
      );
      console.log("Workout Saved");
    } catch (error) {
      console.error(error);
      alert(errorMessage);
    }
  };

  const openPushup = () => {
    startWorkout({
      startEndpoint: "/start-pushup",
      caloriesPerRep: 6,
      startVoiceMessage: "Pushup trainer started",
      errorMessage: "Failed to start pushup AI",
      counterType: "pushup",
    });
  };

  const stopPushup = () => {
    stopWorkout({
      stopEndpoint: "/stop-pushup",
      workoutType: "Pushups",
      caloriesPerRep: 6,
      stopVoiceMessage: "Pushup trainer stopped",
      errorMessage: "Failed to stop pushup AI",
    });
  };

  const openSquat = () => {
    startWorkout({
      startEndpoint: "/start-squat",
      caloriesPerRep: 7,
      startVoiceMessage: "Squat trainer started",
      errorMessage: "Failed to start squat AI",
      counterType: "squat",
    });
  };

  const stopSquat = () => {
    stopWorkout({
      stopEndpoint: "/stop-squat",
      workoutType: "Squats",
      caloriesPerRep: 7,
      stopVoiceMessage: "Squat trainer stopped",
      errorMessage: "Failed to stop squat AI",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl font-bold text-center mb-10">
          AI Workout Trainer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Reps */}
          <div className="bg-slate-800 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Reps</h2>

            <p className="text-5xl text-blue-400 font-bold">{reps}</p>
          </div>

          {/* Calories */}
          <div className="bg-slate-800 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Calories</h2>

            <p className="text-5xl text-red-400 font-bold">{calories}</p>
          </div>

          {/* Timer */}
          <div className="bg-slate-800 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Timer</h2>

            <p className="text-5xl text-green-400 font-bold">{timer}s</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Live Webcam
          </h2>

          {cameraError && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 p-4 rounded-xl mb-6">
              {cameraError}
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-[520px] rounded-2xl bg-slate-950 object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pushup Card */}
          <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Pushup Counter</h2>

            <button
              onClick={openPushup}
              disabled={activeCounter !== null}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-lg font-bold"
            >
              Start Pushups
            </button>

            <button
              onClick={stopPushup}
              disabled={activeCounter !== "pushup"}
              className="block mx-auto mt-4 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-lg font-bold"
            >
              Stop Pushups
            </button>
          </div>

          {/* Squat Card */}
          <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Squat Counter</h2>

            <button
              onClick={openSquat}
              disabled={activeCounter !== null}
              className="bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-lg font-bold"
            >
              Start Squats
            </button>

            <button
              onClick={stopSquat}
              disabled={activeCounter !== "squat"}
              className="block mx-auto mt-4 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-lg font-bold"
            >
              Stop Squats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workout;
