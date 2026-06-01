import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function NotificationCard() {
  const [notification, setNotification] =
    useState("");

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await API.get(
        "/dashboard-stats"
      );

      const stats = response.data;

      if (!stats.total_workouts) {
        setNotification(
          "No cloud workout data yet. Complete a workout to unlock insights."
        );
        return;
      }

      if (stats.current_streak > 0) {
        setNotification(
          `Current streak: ${stats.current_streak} day(s).`
        );
        return;
      }

      setNotification(
        `Cloud total: ${stats.total_workouts} workout(s), ${stats.total_calories} calories.`
      );
    } catch (error) {
      console.log(error);
      setNotification(
        "Cloud notification data is unavailable right now."
      );
    }
  };

  return (

    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-2xl font-bold mb-2">
        AI Notification
      </h2>

      <p className="text-lg">
        {notification}
      </p>

    </div>
  );
}

export default NotificationCard;
