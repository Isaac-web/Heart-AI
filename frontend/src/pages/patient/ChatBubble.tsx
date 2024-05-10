interface ChatBubbleProps {
  user: string;
  message: string;
  type: string;
  time: string;
  img: string;
}

const ChatBubble = ({ user, message, type, time, img }: ChatBubbleProps) => {
  return (
    <div className={`chat ${type}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <div className="chat-header">
        {user}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default ChatBubble;
