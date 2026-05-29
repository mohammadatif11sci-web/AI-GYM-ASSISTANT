import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/signup",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert("Signup Failed");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-[400px] border border-slate-700">

        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          🚀 AI Gym Signup
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 p-4 rounded-xl font-bold text-lg"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;