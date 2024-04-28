import { useState } from "react";
import MedicalSvg from "./MedicalSvg";
import ChatThread from "./ChatThread";

const Chatbot = () => {
  const [chatSession, toggleChatSession] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  function handleChatSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    alert(message);
    // createChatSession(message);
    e.currentTarget.reset();
  }

  async function createChatSession(message: string) {
    try {
      const res = await fetch("/chat-sessions/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          message,
        }),
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex bg-[#111] w-screen h-screen">
      <div className="bg-[rgba(178,178,238,0.03)] h-screen text-white w-[16vw]">
        <div
          className="w-full py-4 flex justify-between px-6 items-center hover:bg-[rgba(178,178,238,0.1)] cursor-pointer"
          onClick={() => toggleChatSession(!chatSession)}
        >
          <p>new chat</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z" />
            <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-between grow items-center">
        <div className="grow text-white py-10 self-start mx-auto w-[55%]">
          {chatSession ? (
            <ChatThread />
          ) : (
            <div className="flex flex-col items-center">
              <MedicalSvg />
              <h1 className="text-5xl opacity-30 py-5">CardioBot</h1>
            </div>
          )}
        </div>
        <form
          className="w-fullp-10 flex justify-center p-4 w-[70%]"
          onSubmit={handleChatSubmit}
        >
          <div className="border border-[rgba(178,178,238,0.1)] px-8 py-6 rounded-lg w-[80%] flex justify-between">
            <input
              type="text"
              className="bg-transparent outline-0 border-0 text-white"
              placeholder="type..."
              name="message"
            />
            <button
              className="text-blue-300"
              onClick={() => createChatSession("hello")}
            >
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
