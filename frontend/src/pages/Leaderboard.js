import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Leaderboard() {

  const [leaders, setLeaders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        "/leaderboard"
      );

      setLeaders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Global Leaderboard
      </h1>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">

        <div className="grid grid-cols-5 bg-slate-800 p-6 text-lg font-bold">

          <div>Rank</div>

          <div>User</div>

          <div>Calories</div>

          <div>Workouts</div>

          <div>Total Reps</div>

        </div>

        {loading && (

          <div className="p-6 text-slate-300">
            Loading leaderboard...
          </div>
        )}

        {!loading && leaders.length === 0 && (

          <div className="p-6 text-slate-300">
            No workout data found yet.
          </div>
        )}

        {leaders.map((user, index) => (

          <div
            key={user.email || index}
            className="grid grid-cols-5 p-6 border-b border-slate-800 text-lg hover:bg-slate-800 transition-all"
          >

            <div>
              #{user.rank}
            </div>

            <div>
              {user.name}
            </div>

            <div className="text-yellow-400 font-bold">
              {user.calories}
            </div>

            <div>
              {user.total_workouts}
            </div>

            <div>
              {user.total_reps}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Leaderboard;
