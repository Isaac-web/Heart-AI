interface LoadingChatBubble {
  text?: string;
}

const LoadingChatBubble = ({ text }: LoadingChatBubble) => {
  return (
    <div>
      <div className={`chat chat-start`}>
        <div className="chat-bubble w-32 flex flex-col justify-center items-start">
          <div>
            <span className="loading loading-dots loading-md ml-1"></span>
          </div>
          {text && (
            <div className="chat-footer opacity-50 text-xs ml-1 -mt-3">
              {text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingChatBubble;
