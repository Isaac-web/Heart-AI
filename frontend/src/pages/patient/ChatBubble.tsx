interface ChatBubbleProps {
  message: string;
  type: 'left' | 'right';
  time: string;
}

const ChatBubble = ({
  message,
  type,
  time = Date.now().toString(),
}: ChatBubbleProps) => {
  return (
    <div className={`chat chat-${type === 'left' ? 'start' : 'end'} max-w-xl`}>
      <div className="chat-bubble">
        <div>{message}</div>
        <div className={`chat-footer opacity-50 text-xs`}>
          <p className={`${type === 'right' ? 'text-right' : 'text-left'}`}>
            {new Date(time).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
