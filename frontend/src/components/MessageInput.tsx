import React, { useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { AiOutlinePicture, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../store/useAuth";

interface MessageInputProps {
  handleSendMessage: (text: string, image: File | null) => void;
  handleSelectEmoji: (event: EmojiClickData) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  handleSendMessage,
  handleSelectEmoji,
  handleFileChange,
  showEmojiPicker,
  setShowEmojiPicker,
  message,
  setMessage,
  image,
  setImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authUser } = useAuth();
  const profilePic = authUser!.profilePic; // Replace with actual profile pic path

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage(message, image);
      setMessage("");
      setImage(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="mt-4 flex flex-col space-y-2">
      {message.trim() !== "" || image ? (
        <div className="chat chat-start mb-2">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={profilePic} alt="User Profile" />
            </div>
          </div>
          <div className="chat-bubble relative bg-primary">
            {image && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="rounded-lg shadow-md max-w-xs"
                />
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition duration-200"
                  onClick={removeImage}
                >
                  <AiOutlineClose />
                </button>
              </div>
            )}
            {message && (
              <div className="text-sm text-white flex flex-col mt-1">
                <span>{message}</span>
                <span className="text-xs">
                  {new Date(Date.now()).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message"
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleEnterPress}
        />
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button className="btn btn-success" onClick={handleImageClick}>
          <AiOutlinePicture />
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleSendMessage(message, image)}
        >
          <IoSend />
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaRegSmile />
        </button>
      </div>
      {showEmojiPicker && (
        <div className="emoji-picker absolute bottom-20 right-4 z-10">
          <EmojiPicker onEmojiClick={handleSelectEmoji} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
