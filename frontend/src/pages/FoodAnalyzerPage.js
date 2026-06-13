import React from "react";
import Navbar from "../components/Navbar";
import FoodAnalyzer from "../components/FoodAnalyzer";

function FoodAnalyzerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-4 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          🍔 AI Food Analyzer
        </h1>

        <FoodAnalyzer />
      </div>
    </div>
  );
}

export default FoodAnalyzerPage;