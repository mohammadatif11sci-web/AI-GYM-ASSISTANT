import React, { useState } from "react";

function BMIDietPlanner() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [goal, setGoal] = useState("Maintenance");

  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [dietPlan, setDietPlan] = useState(null);
  const [groceryList, setGroceryList] = useState([]);

  const calculateBMI = () => {
    if (!weight || !height) return;

    const heightInMeters = height / 100;

    const bmiValue =
      weight / (heightInMeters * heightInMeters);

    const finalBMI = bmiValue.toFixed(1);

    setBmi(finalBMI);

    let bmiCategory = "";

    if (finalBMI < 18.5) {
      bmiCategory = "Underweight";
    } else if (finalBMI < 25) {
      bmiCategory = "Normal";
    } else if (finalBMI < 30) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    setCategory(bmiCategory);

    generateDietPlan(bmiCategory);
  };

  const generateDietPlan = (bmiCategory) => {
    let plan = {};
    let groceries = [];

    if (goal === "Weight Loss") {
      plan = {
        breakfast: "Oats + Banana + Green Tea",
        lunch: "Brown Rice + Grilled Chicken + Salad",
        dinner: "Paneer + Vegetables",
        snacks: "Apple + Almonds",
      };

      groceries = [
        "Oats",
        "Bananas",
        "Green Tea",
        "Brown Rice",
        "Chicken Breast",
        "Paneer",
        "Vegetables",
        "Apples",
        "Almonds",
      ];
    }

    else if (goal === "Muscle Gain") {
      plan = {
        breakfast: "Eggs + Milk + Peanut Butter Toast",
        lunch: "Rice + Chicken + Vegetables",
        dinner: "Paneer + Roti + Salad",
        snacks: "Protein Shake + Banana",
      };

      groceries = [
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
      ];
    }

    else {
      plan = {
        breakfast: "Oats + Milk + Fruits",
        lunch: "Rice + Dal + Vegetables",
        dinner: "Paneer + Roti",
        snacks: "Mixed Fruits",
      };

      groceries = [
        "Oats",
        "Milk",
        "Fruits",
        "Rice",
        "Dal",
        "Vegetables",
        "Paneer",
        "Roti Flour",
      ];
    }

    setDietPlan(plan);
    setGroceryList(groceries);
  };

  const downloadGroceryList = () => {
    const text = groceryList.join("\n");

    const blob = new Blob(
      [text],
      {
        type: "text/plain",
      }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "grocery_list.txt";

    link.click();
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mb-8">

      <h2 className="text-3xl font-bold mb-6">
        🧮 BMI & Diet Planner
      </h2>

      <div className="grid md:grid-cols-5 gap-4">

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="bg-slate-700 p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) =>
            setHeight(e.target.value)
          }
          className="bg-slate-700 p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
          className="bg-slate-700 p-3 rounded-lg"
        />

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
          className="bg-slate-700 p-3 rounded-lg"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
          className="bg-slate-700 p-3 rounded-lg"
        >
          <option>Weight Loss</option>
          <option>Maintenance</option>
          <option>Muscle Gain</option>
        </select>

      </div>

      <button
        onClick={calculateBMI}
        className="mt-5 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold"
      >
        Calculate BMI & Generate Plan
      </button>

      {bmi && (
        <div className="mt-6 bg-slate-700 p-5 rounded-xl">

          <h3 className="text-2xl font-bold">
            BMI: {bmi}
          </h3>

          <p className="text-green-400 text-lg">
            Category: {category}
          </p>

        </div>
      )}

      {dietPlan && (
        <div className="mt-6">

          <div className="bg-slate-700 p-5 rounded-xl mb-4">

            <h3 className="text-2xl font-bold mb-4">
              🍽 Diet Plan
            </h3>

            <p>
              <strong>Breakfast:</strong>{" "}
              {dietPlan.breakfast}
            </p>

            <p>
              <strong>Lunch:</strong>{" "}
              {dietPlan.lunch}
            </p>

            <p>
              <strong>Dinner:</strong>{" "}
              {dietPlan.dinner}
            </p>

            <p>
              <strong>Snacks:</strong>{" "}
              {dietPlan.snacks}
            </p>

          </div>

          <div className="bg-slate-700 p-5 rounded-xl">

            <h3 className="text-2xl font-bold mb-4">
              🛒 Grocery List
            </h3>

            <ul className="list-disc ml-6">
              {groceryList.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <button
              onClick={
                downloadGroceryList
              }
              className="mt-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl"
            >
              Download Grocery List
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default BMIDietPlanner;