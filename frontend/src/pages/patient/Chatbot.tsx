import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";

export default function Chatbot() {
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [chats, setChats] = useState<
    {
      user: string;
      message: string;
      type: string;
      img: string;
      time: string;
    }[]
  >([]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setChats((prevChats) => {
        return [
          ...prevChats,
          {
            user: "bot",
            message: "Hello, how can I help you?",
            type: "chat-start",
            img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            time: "11:45",
          },
        ];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [hasBeenUpdated]);

  return (
    <div className="flex h-screen">
      <div className="bg-black/50 text-white w-[17vw] py-4 flex flex-col justify-between gap-5">
        <div className="px-2">
          <button className="btn w-full">New Chat</button>
        </div>

        <div className=" grow flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">Previous 40 days</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4 truncate">
                photosynthesis...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                energy is the...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                sharingan eye...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                salamander grows on trees...
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">April</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                wordl trade center...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                donald trump criticizes...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                karen white...
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                solomon grandy...
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center px-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span>SY</span>
            </div>
          </div>
          <p>Sausage Yam</p>
        </div>
      </div>
      <div className="grow flex justify-center">
        <div className="px-4 py-8 flex flex-col justify-between w-[65%] margin-x-auto">
          <div>
            {chats.map((chat, index) => (
              <ChatBubble
                user={chat.user}
                message={chat.message}
                type={chat.type}
                img={chat.img}
                key={index}
                time={chat.time}
              />
            ))}
          </div>
          <div className="flex justify-center bg-black/25 items-center">
            <textarea
              className="textarea w-full  text-white resize-none outline-0 focus:ring-0 focus:outline-0"
              placeholder="type here..."
            ></textarea>
            <p
              className="p-2 text-white"
              onClick={() => {
                setChats([
                  ...chats,
                  {
                    user: "you",
                    message: "hello",
                    img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
                    type: "chat-end",
                    time: "12:56",
                  },
                ]);

                setHasBeenUpdated(!hasBeenUpdated);
              }}
            >
              send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
