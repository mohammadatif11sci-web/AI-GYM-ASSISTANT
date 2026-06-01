import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Achievements() {

  const [achievements, setAchievements] =
    useState([]);

  useEffect(() => {

    fetchAchievements();

  }, []);

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

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        🏅 Achievements & Rewards
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {achievements.map(
          (achievement, index) => (

            <div
              key={index}
              className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl hover:scale-105 transition-all duration-300"
            >

              <h2 className="text-2xl font-bold">
                {achievement}
              </h2>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Achievements;