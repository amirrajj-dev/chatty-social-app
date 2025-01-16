

const NoSelectedChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-base-content">
      <img src="/logo/virvo.svg" alt="app logo" className="animate-bounce size-32" />
      <h1 className="text-3xl font-bold">Welcome to Chatty</h1>
      <p className="text-base-content text-xl mt-2">
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default NoSelectedChat;