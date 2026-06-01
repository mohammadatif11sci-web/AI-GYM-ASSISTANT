import React, { useEffect, useState } from "react";
import API from "../services/api";

function PerformanceCard() {

  const [report, setReport] = useState(null);

  useEffect(() => {

    fetchPerformance();

  }, []);

  const fetchPerformance = async () => {

    try {

      const response = await API.get(
        "/performance-report"
      );

      setReport(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!report) {

    return (
      <div className="text-white">
        Loading AI Report...
      </div>
    );
  }

  return (

    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-10 shadow-2xl">

      <h2 className="text-3xl font-bold mb-6">
        🤖 AI Performance Report
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Score Card */}

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-xl font-bold mb-3">
            Performance Score
          </h3>

          <div className="text-6xl font-bold text-blue-400">
            {report.score}
          </div>

        </div>

        {/* Fitness Level */}

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-xl font-bold mb-3">
            Fitness Level
          </h3>

          <div className="text-4xl font-bold text-green-400">
            {report.level}
          </div>

        </div>

      </div>

      {/* Feedback */}

      <div className="bg-slate-800 p-6 rounded-2xl mt-6">

        <h3 className="text-2xl font-bold mb-3">
          AI Feedback
        </h3>

        <p className="text-lg text-slate-300">
          {report.feedback}
        </p>

      </div>

      {/* Prediction */}

      <div className="bg-slate-800 p-6 rounded-2xl mt-6">

        <h3 className="text-2xl font-bold mb-3">
          Future Prediction
        </h3>

        <p className="text-lg text-yellow-400">
          {report.prediction}
        </p>

      </div>

    </div>
  );
}

export default PerformanceCard;