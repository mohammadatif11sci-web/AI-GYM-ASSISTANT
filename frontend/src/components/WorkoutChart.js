import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API from "../services/api";

function WorkoutChart() {
  const [data, setData] = useState([]);

  const buildWeeklyData = useCallback((workouts) => {
    const today = new Date();
    const days = [];

    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);

      days.push({
        key: date.toISOString().slice(0, 10),
        day: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short"
          }
        ),
        workouts: 0,
        calories: 0,
      });
    }

    workouts.forEach((workout) => {
      if (!workout.created_at) return;

      const workoutDate = new Date(workout.created_at)
        .toISOString()
        .slice(0, 10);
      const day = days.find(
        (item) => item.key === workoutDate
      );

      if (!day) return;

      day.workouts += 1;
      day.calories += workout.calories || 0;
    });

    return days.map(({ key, ...day }) => day);
  }, []);

  const fetchWorkoutHistory = useCallback(async () => {
    try {
      const response = await API.get("/history");
      const groupedData = buildWeeklyData(response.data);

      setData(groupedData);
    } catch (error) {
      console.log(error);
    }
  }, [buildWeeklyData]);

  useEffect(() => {
    fetchWorkoutHistory();
  }, [fetchWorkoutHistory]);

  const hasCloudData = data.some(
    (item) => item.workouts > 0 || item.calories > 0
  );

  return (

    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10 shadow-xl">

      <h2 className="text-3xl font-bold mb-8 text-white">
        Weekly Workout Analytics
      </h2>

      {!hasCloudData ? (

        <p className="text-slate-400">
          No cloud workout history yet.
        </p>
      ) : (

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

            <Line
              type="monotone"
              dataKey="workouts"
              stroke="#3b82f6"
              strokeWidth={4}
            />

            <Line
              type="monotone"
              dataKey="calories"
              stroke="#22c55e"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>
      )}

    </div>
  );
}

export default WorkoutChart;
