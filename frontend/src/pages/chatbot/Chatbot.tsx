import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import MedicalSvg from './MedicalSvg';
import ChatThread from './ChatThread';
import { useAppStore } from '@/hooks/store';
import LoadingIndicator from '@/components/LoadingIndicator';
import { enqueueSnackbar } from 'notistack';
import { fetchChatMessages } from '@/api/chatMessages';
import { useNavigate, useParams } from 'react-router-dom';

const Chatbot = () => {
  const [showInput, setShowInput] = useState(false);
  const store = useAppStore();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const checkError = () => {
    const error = store.getError(store.createChatSession.name);
    return error;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent from from reloading the page

    if (!title.trim())
      enqueueSnackbar('Title cannot be empty.', { variant: 'error' });
    //show snackbar if title is emtpy

    await store.createChatSession({ title });
    //create and store chat session in the app data store

    if (checkError()) {
      enqueueSnackbar(checkError()?.message, { variant: 'error' });
      return;
    }
    enqueueSnackbar('A new chat session was created.', { variant: 'success' });
    setShowInput(false);
  };

  const loadChatSessions = async () => {
    await store.fetchChatSessions();
    const error = store.getError(store.fetchChatSessions.name);
    if (store.getError(store.fetchChatSessions.name))
      enqueueSnackbar(error?.message);
  };

  const loadChatMessages = async () => {
    if (sessionId) {
      store.fetchChatMessages(sessionId);
      const error = store.getError(store.fetchChatMessages.name);
      if (error) enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    loadChatSessions();
  }, []);

  useEffect(() => {
    loadChatMessages();
  }, [sessionId]);

  // console.log(store.chatSessions);

  return (
    <div className="flex bg-[#111] w-screen h-screen">
      <div className="bg-[rgba(178,178,238,0.03)] h-screen text-white w-[16vw]">
        <div>
          <div
            className="w-full py-4 flex justify-between px-6 items-center hover:bg-[rgba(178,178,238,0.1)] cursor-pointer"
            onClick={() => setShowInput(!showInput)}
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

          <div>
            <form onSubmit={handleSubmit}>
              {!showInput ? null : store.creatingChatSession ? (
                <div className="py-5 px-2">
                  <LoadingIndicator />
                </div>
              ) : (
                <input
                  className="w-full py-2 px-3 text-gray-600"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          {store.loadingChatSession ? (
            <LoadingIndicator />
          ) : (
            store.chatSessions.map((m) => (
              <div
                className="px-3 py-2 rounded-lg bg-white/10 cursor-pointer"
                onClick={() => navigate(`/chatbot/${m._id}`)}
              >
                {m.title}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between grow items-center">
        <div className="grow text-white py-10 self-start mx-auto w-[55%]">
          {sessionId ? (
            <ChatThread />
          ) : (
            <div className="flex flex-col items-center">
              <MedicalSvg />
              <h1 className="text-5xl opacity-30 py-5">CardioBot</h1>
            </div>
          )}
        </div>
        <div className="w-fullp-10 flex justify-center p-4 w-[70%]">
          <div className="border border-[rgba(178,178,238,0.1)] px-8 py-6 rounded-lg w-[80%] flex justify-between">
            <input
              type="text"
              className="bg-transparent outline-0 border-0 text-white"
              placeholder="type..."
            />
            <button className="text-blue-300">send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
