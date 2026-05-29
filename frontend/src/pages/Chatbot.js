import React, {
  useState
} from "react";

import Navbar from "../components/Navbar";

function Chatbot() {

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message) return;

    const currentMessage = message;

    const userMessage = {

      sender: "user",

      text: currentMessage,
    };

    setChat((prev) => [

      ...prev,

      userMessage
    ]);

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/chatbot?question=${encodeURIComponent(currentMessage)}`
      );

      const data = await response.json();

      const botMessage = {

        sender: "bot",

        text: data.answer || data.response,
      };

      setChat((prev) => [

        ...prev,

        botMessage
      ]);

    } catch (error) {

      console.log(error);
    }

    setMessage("");
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          🤖 AI Fitness Chatbot
        </h1>

        {/* Chat Box */}
        <div className="bg-slate-900 rounded-3xl p-6 h-[500px] overflow-y-auto border border-slate-800">

          <div className="flex flex-col gap-4">

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[70%]
                ${
                  msg.sender === "user"

                  ? "bg-blue-500 self-end"

                  : "bg-slate-800 self-start"
                }`}
              >

                {msg.text}

              </div>

            ))}

          </div>

        </div>

        {/* Input */}
        <div className="flex gap-4 mt-6">

          <input
            type="text"
            placeholder="Ask AI fitness coach..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="flex-1 p-4 rounded-2xl bg-slate-900 border border-slate-800"
          />

          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 px-8 rounded-2xl font-bold"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbot;
