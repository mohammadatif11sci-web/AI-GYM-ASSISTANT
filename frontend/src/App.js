import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import History from "./pages/History";
import Diet from "./pages/Diet";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./pages/Chatbot";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import GymRecommendations from "./pages/GymRecommendations";
import FoodAnalyzerPage from "./pages/FoodAnalyzerPage";
import FitnessChallengesPage from "./pages/FitnessChallengesPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route
  path="/food-analyzer"
  element={
    <ProtectedRoute>
      <FoodAnalyzerPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/fitness-challenges"
  element={
    <ProtectedRoute>
      <FitnessChallengesPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/gyms"
  element={<GymRecommendations />}
/>

        <Route
  path="/profile"
  element={<Profile />}
/>

        <Route
  path="/achievements"
  element={<Achievements />}
/>

        <Route
  path="/leaderboard"
  element={<Leaderboard />}
/>

        <Route
  path="/admin"
  element={<AdminDashboard />}
/>

        <Route
  path="/chatbot"
  element={
    <ProtectedRoute>
      <Chatbot />
    </ProtectedRoute>
  }
/>

        <Route
  path="/diet"
  element={
    <ProtectedRoute>
      <Diet />
    </ProtectedRoute>
  }
/>

        <Route
  path="/history"
  element={<History />}
/>

        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/workout"
          element={<Workout />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
