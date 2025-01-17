import { User } from "../types/types";

const ChatHeader = ({ selectedUser } : {selectedUser : User}) => {
  return (
    <div className="bg-base-content text-base-300 p-2 rounded-md shadow-lg flex items-center gap-4 font-bold mb-6">
      <div className="flex-shrink-0">
        <img
          src={selectedUser.profilePic}
          className="w-12 h-12 rounded-full object-cover"
          alt={`${selectedUser.fullname} profile`}
        />
      </div>
      <div>
        <h2 className="text-3xl">{selectedUser.fullname}</h2>
      </div>
    </div>
  );
};

export default ChatHeader;