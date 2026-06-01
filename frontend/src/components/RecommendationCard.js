import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function RecommendationCard() {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetchRecommendations();

  }, []);

  const fetchRecommendations = async () => {

    try {

      const response = await API.get(
        "/recommendations"
      );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!data) {

    return (

      <div className="text-white mt-10">
        Loading Recommendations...
      </div>
    );
  }

  const workouts = data.recommended_workout || data.plan || [];
  const dailyGoal = data.daily_goal || data.recommendation;

  return (

    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10 shadow-2xl">

      <h2 className="text-3xl font-bold mb-6">
        🧠 AI Workout Recommendations
      </h2>

      {/* Fitness Level */}

      <div className="bg-slate-800 p-6 rounded-2xl mb-6">

        <h3 className="text-2xl font-bold mb-2">
          Fitness Level
        </h3>

        <p className="text-4xl text-green-400 font-bold">
          {data.level}
        </p>

      </div>

      {/* Workout List */}

      <div className="bg-slate-800 p-6 rounded-2xl mb-6">

        <h3 className="text-2xl font-bold mb-4">
          Recommended Workout
        </h3>

        <div className="flex flex-col gap-3">

          {workouts.map(
            (workout, index) => (

              <div
                key={index}
                className="bg-slate-700 p-4 rounded-xl text-lg"
              >

                💪 {workout}

              </div>
            )
          )}

        </div>

      </div>

      {/* Daily Goal */}

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h3 className="text-2xl font-bold mb-3">
          Daily Goal
        </h3>

        <p className="text-3xl text-yellow-400 font-bold">
          {dailyGoal}
        </p>

      </div>

    </div>
  );
}

export default RecommendationCard;
