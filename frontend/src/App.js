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

function App() {

  return (

    <BrowserRouter>

      <Routes>

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
