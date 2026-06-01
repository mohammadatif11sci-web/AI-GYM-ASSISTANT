import React, {
  useState
} from "react";

import API from "../services/api";

function FoodAnalyzer() {

  const [foodData, setFoodData] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const handleFileChange = (e) => {

    setFile(
      e.target.files[0]
    );
  };

  const analyzeFood = async () => {

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response =
        await API.post(

          "/food-analysis",

          formData,

          {
            headers: {
              "Content-Type":
              "multipart/form-data",
            },
          }
        );

      setFoodData(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10 shadow-2xl">

      <h2 className="text-3xl font-bold mb-6">
        🍔 AI Food Analyzer
      </h2>

      {/* Upload */}

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-6"
      />

      <button
        onClick={analyzeFood}
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold mb-6"
      >
        Analyze Food
      </button>

      {/* Result */}

      {foodData && (

        <div className="flex flex-col gap-4">

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold">
              🍕 Food
            </h3>

            <p className="text-3xl text-green-400">
              {foodData.food}
            </p>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold">
              🔥 Calories
            </h3>

            <p className="text-3xl text-yellow-400">
              {foodData.calories}
            </p>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold">
              💪 Protein
            </h3>

            <p className="text-3xl text-blue-400">
              {foodData.protein}
            </p>

          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold">
              🤖 AI Advice
            </h3>

            <p className="text-lg text-slate-300">
              {foodData.advice}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default FoodAnalyzer;