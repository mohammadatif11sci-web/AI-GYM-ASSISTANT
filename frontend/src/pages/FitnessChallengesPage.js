import React from "react";
import Navbar from "../components/Navbar";
import FitnessChallenges from "../components/FitnessChallenges";

function FitnessChallengesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-4 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          🎯 Fitness Challenges
        </h1>

        <FitnessChallenges />
      </div>
    </div>
  );
}

export default FitnessChallengesPage;