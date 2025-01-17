import React, { useEffect, useRef } from "react";
import { useAuth } from "../store/useAuth";
import { Message } from "../types/types";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const { authUser } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageContainerRef}
      className="flex-1 p-4 overflow-y-auto  rounded-lg shadow-inner"
    >
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div
                className={`chat ${
                  index % 2 === 0 ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full skeleton bg-gray-300"></div>
                </div>
                <div className="chat-bubble skeleton bg-gray-300 h-12 w-1/4"></div>
              </div>
            </div>
          ))
        : messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.sender._id === authUser._id ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      msg.sender._id === authUser._id
                        ? authUser.profilePic
                        : msg.sender.profilePic
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${
                  msg.sender._id === authUser._id
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Sent"
                    className="mt-2 max-w-xs rounded-lg shadow-sm w-60"
                  />
                )}
                <div className="chat-footer text-xs mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MessageList;
