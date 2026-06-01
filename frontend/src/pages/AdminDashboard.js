import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function AdminDashboard() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await API.get(
        "/admin-stats"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!stats) {

    return (

      <div className="text-white p-10">
        Loading Admin Analytics...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        📊 Admin Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Users */}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">

          <h2 className="text-2xl mb-4">
            👥 Total Users
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {stats.total_users}
          </p>

        </div>

        {/* Total Workouts */}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">

          <h2 className="text-2xl mb-4">
            🏋 Total Workouts
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {stats.total_workouts}
          </p>

        </div>

        {/* Calories */}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">

          <h2 className="text-2xl mb-4">
            🔥 Calories Burned
          </h2>

          <p className="text-5xl font-bold text-yellow-400">
            {stats.total_calories}
          </p>

        </div>

        {/* Active Users */}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">

          <h2 className="text-2xl mb-4">
            ⚡ Active Users
          </h2>

          <p className="text-5xl font-bold text-purple-400">
            {stats.active_users}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;