import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { speak } from "../utils/voiceHelper";

function Workout() {
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [timer, setTimer] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);

  useEffect(() => {
    let interval;

    if (activeWorkout) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeWorkout]);

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
    workoutType,
    reps,
    calories,
    startVoiceMessage,
    errorMessage,
  }) => {
    try {
      const startResponse = await API.get(startEndpoint);
      alert(startResponse.data.message);
      speak(startVoiceMessage);
      setActiveWorkout(true);
      setReps(reps);
      setCalories(calories);
      setTimer(0);

      const saveResponse = await API.post("/save-workout", {
        email: "atif@gmail.com",
        workout_type: workoutType,
        reps,
        calories,
      });

      showAnalysis(saveResponse.data.analysis);
      speak(
        `Workout completed. Your level is ${saveResponse.data.analysis.level}`
      );
      setActiveWorkout(false);
      console.log("Workout Saved");
    } catch (error) {
      setActiveWorkout(false);
      console.error(error);
      alert(errorMessage);
    }
  };

  const openPushup = () => {
    startWorkout({
      startEndpoint: "/start-pushup",
      workoutType: "Pushups",
      reps: 20,
      calories: 120,
      startVoiceMessage: "Pushup trainer started",
      errorMessage: "Failed to start pushup AI",
    });
  };

  const openSquat = () => {
    startWorkout({
      startEndpoint: "/start-squat",
      workoutType: "Squats",
      reps: 15,
      calories: 100,
      startVoiceMessage: "Squat trainer started",
      errorMessage: "Failed to start squat AI",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pushup Card */}
          <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Pushup Counter</h2>

            <button
              onClick={openPushup}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-bold"
            >
              Start Pushups
            </button>
          </div>

          {/* Squat Card */}
          <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Squat Counter</h2>

            <button
              onClick={openSquat}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-bold"
            >
              Start Squats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workout;
