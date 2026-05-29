import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    alert("Logged Out");
    navigate("/login");
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 px-10 py-5 flex justify-between items-center">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-blue-400">AI Gym</h1>
      </div>

      {/* Navigation */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white hover:text-blue-400 transition-all"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/workout")}
          className="text-white hover:text-green-400 transition-all"
        >
          Workout
        </button>

        <button
          onClick={() => navigate("/history")}
          className="text-white hover:text-yellow-400 transition-all"
        >
          History
        </button>

        <button
  onClick={() => navigate("/diet")}
  className="text-white hover:text-pink-400 transition-all"
>
         Diet AI
        </button>

        <button
  onClick={() => navigate("/chatbot")}
  className="text-white hover:text-cyan-400 transition-all"
>
         AI Coach
        </button>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold text-white transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
