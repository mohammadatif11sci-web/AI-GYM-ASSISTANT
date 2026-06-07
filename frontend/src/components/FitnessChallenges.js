import React, { useState } from "react";

function FitnessChallenges() {

  const challenges = [
    {
      title: "🔥 50 Pushup Challenge",
      target: 50,
      reward: "Pushup Master Badge"
    },
    {
      title: "🏃 Burn 500 Calories",
      target: 500,
      reward: "Calorie Crusher Badge"
    },
    {
      title: "💪 100 Squat Challenge",
      target: 100,
      reward: "Leg Day Champion"
    }
  ];

  const [completed, setCompleted] = useState([]);

  const completeChallenge = (title) => {
    if (!completed.includes(title)) {
      setCompleted([...completed, title]);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl mb-8">

      <h2 className="text-3xl font-bold mb-6">
        🏆 Fitness Challenges
      </h2>

      {challenges.map((challenge, index) => (

        <div
          key={index}
          className="bg-slate-700 p-5 rounded-xl mb-4"
        >
          <h3 className="text-xl font-bold">
            {challenge.title}
          </h3>

          <p className="mt-2">
            Target: {challenge.target}
          </p>

          <p className="text-green-400">
            Reward: {challenge.reward}
          </p>

          {completed.includes(challenge.title) ? (
            <div className="mt-3 text-yellow-400 font-bold">
              ✅ Completed
            </div>
          ) : (
            <button
              onClick={() =>
                completeChallenge(challenge.title)
              }
              className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              Complete Challenge
            </button>
          )}
        </div>

      ))}

    </div>
  );
}

export default FitnessChallenges;