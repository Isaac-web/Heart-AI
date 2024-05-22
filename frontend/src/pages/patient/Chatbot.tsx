import { useAppStore } from '@/store';
import { DeleteSharp, Send, WarningAmber } from '@mui/icons-material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import LoadingChatBubble from '@/components/LoadingChatBubble';
import FormTextfield from '@/components/form/FormTextfield';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import Alert from '@/components/Alert';
import { NewChatSessionFormData } from '@/types';
import { shortenString } from '@/utils/stringUtils';
import CircularProgress from '@/components/CircularProgress';
import appLogo from '../../assets/images/logo-white.png';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [showChatSessionInput, setShowChatSessionInput] = useState(false);
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const store = useAppStore();
  const chatMessagesContainerRef = useRef<HTMLDivElement | null>(null);
  const chatSessions = store.entities.chatSessions;
  const chatMessages = store.entities.chatMessages;

  const getChatSessionMedicalReport = () => {
    const currentChatSession = chatSessions.data.filter(
      (ch) => ch._id === sessionId
    )[0];
    if (currentChatSession && currentChatSession.medicalReport)
      return currentChatSession.medicalReport;
  };

  useEffect(() => {
    chatSessions.fetchChatSession();
    if (sessionId) chatMessages.fetchChatMessages(sessionId);
  }, [sessionId]);

  useEffect(() => {
    handleScrollChats();
  }, [chatMessages.data.length]);

  useEffect(() => {
    handleScrollChats();
  }, [chatMessages.data.length]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const getChatError = () => {
    return store.getError(store.entities.chatMessages.sendChatMessage.name);
  };

  const getCreateChatSessionError = () => {
    return store.getError(store.entities.chatSessions.createChatSession.name);
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
    if (!error) handleScrollChats();
  };

  const handleCreateChatSession = async (data: NewChatSessionFormData) => {
    const chatSession = await chatSessions.createChatSession(data);
    const error = getCreateChatSessionError();
    if (!error) {
      setShowChatSessionInput(false);
      if (chatSession) navigate(`/portal/patient/chatbot/${chatSession?._id}`);
    }
  };

  const getDeleteChatSessionError = () => {
    return store.getError(store.entities.chatSessions.deleteChatSession.name);
  };

  const handleDeleteChatSession = async (id: string) => {
    await chatSessions.deleteChatSession(id);
    const error = getDeleteChatSessionError();
    if (!error) {
      if (id === sessionId) {
        navigate('/portal/patient/chatbot', { replace: true });
      }
    }
  };

  return (
    <div className="flex h-screen z-10">
      <div className="bg-black/50 text-white w-[17vw] py-4 flex flex-col justify-between gap-5">
        <div className="px-2">
          <button
            className="btn w-full"
            onClick={() => setShowChatSessionInput((prev) => !prev)}
          >
            New Chat
          </button>
          {showChatSessionInput && (
            <div>
              <Form
                onSubmit={handleCreateChatSession}
                initialValues={{
                  title: `New Chat ${chatSessions.data.length + 1}`,
                }}
                validationSchema={null}
              >
                <div>
                  <FormTextfield name="title" />
                </div>
                <div>
                  <FormSubmitButton>Add Chat Session</FormSubmitButton>
                </div>
              </Form>
            </div>
          )}
        </div>

        <div className=" grow flex flex-col gap-7 px-5">
          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">Previous 40 days</small>
            <div>
              {chatSessions.loading && (
                <div className="flex items-center justify-center gap-1 dark:text-white/40">
                  <div className="mt-1">
                    <CircularProgress />
                  </div>
                  <p className="text-sm text-center">Loading...</p>
                </div>
              )}

              {chatSessions.data.map((item) => (
                <Link to={`/portal/patient/chatbot/${item._id}`} key={item._id}>
                  <div
                    className={`py-2 hover:bg-white/5 cursor-pointer px-4 rounded-lg flex justify-between mb-1 ${
                      item._id === sessionId ? 'bg-white/5' : 'bg-white/0'
                    }`}
                  >
                    <p className="text-sm">{shortenString(item.title, 20)}</p>
                    <button
                      className="opacity-5 hover:opacity-75"
                      onClick={() => handleDeleteChatSession(item._id)}
                    >
                      <DeleteSharp style={{ fontSize: '1em' }} />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {sessionId && (
        <>
          <div
            className="grow flex justify-center max-h-screen overflow-y-auto relative"
            ref={chatMessagesContainerRef}
          >
            <div className="px-4 lg:px-0 py-5 flex flex-col justify-between w-full max-w-xl margin-x-auto">
              {getChatSessionMedicalReport() ? (
                <div className="py-5 opacity-90">
                  <div className="p-5 bg-base-200 rounded-xl">
                    <div className="flex gap-2 mb-3">
                      <img src={appLogo} className="w-14 h-14 -mt-3" />
                      <p className="text-xs mb-4">
                        This is the beginning of a new chat with HeartAI Bot a
                        medical report with id:{' '}
                        {getChatSessionMedicalReport()?._id}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 text-xs">
                      <div>
                        Age of Patient:{' '}
                        <span className="text-primary/90">
                          {getChatSessionMedicalReport()?.details?.age}
                        </span>
                      </div>
                      <div>
                        Maximum Heart Rate:{' '}
                        <span className="text-secondary/90">
                          {
                            getChatSessionMedicalReport()?.details
                              ?.maximumHeartRate
                          }
                        </span>
                      </div>
                      <div>
                        Serum Cholesterol:{' '}
                        <span className="text-accent/90">
                          {
                            getChatSessionMedicalReport()?.details
                              ?.serumColesterol
                          }{' '}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-base-200 rounded-s-xl flex justify-center items-center gap-2">
                  <WarningAmber className="text-warning/70" />
                  <p className="text-center text-xs">
                    Please note This chat is not linked to any health report
                  </p>
                </div>
              )}

              <div className="pb-32">
                {chatMessages.data.map((chat, index) => (
                  <ChatBubble
                    message={chat.text}
                    type={chat.user ? 'right' : 'left'}
                    key={index}
                    time={chat.createdAt}
                  />
                ))}

                {getChatError() && (
                  <div className="px-10 py-4">
                    <Alert
                      title="Error"
                      message={getChatError()?.message as string}
                    />
                  </div>
                )}
                {chatMessages.isPending && (
                  <LoadingChatBubble text="typing..." />
                )}
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
        </>
      )}
    </div>
  );
}
