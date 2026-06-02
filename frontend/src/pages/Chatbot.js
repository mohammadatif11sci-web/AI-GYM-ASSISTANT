import React, {
  useState
} from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Chatbot() {

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  const formatMessage = (text) => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => (
        <p
          key={index}
          className="mb-2 last:mb-0 leading-relaxed"
        >
          {line}
        </p>
      ));
  };

  const sendMessage = async () => {

    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    const userMessage = {

      sender: "user",

      text: currentMessage,
    };

    setChat((prev) => [

      ...prev,

      userMessage
    ]);

    setMessage("");
    setLoading(true);

    try {

      const response = await API.get("/chatbot", {
        params: {
          question: currentMessage,
        },
      });

      const data = response.data;

      const botMessage = {

        sender: "bot",

        text: data.answer || data.response || "Please try asking that again.",

        model: data.model,

        fallback: data.fallback,
      };

      setChat((prev) => [

        ...prev,

        botMessage
      ]);

    } catch (error) {

      console.log(error);

      const botMessage = {

        sender: "bot",

        text: "I could not reach Gemini right now. Please check the backend and API key.",
      };

      setChat((prev) => [

        ...prev,

        botMessage
      ]);
    } finally {

      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-4 md:p-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              AI Fitness Chatbot
            </h1>

            <p className="text-slate-400 mt-2">
              Powered by Gemini for workouts, nutrition, recovery, and form help.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl text-sm text-slate-300">
            Real Gemini answers
          </div>

        </div>

        {/* Chat Box */}
        <div className="bg-slate-900 rounded-3xl p-4 md:p-6 h-[520px] overflow-y-auto border border-slate-800">

          <div className="flex flex-col gap-4">

            {chat.length === 0 && (

              <div className="bg-slate-800 p-5 rounded-2xl text-slate-300 max-w-2xl">
                Ask for a workout plan, meal idea, form tip, or recovery advice.
              </div>
            )}

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[85%] md:max-w-[70%]
                ${
                  msg.sender === "user"

                  ? "bg-blue-500 self-end"

                  : "bg-slate-800 self-start"
                }`}
              >

                {formatMessage(msg.text)}

                {msg.model && (
                  <div className="text-xs text-slate-400 mt-3">
                    Gemini model: {msg.model}
                  </div>
                )}

                {msg.fallback && (
                  <div className="text-xs text-yellow-300 mt-3">
                    Fallback response
                  </div>
                )}

              </div>

            ))}

            {loading && (

              <div className="bg-slate-800 self-start p-4 rounded-2xl text-slate-300">
                Gemini is thinking...
              </div>
            )}

          </div>

        </div>

        {/* Input */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <textarea
            rows={2}
            placeholder="Ask AI fitness coach..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="flex-1 p-4 rounded-2xl bg-slate-900 border border-slate-800 outline-none resize-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:cursor-not-allowed px-8 rounded-2xl font-bold min-h-14"
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbot;
