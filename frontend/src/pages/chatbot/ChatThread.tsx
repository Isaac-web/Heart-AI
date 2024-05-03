import LoadingIndicator from '@/components/LoadingIndicator';
import { useAppStore } from '@/hooks/store';
import { alpha, useTheme } from '@mui/material';

const ChatThread = () => {
  const theme = useTheme();
  const store = useAppStore();

  return store.loadingChatMessages ? (
    <LoadingIndicator />
  ) : (
    <div className="w-full flex flex-col gap-5">
      {store.chatMessages.map((c) => (
        <div
          key={c._id}
          className={`px-4 py-6 rounded-md w-[60%] max-w-[60%] bg-[rgba(178,178,238,0.4)] ${
            c.user ? 'self-end' : 'self-start'
          }`}
          style={{
            backgroundColor: !c.user
              ? alpha(theme.palette.primary.light, 0.1)
              : 'bg-[rgba(178,178,238, 0.2)]',
          }}
        >
          {c.text}
        </div>
      ))}
      {store.creatingChatMessages ? <>Loading</> : null}
    </div>
  );
};

export default ChatThread;
