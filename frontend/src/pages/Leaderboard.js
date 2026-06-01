import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Leaderboard() {

  const [leaders, setLeaders] =
    useState([]);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard = async () => {

    try {

      const response = await API.get(
        "/leaderboard"
      );

      setLeaders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        🏆 Global Leaderboard
      </h1>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="grid grid-cols-3 bg-slate-800 p-6 text-2xl font-bold">

          <div>Rank</div>

          <div>User</div>

          <div>Calories</div>

        </div>

        {/* Users */}

        {leaders.map((user, index) => (

          <div
            key={index}
            className="grid grid-cols-3 p-6 border-b border-slate-800 text-xl hover:bg-slate-800 transition-all"
          >

            <div>

              {user.rank === 1 && "🥇"}

              {user.rank === 2 && "🥈"}

              {user.rank === 3 && "🥉"}

              {" "}#{user.rank}

            </div>

            <div>
              {user.name}
            </div>

            <div className="text-yellow-400 font-bold">
              🔥 {user.calories}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Leaderboard;