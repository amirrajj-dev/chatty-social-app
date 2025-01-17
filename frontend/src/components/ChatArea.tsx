import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessagesList";
import MessageInput from "./MessageInput";
import NoSelectedChat from "./NoSelectedChat";
import useChatStore from "../store/useChat";
import { EmojiClickData } from "emoji-picker-react";

const ChatArea: React.FC = () => {
  const { sendMessage, messages, selectedUser, loading, fetchMessages } = useChatStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSendMessage = async (text: string, image: File | null) => {
    console.log(image);
    if ((text.trim() !== "" || image) && selectedUser) {
      const formData = new FormData();
      formData.append("text", text);
      if (image) {
        formData.append("messageImage", image);
      }
      await sendMessage(selectedUser._id, formData);
      fetchMessages(selectedUser._id);
      setMessage("");
      setImage(null);
    }
  };

  const handleSelectEmoji = (event: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-9 bg-base-100 px-2 rounded-lg shadow-inner flex flex-col overflow-y-hidden">
      {selectedUser ? (
        <>
          <ChatHeader selectedUser={selectedUser} />
          <MessageList messages={messages} loading={loading} />
          <MessageInput
            handleSendMessage={handleSendMessage}
            handleSelectEmoji={handleSelectEmoji}
            handleFileChange={handleFileChange}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            message={message}
            setMessage={setMessage}
            image={image} // Pass the image prop
            setImage={setImage} // Pass the setImage prop
          />
        </>
      ) : (
        <NoSelectedChat />
      )}
    </div>
  );
};

export default ChatArea;