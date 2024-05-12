import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Chatbot() {
  const store = useAppStore();
  const chatSessions = store.entities.chatSessions;
  const chatMessages = store.entities.chatMessages;

  useEffect(() => {
    // chatMessages.sendChatMessage({
    //   chatSessionId: '663df8bd0d1c12bd34a4a777',
    //   text: 'Hello World...',
    //   context: {},
    // });
    chatSessions.fetchChatSession();
    // chatSessions.createChatSession({ title: 'Chat Session 2' });
  }, []);

  console.log(chatSessions.data);

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
              {chatSessions.data.map((item) => (
                <Link to={`/dashboard/patient/chatbot/${item._id}`}>
                  <p className="py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                    {item.title}
                  </p>
                </Link>
              ))}
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
            {/* {chats.map((chat, index) => (
              <ChatBubble
                user={chat.user}
                message={chat.message}
                type={chat.type}
                img={chat.img}
                key={index}
                time={chat.time}
              />
            ))} */}
          </div>
          <div className="flex justify-center bg-black/25 items-center">
            <textarea
              className="textarea w-full  text-white resize-none outline-0 focus:ring-0 focus:outline-0"
              placeholder="type here..."
            ></textarea>
            {/* <p
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
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
