import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await API.get(
        "/workout-history"
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          📜 Workout History
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-slate-900 rounded-3xl overflow-hidden">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-5 text-left">
                  Email
                </th>

                <th className="p-5 text-left">
                  Workout
                </th>

                <th className="p-5 text-left">
                  Reps
                </th>

                <th className="p-5 text-left">
                  Calories
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-800"
                >

                  <td className="p-5">
                    {item.email}
                  </td>

                  <td className="p-5">
                    {item.workout_type}
                  </td>

                  <td className="p-5">
                    {item.reps}
                  </td>

                  <td className="p-5">
                    {item.calories}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default History;