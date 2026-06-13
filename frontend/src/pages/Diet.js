import React, { useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";

const goalPlans = {
  "Weight Loss": {
    meals: {
      breakfast: "Oats + Banana + Green Tea",
      lunch: "Brown Rice + Grilled Chicken + Salad",
      dinner: "Paneer + Vegetables",
      snacks: "Apple + Almonds",
    },
    groceries: [
      "Oats",
      "Bananas",
      "Green Tea",
      "Brown Rice",
      "Chicken Breast",
      "Paneer",
      "Vegetables",
      "Apples",
      "Almonds",
    ],
  },
  Maintenance: {
    meals: {
      breakfast: "Oats + Milk + Fruits",
      lunch: "Rice + Dal + Vegetables",
      dinner: "Paneer + Roti",
      snacks: "Mixed Fruits",
    },
    groceries: [
      "Oats",
      "Milk",
      "Fruits",
      "Rice",
      "Dal",
      "Vegetables",
      "Paneer",
      "Roti Flour",
    ],
  },
  "Muscle Gain": {
    meals: {
      breakfast: "Eggs + Milk + Peanut Butter Toast",
      lunch: "Rice + Chicken + Vegetables",
      dinner: "Paneer + Roti + Salad",
      snacks: "Protein Shake + Banana",
    },
    groceries: [
      "Eggs",
      "Milk",
      "Peanut Butter",
      "Bread",
      "Rice",
      "Chicken",
      "Paneer",
      "Vegetables",
      "Bananas",
      "Protein Powder",
    ],
  },
};

const categoryGroceries = {
  underweight: [
    "Milk",
    "Bananas",
    "Peanut Butter",
    "Oats",
    "Eggs",
    "Rice",
    "Chicken Breast",
    "Dry Fruits",
  ],
  normal: [
    "Oats",
    "Brown Rice",
    "Eggs",
    "Chicken Breast",
    "Fish",
    "Greek Yogurt",
    "Spinach",
    "Apples",
    "Bananas",
    "Almonds",
  ],
  overweight: [
    "Oats",
    "Broccoli",
    "Spinach",
    "Cucumber",
    "Tomatoes",
    "Lentils",
    "Chicken Breast",
    "Fish",
    "Green Tea",
    "Apples",
  ],
  obese: [
    "Oats",
    "Broccoli",
    "Spinach",
    "Cucumber",
    "Tomatoes",
    "Lentils",
    "Chicken Breast",
    "Fish",
    "Green Tea",
    "Apples",
  ],
};

const getCategoryGroceries = (category = "") => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("under")) {
    return categoryGroceries.underweight;
  }

  if (normalizedCategory.includes("normal")) {
    return categoryGroceries.normal;
  }

  if (normalizedCategory.includes("over")) {
    return categoryGroceries.overweight;
  }

  if (normalizedCategory.includes("obese")) {
    return categoryGroceries.obese;
  }

  return [];
};

const calculateLocalBMI = (weight, height) => {
  const heightInMeters = Number(height) / 100;
  const bmi = Number(weight) / (heightInMeters * heightInMeters);

  return Number(bmi.toFixed(1));
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal Weight";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
};

const getAdvice = (category) => {
  if (category === "Underweight") {
    return "Increase calorie and protein intake.";
  }

  if (category === "Normal Weight") {
    return "Maintain balanced nutrition and workouts.";
  }

  if (category === "Overweight") {
    return "Focus on cardio and calorie deficit.";
  }

  return "Consult fitness and nutrition experts.";
};

function Diet() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "Male",
    goal: "Maintenance",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const selectedPlan = goalPlans[formData.goal];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const buildLocalResult = () => {
    const bmi = calculateLocalBMI(formData.weight, formData.height);
    const category = getBMICategory(bmi);

    return {
      bmi,
      category,
      daily_calories: Math.round(Number(formData.weight) * 35),
      advice: getAdvice(category),
      diet_plan: selectedPlan.meals,
      grocery_list: selectedPlan.groceries,
    };
  };

  const generateDiet = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.weight || !formData.height || !formData.age) {
      setError("Please enter age, weight, and height.");
      return;
    }

    try {
      const response = await API.post("/diet-plan", {
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
      });

      const apiGroceries = response.data.grocery_list?.length
        ? response.data.grocery_list
        : getCategoryGroceries(response.data.category);

      setResult({
        ...response.data,
        diet_plan: selectedPlan.meals,
        grocery_list: apiGroceries.length ? apiGroceries : selectedPlan.groceries,
      });
    } catch (apiError) {
      console.log(apiError);
      setResult(buildLocalResult());
      setError("Using local BMI planner because the AI Dietician API is unavailable.");
    }
  };

  const downloadGroceryList = () => {
    if (!result?.grocery_list?.length) {
      return;
    }

    const text = result.grocery_list.join("\n");
    const blob = new Blob([text], {
      type: "text/plain",
    });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "grocery_list.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-4 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          AI Dietician BMI & Diet Planner
        </h1>

        <form
          onSubmit={generateDiet}
          className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            >
              <option>Weight Loss</option>
              <option>Maintenance</option>
              <option>Muscle Gain</option>
            </select>
          </div>

          {error && (
            <p className="mt-4 text-sm text-yellow-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
          >
            Calculate BMI & Generate Plan
          </button>
        </form>

        {result && (
          <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl">
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                AI Diet Analysis
              </h2>

              <div className="flex flex-col gap-4 text-lg md:text-xl">
                <p>
                  <span className="font-bold text-blue-400">BMI:</span>{" "}
                  {result.bmi}
                </p>

                <p>
                  <span className="font-bold text-green-400">Category:</span>{" "}
                  {result.category}
                </p>

                <p>
                  <span className="font-bold text-red-400">Daily Calories:</span>{" "}
                  {result.daily_calories}
                </p>

                <p>
                  <span className="font-bold text-yellow-400">AI Advice:</span>{" "}
                  {result.advice}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Diet Plan
              </h2>

              <div className="flex flex-col gap-3 text-lg">
                <p>
                  <strong>Breakfast:</strong> {result.diet_plan.breakfast}
                </p>

                <p>
                  <strong>Lunch:</strong> {result.diet_plan.lunch}
                </p>

                <p>
                  <strong>Dinner:</strong> {result.diet_plan.dinner}
                </p>

                <p>
                  <strong>Snacks:</strong> {result.diet_plan.snacks}
                </p>
              </div>
            </div>

            {result.grocery_list.length > 0 && (
              <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 xl:col-span-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-purple-400">
                    Recommended Grocery List
                  </h2>

                  <button
                    type="button"
                    onClick={downloadGroceryList}
                    className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Download Grocery List
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {result.grocery_list.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="bg-slate-800 p-3 rounded-xl text-center border border-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Diet;
