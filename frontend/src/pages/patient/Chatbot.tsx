import { useAppStore } from '@/store';
import { Send } from '@mui/icons-material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import LoadingChatBubble from '@/components/LoadingChatBubble';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const { sessionId } = useParams();
  const store = useAppStore();
  const chatMessagesContainerRef = useRef<HTMLDivElement | null>(null);
  const chatSessions = store.entities.chatSessions;
  const chatMessages = store.entities.chatMessages;

  useEffect(() => {
    chatSessions.fetchChatSession();
    if (sessionId) chatMessages.fetchChatMessages(sessionId);
  }, [sessionId]);

  useEffect(() => {
    handleScrollChats();
  }, [chatMessages.data.length]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const getChatError = () => {
    return store.getError(store.entities.chatMessages.sendChatMessage.name);
  };

  const handleScrollChats = () => {
    const chatMessagesContainer = chatMessagesContainerRef.current;

    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const messageObject = {
      chatSessionId: sessionId as string,
      text: message,
      context: {},
    };

    setMessage('');
    handleScrollChats();

    if (sessionId && message) await chatMessages.sendChatMessage(messageObject);

    const error = getChatError();
    if (!error) {
      handleScrollChats();
      return console.log('Hurrayy...');
    } else console.log(error);
  };

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
                <Link
                  to={`/dashboard/patient/chatbot/${item._id}`}
                  key={item._id}
                >
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

      <div
        className="grow flex justify-center max-h-screen overflow-y-auto"
        ref={chatMessagesContainerRef}
      >
        <div className="px-4 lg:px-0 py-5 flex flex-col justify-between w-full max-w-xl margin-x-auto">
          <div className="pb-32">
            {chatMessages.data.map((chat, index) => (
              <ChatBubble
                message={chat.text}
                type={chat.user ? 'right' : 'left'}
                key={index}
                time={chat.createdAt}
              />
            ))}

            {chatMessages.isPending && <LoadingChatBubble text="typing..." />}
          </div>
        </div>

        <div className="flex justify-center  items-center px-4 lg:px-0 py-5 fixed bottom-0 w-full max-w-xl p-5">
          <form
            onSubmit={handleSubmit}
            className="w-full flex items-center h-20 px-1 rounded-xl relative"
          >
            <textarea
              value={message}
              className="textarea w-full textarea-bordered pr-20"
              placeholder="Type your message..."
              onChange={handleChange}
            />
            <button
              className="btn btn-primary rounded-full absolute right-5"
              type="submit"
            >
              <Send />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
