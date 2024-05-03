import LoadingIndicator from '@/components/LoadingIndicator';
import { useAppStore } from '@/hooks/store';

const ChatThread = () => {
  const store = useAppStore();

  return store.loadingChatMessages ? (
    <LoadingIndicator />
  ) : (
    <div className="w-full flex flex-col gap-5">
      {store.chatMessages.map((c) => (
        <div
          className={`px-4 py-6 rounded-md w-[60%] max-w-[60%] bg-[rgba(178,178,238,0.4)] ${
            c.user ? 'self-end' : 'self-start'
          }`}
        >
          {c.text}
        </div>
      ))}

      {/* <div className="px-4 py-6 rounded-md w-[30%] max-w-[60%] bg-[rgba(178,178,238,0.1)]">
        hello
      </div> */}
      <div></div>
      <div></div>
    </div>
  );
};

export default ChatThread;
