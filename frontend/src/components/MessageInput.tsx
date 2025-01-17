import React, { useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";

interface MessageInputProps {
  handleSendMessage: (text: string, image: File | null) => void;
  handleSelectEmoji: (event: EmojiClickData) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  image: File | null; // Add image prop
  setImage: React.Dispatch<React.SetStateAction<File | null>>; // Add setImage prop
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

  return (
    <div className="mt-4 flex items-center space-x-2">
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
      <button className="btn btn-primary" onClick={() => handleSendMessage(message, image)}>
        <IoSend />
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <FaRegSmile />
      </button>
      {showEmojiPicker && (
        <div className="emoji-picker absolute bottom-20 right-4">
          <EmojiPicker onEmojiClick={handleSelectEmoji} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;