import React, {
  useState
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Diet() {

  const [formData, setFormData] = useState({

    age: "",
    weight: "",
    height: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const generateDiet = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/diet-plan",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          🥗 AI Dietician
        </h1>

        {/* Form */}
        <form
          onSubmit={generateDiet}
          className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-xl"
        >

          <div className="flex flex-col gap-5">

            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              name="weight"
              placeholder="Enter Weight (kg)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              name="height"
              placeholder="Enter Height (cm)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold"
            >
              Generate AI Diet Plan
            </button>

          </div>

        </form>

        {/* Results */}
        {result && (

          <div className="mt-10 bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-2xl">

            <h2 className="text-3xl font-bold mb-6">
              📊 AI Diet Analysis
            </h2>

            <div className="flex flex-col gap-4 text-xl">

              <p>
                <span className="font-bold text-blue-400">
                  BMI:
                </span>{" "}
                {result.bmi}
              </p>

              <p>
                <span className="font-bold text-green-400">
                  Category:
                </span>{" "}
                {result.category}
              </p>

              <p>
                <span className="font-bold text-red-400">
                  Daily Calories:
                </span>{" "}
                {result.daily_calories}
              </p>

              <p>
                <span className="font-bold text-yellow-400">
                  AI Advice:
                </span>{" "}
                {result.advice}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Diet;