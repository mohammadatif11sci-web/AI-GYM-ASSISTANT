import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import WorkoutChart from "../components/WorkoutChart";

function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({

    total_workouts: 0,

    total_calories: 0,
  });

  const [prediction, setPrediction] = useState(null);

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {

    fetchStats();
    fetchPrediction();
    fetchAchievements();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await API.get(
        "/dashboard-stats"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAchievements = async () => {

    try {

      const response = await API.get(
        "/achievements"
      );

      setAchievements(
        response.data.achievements
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchPrediction = async () => {

    try {

      const response = await API.get(
        "/prediction"
      );

      setPrediction(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              🏋️ AI Gym Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Welcome back, Athlete 🚀
            </p>

          </div>

          <button
            onClick={() => navigate("/workout")}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            Start Workout
          </button>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Total Workouts */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-4">
              💪 Total Workouts
            </h2>

            <p className="text-5xl font-bold text-blue-400">
              {stats.total_workouts}
            </p>

          </div>

          {/* Calories Burned */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-4">
              🔥 Calories Burned
            </h2>

            <p className="text-5xl font-bold text-red-400">
              {stats.total_calories}
            </p>

          </div>

          {/* Workout Streak */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-4">
              ⚡ Workout Streak
            </h2>

            <p className="text-5xl font-bold text-green-400">
              5 Days
            </p>

          </div>

        </div>

        {/* AI Features */}
        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            🤖 AI Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Pushup Trainer */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

              <h3 className="text-2xl font-bold mb-4">
                Pushup AI Trainer
              </h3>

              <p className="text-slate-400 mb-6">
                Real-time pushup posture tracking and rep counting.
              </p>

              <button
                onClick={() => navigate("/workout")}
                className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold"
              >
                Open Trainer
              </button>

            </div>

            {/* Squat Trainer */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

              <h3 className="text-2xl font-bold mb-4">
                Squat AI Trainer
              </h3>

              <p className="text-slate-400 mb-6">
                AI-powered squat analysis with posture correction.
              </p>

              <button
                onClick={() => navigate("/workout")}
                className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
              >
                Open Trainer
              </button>

            </div>

          </div>

        </div>

        {/* Workout Analytics Chart */}
        <WorkoutChart />

        {prediction && (

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10">

            <h2 className="text-3xl font-bold mb-6">
              AI Progress Prediction
            </h2>

            <div className="flex flex-col gap-4 text-xl">

              <p>
                Predicted Calories:{" "}
                {prediction.predicted_calories}
              </p>

              <p>
                Consistency:{" "}
                {prediction.consistency}%
              </p>

              <p>
                Trend:{" "}
                {prediction.trend}
              </p>

            </div>

          </div>
        )}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Achievements
          </h2>

          <div className="flex flex-col gap-4">

            {achievements.map(
              (achievement, index) => (

                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-2xl text-xl"
                >

                  {achievement}

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
