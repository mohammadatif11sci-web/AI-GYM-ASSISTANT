import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [

  {
    day: "Mon",
    workouts: 2,
    calories: 200,
  },

  {
    day: "Tue",
    workouts: 4,
    calories: 350,
  },

  {
    day: "Wed",
    workouts: 3,
    calories: 300,
  },

  {
    day: "Thu",
    workouts: 5,
    calories: 500,
  },

  {
    day: "Fri",
    workouts: 6,
    calories: 650,
  },

  {
    day: "Sat",
    workouts: 4,
    calories: 400,
  },

  {
    day: "Sun",
    workouts: 7,
    calories: 800,
  },
];

function WorkoutChart() {

  return (

    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10 shadow-xl">

      <h2 className="text-3xl font-bold mb-8 text-white">
        📈 Weekly Workout Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          {/* Workout Line */}
          <Line
            type="monotone"
            dataKey="workouts"
            stroke="#3b82f6"
            strokeWidth={4}
          />

          {/* Calories Line */}
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#22c55e"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default WorkoutChart;