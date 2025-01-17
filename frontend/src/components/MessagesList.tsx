// MessageList.tsx
import React, { useEffect, useRef } from "react";
import { useAuth } from "../store/useAuth";
import { Message, User } from "../types/types";

interface MessagesListProps {
    messages: Message[];
    selectedUser : User;
    loading : boolean
}

const MessageList = ({ messages, loading, selectedUser } : MessagesListProps) => {
  const { authUser } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageContainerRef} className="flex-1 p-4 overflow-y-auto">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              {index % 2 === 0 ? (
                <div className="flex items-start gap-2 mb-4">
                  <div className="skeleton size-12 shrink-0 rounded-full"></div>
                  <div className="skeleton w-1/4 h-12 rounded-lg"></div>
                </div>
              ) : (
                <div className="flex items-end gap-2 justify-end mb-4">
                  <div className="skeleton w-1/4 h-12 rounded-lg"></div>
                  <div className="skeleton size-12 shrink-0 rounded-full"></div>
                </div>
              )}
            </div>
          ))
        : messages.map((msg, index) => (
            <div key={index} className={`flex gap-2 my-2 ${msg.sender._id === authUser._id ? "justify-start" : "justify-end"}`}>
              {msg.sender._id === authUser._id && (
                <img
                  src={authUser.profilePic}
                  alt="Sender Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`chat-bubble p-3 flex flex-col gap-2 rounded-xl max-w-xs shadow-lg ${
                  msg.sender._id === authUser._id ? "bg-primary text-white mr-auto" : "bg-secondary text-white"
                }`}
              >
                {msg.content}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Sent"
                    className="mt-2 max-w-xs rounded-lg shadow-sm w-60"
                  />
                )}
                <div className="text-xs text-gray-300 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {msg.sender._id !== authUser._id && (
                <img
                  src={msg.sender.profilePic}
                  alt="Receiver Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          ))}
    </div>
  );
};

export default MessageList;