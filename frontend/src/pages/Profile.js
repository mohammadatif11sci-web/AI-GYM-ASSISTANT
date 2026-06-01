import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Profile() {

  const [stats, setStats] =
    useState(null);

  const email =
    "mohammadatif11sci@gmail.com";

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response =
        await API.get(

          `/user-stats/${email}`
        );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!stats) {

    return (

      <div className="text-white p-10">
        Loading Profile...
      </div>
    );
  }

  // AI Fitness Level Logic

  let level = "Beginner";

  if (stats.total_workouts >= 10) {

    level = "Intermediate";
  }

  if (stats.total_workouts >= 20) {

    level = "Advanced";
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        👤 User Profile
      </h1>

      <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl max-w-4xl">

        {/* Avatar */}

        <div className="flex justify-center mb-8">

          <div className="w-40 h-40 rounded-full bg-slate-700 flex items-center justify-center text-6xl">

            👤

          </div>

        </div>

        {/* Stats Grid */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Email */}

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl mb-2">
              Email
            </h2>

            <p className="text-xl text-blue-400 font-bold">

              {stats.email}

            </p>

          </div>

          {/* Fitness Level */}

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl mb-2">
              Fitness Level
            </h2>

            <p className="text-3xl text-green-400 font-bold">

              {level}

            </p>

          </div>

          {/* Workouts */}

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl mb-2">
              Total Workouts
            </h2>

            <p className="text-4xl text-yellow-400 font-bold">

              💪 {stats.total_workouts}

            </p>

          </div>

          {/* Calories */}

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl mb-2">
              Calories Burned
            </h2>

            <p className="text-4xl text-red-400 font-bold">

              🔥 {stats.total_calories}

            </p>

          </div>

        </div>

        {/* Reps */}

        <div className="bg-slate-800 p-6 rounded-2xl mt-6">

          <h2 className="text-2xl mb-2">
            Total Repetitions
          </h2>

          <p className="text-5xl text-purple-400 font-bold">

            {stats.total_reps}

          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;