import React, {
  useState
} from "react";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

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

        <div className="relative">

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all"
          >

            Menu

          </button>

          {menuOpen && (

            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">

              <button
                onClick={() => goTo("/profile")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                Profile
              </button>

              <button
                onClick={() => goTo("/history")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                History
              </button>

              <button
                onClick={() => goTo("/leaderboard")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                Leaderboard
              </button>

              <button
                onClick={() => goTo("/achievements")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                Achievements
              </button>

              <button
                onClick={() => goTo("/admin")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                Admin
              </button>

              <button
                onClick={() => goTo("/gyms")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                Nearby Gyms
              </button>

              <button
                onClick={() => goTo("/chatbot")}
                className="w-full text-left px-5 py-4 hover:bg-slate-800 transition-all"
              >
                AI Coach
              </button>

            </div>
          )}

        </div>

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
