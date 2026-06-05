import React, { useCallback, useEffect, useRef, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { speak } from "../utils/voiceHelper";

const MEDIAPIPE_POSE_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js";
const MEDIAPIPE_POSE_ASSET_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/pose";

function Workout() {
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [timer, setTimer] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [activeCounter, setActiveCounter] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [feedback, setFeedback] = useState("Stand in frame to begin.");
  const [currentAngle, setCurrentAngle] = useState(0);
  const [postureScore, setPostureScore] = useState(100);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const poseRef = useRef(null);
  const frameRef = useRef(null);
  const stageRef = useRef(null);
  const repsRef = useRef(0);
  const activeCounterRef = useRef(null);
  const caloriesPerRepRef = useRef(0);
  const lastRepTimeRef = useRef(0);

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180) / Math.PI);

    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  };


  const drawPose = useCallback((results) => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;

  const context = canvas.getContext("2d");

  context.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (!results.poseLandmarks) return;

  context.fillStyle = "#22c55e";

  results.poseLandmarks.forEach(
    (landmark) => {
      context.beginPath();

      context.arc(
        landmark.x * canvas.width,
        landmark.y * canvas.height,
        4,
        0,
        2 * Math.PI
      );

      context.fill();
    }
  );

  const connections = [
    [11,13],
    [13,15],
    [12,14],
    [14,16],
    [11,12],
    [11,23],
    [12,24],
    [23,24],
    [23,25],
    [25,27],
    [24,26],
    [26,28]
  ];

  context.strokeStyle = "#38bdf8";
  context.lineWidth = 2;

  connections.forEach(
    ([start,end]) => {

      const p1 =
        results.poseLandmarks[start];

      const p2 =
        results.poseLandmarks[end];

      if (!p1 || !p2) return;

      context.beginPath();

      context.moveTo(
        p1.x * canvas.width,
        p1.y * canvas.height
      );

      context.lineTo(
        p2.x * canvas.width,
        p2.y * canvas.height
      );

      context.stroke();
    }
  );

  context.fillStyle = "#facc15";

  context.font =
    "bold 28px Arial";

  context.fillText(
    `Angle: ${currentAngle}°`,
    20,
    40
  );
}, [currentAngle]);

  const countRepFromPose = useCallback((results) => {
    drawPose(results);

    if (!results.poseLandmarks || !activeCounterRef.current) {
      setFeedback("No pose detected. Keep your full body in frame.");
      return;
    }

    const landmarks = results.poseLandmarks;
    let angle = 0;

    if (activeCounterRef.current === "pushup") {
      angle = calculateAngle(
        landmarks[11],
        landmarks[13],
        landmarks[15]
      );

      setCurrentAngle(Math.round(angle));

      if (
        landmarks[11].visibility < 0.6 ||
        landmarks[13].visibility < 0.6 ||
        landmarks[15].visibility < 0.6
      ) {
        return;
      }

      if (angle > 140) {
        setPostureScore(100);
      } else if (angle > 100) {
        setPostureScore(80);
      } else {
        setPostureScore(60);
      }

      if (angle > 160) {
        stageRef.current = "up";
        setFeedback("Lower your body slowly.");
      }

      const now = Date.now();

      if (
        angle < 90 &&
        stageRef.current === "up" &&
        now - lastRepTimeRef.current > 800
      ) {
        lastRepTimeRef.current = now;
        stageRef.current = "down";

        repsRef.current += 1;
        setReps(repsRef.current);
        setCalories(
          Math.round(repsRef.current * caloriesPerRepRef.current)
        );
        setFeedback(`Pushup ${repsRef.current} counted`);
        speak(`${repsRef.current}`);
      }
    }

    if (activeCounterRef.current === "squat") {
      angle = calculateAngle(
        landmarks[23],
        landmarks[25],
        landmarks[27]
      );

      setCurrentAngle(Math.round(angle));

      if (
        landmarks[23].visibility < 0.6 ||
        landmarks[25].visibility < 0.6 ||
        landmarks[27].visibility < 0.6
      ) {
        return;
      }

      if (angle > 150) {
        setPostureScore(100);
      } else if (angle > 110) {
        setPostureScore(80);
      } else {
        setPostureScore(60);
      }

      if (angle > 160) {
        stageRef.current = "up";
        setFeedback("Squat down deeply.");
      }

      const now = Date.now();

      if (
        angle < 95 &&
        stageRef.current === "up" &&
        now - lastRepTimeRef.current > 1000
      ) {
        lastRepTimeRef.current = now;
        stageRef.current = "down";

        repsRef.current += 1;
        setReps(repsRef.current);
        setCalories(
          Math.round(repsRef.current * caloriesPerRepRef.current)
        );
        setFeedback(`Squat ${repsRef.current} counted`);
        speak(`${repsRef.current}`);
      }
    }
  }, [drawPose]);

  const loadMediaPipePose = () => {
    if (window.Pose) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src="${MEDIAPIPE_POSE_URL}"]`
      );

      if (existingScript) {
        existingScript.addEventListener("load", resolve);
        existingScript.addEventListener("error", reject);
        return;
      }

      const script = document.createElement("script");
      script.src = MEDIAPIPE_POSE_URL;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const startPoseDetection = useCallback(async () => {
    await loadMediaPipePose();

    if (!poseRef.current) {
      const pose = new window.Pose({
        locateFile: (file) =>
          `${MEDIAPIPE_POSE_ASSET_URL}/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(countRepFromPose);
      poseRef.current = pose;
    }

    const processFrame = async () => {
      if (!videoRef.current || !poseRef.current || !activeCounterRef.current) {
        return;
      }

      if (videoRef.current.readyState >= 2) {
        await poseRef.current.send({
          image: videoRef.current,
        });
      }

      frameRef.current = requestAnimationFrame(processFrame);
    };

    frameRef.current = requestAnimationFrame(processFrame);
  }, [countRepFromPose]);

  const stopPoseDetection = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    stageRef.current = null;
    activeCounterRef.current = null;
  }, []);

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
        video: {
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
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
    let interval;

    if (activeWorkout) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeWorkout]);

  useEffect(() => {
    return () => {
      stopPoseDetection();
      stopCamera();
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [stopCamera, stopPoseDetection]);

  const showAnalysis = (analysis) => {
    alert(
      `AI Analysis\n\n` +
        `Score: ${analysis.score}\n` +
        `Level: ${analysis.level}\n\n` +
        analysis.feedback
    );
  };

  const startWorkout = async ({
    caloriesPerRep,
    startVoiceMessage,
    counterType,
  }) => {
    const cameraStarted = await startCamera();

    if (!cameraStarted) {
      return;
    }

    repsRef.current = 0;
    activeCounterRef.current = counterType;
    caloriesPerRepRef.current = caloriesPerRep;
    stageRef.current = null;

    setActiveWorkout(true);
    setActiveCounter(counterType);
    setReps(0);
    setCalories(0);
    setCurrentAngle(0);
    setPostureScore(100);
    lastRepTimeRef.current = 0;
    setFeedback("Detecting posture...");

    try {
      await startPoseDetection();
      speak(startVoiceMessage);
    } catch (error) {
      console.error(error);
      setActiveWorkout(false);
      setActiveCounter(null);
      stopPoseDetection();
      stopCamera();
      setCameraError(
        "Pose detection failed to load. Please check your internet connection and refresh."
      );
    }
  };

  const stopWorkout = async ({
    workoutType,
    caloriesPerRep,
    stopVoiceMessage,
    errorMessage,
  }) => {
    try {
      const finalReps = repsRef.current;
      const finalCalories = Math.round(finalReps * caloriesPerRep);

      setReps(finalReps);
      setCalories(finalCalories);
      speak(stopVoiceMessage);
      setActiveWorkout(false);
      setActiveCounter(null);
      setFeedback("Workout stopped.");
      stopPoseDetection();
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
      caloriesPerRep: 6,
      startVoiceMessage: "Pushup trainer started",
      counterType: "pushup",
    });
  };

  const stopPushup = () => {
    stopWorkout({
      workoutType: "Pushups",
      caloriesPerRep: 6,
      stopVoiceMessage: "Pushup trainer stopped",
      errorMessage: "Failed to stop pushup AI",
    });
  };

  const openSquat = () => {
    startWorkout({
      caloriesPerRep: 7,
      startVoiceMessage: "Squat trainer started",
      counterType: "squat",
    });
  };

  const stopSquat = () => {
    stopWorkout({
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          <div className="bg-slate-800 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Reps</h2>

            <p className="text-5xl text-blue-400 font-bold">{reps}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Calories</h2>

            <p className="text-5xl text-red-400 font-bold">{calories}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl text-center">
  <h2 className="text-2xl font-bold mb-3">Timer</h2>

  <p className="text-5xl text-green-400 font-bold">{timer}s</p>
</div>

<div className="bg-slate-800 p-6 rounded-2xl text-center">
  <h2 className="text-2xl font-bold mb-3">
    Angle
  </h2>

  <p className="text-5xl text-yellow-400 font-bold">
    {currentAngle}°
  </p>
</div>

<div className="bg-slate-800 p-6 rounded-2xl text-center">
  <h2 className="text-2xl font-bold mb-3">
    Form Score
  </h2>

  <p className="text-5xl text-purple-400 font-bold">
    {postureScore}
  </p>
</div>

</div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <h2 className="text-3xl font-bold text-center md:text-left">
              Live Posture Camera
            </h2>

            <div className="text-slate-300 text-center md:text-right">
              {activeCounter
                ? `${activeCounter === "pushup" ? "Pushup" : "Squat"} mode`
                : "Choose a workout to start"}
            </div>
          </div>

          {cameraError && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 p-4 rounded-xl mb-6">
              {cameraError}
            </div>
          )}

          <div className="relative rounded-2xl bg-slate-950 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="hidden"
            />

            <canvas
              ref={canvasRef}
              className="w-full max-h-[520px] object-contain"
            />

            {!activeWorkout && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Camera preview appears here after you start.
              </div>
            )}
          </div>

          <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200">
            {feedback}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
