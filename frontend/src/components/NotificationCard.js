import React, {
  useEffect,
  useState
} from "react";

function NotificationCard() {

  const [notification,
    setNotification] =
    useState("");

  useEffect(() => {

    const notifications = [

      "🔥 Time for your workout!",

      "🏅 Achievement unlocked!",

      "💪 Push harder today!",

      "⚡ Maintain your streak!",

      "🥗 Track your nutrition goals!"
    ];

    const randomNotification =

      notifications[
        Math.floor(
          Math.random() *
          notifications.length
        )
      ];

    setNotification(
      randomNotification
    );

  }, []);

  return (

    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-2xl font-bold mb-2">
        🔔 AI Notification
      </h2>

      <p className="text-lg">
        {notification}
      </p>

    </div>
  );
}

export default NotificationCard;