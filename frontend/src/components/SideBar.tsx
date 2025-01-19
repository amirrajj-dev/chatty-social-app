import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { User } from "../types/types";
import { useAuth } from "../store/useAuth";

interface SideBarProps {
  users: User[];
  handleContactClick: (user: User) => void;
  loading: boolean;
}

const SideBar = ({ users, handleContactClick, loading }: SideBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false); // State to track the online filter
  const { onlineUsers } = useAuth();

  const filteredContacts = users.filter((user) => {
    const matchesSearchTerm = user.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOnlineFilter = onlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearchTerm && matchesOnlineFilter;
  });

  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-3 bg-neutral p-4 rounded-lg overflow-y-auto">
      <div className="flex flex-col mb-4 gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo/virvo.svg" alt="app logo" className="size-12" />
          <h2 className="text-2xl font-bold text-neutral-content hidden md:block">
            Contacts
          </h2>
        </div>
        <div className="form-control mb-4">
          <label className="cursor-pointer label flex items-center space-x-2">
            <span className="label-text text-neutral-content">
              Online Only
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={onlineOnly} // Bind the state to the checkbox
              onChange={() => setOnlineOnly(!onlineOnly)} // Toggle the state
            />
          </label>
        </div>
        <div className="relative hidden md:block">
          <MdSearch className="absolute left-3 top-3 text-primary" />
          <input
            type="text"
            placeholder="Search contacts"
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ul className="divide-y divide-neutral space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="skeleton size-12 shrink-0 rounded-full"></div>
              <div className="skeleton w-full h-10"></div>
            </div>
          ))
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((user) => (
            <li
              key={user._id}
              className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-primary hover:text-primary-content rounded-lg"
              onClick={() => handleContactClick(user)}
            >
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt={user.fullname}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary transition-transform transform hover:scale-110"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute size-2 rounded-full bg-emerald-400 right-0 bottom-0 animate-pulse"></span>
                )}
              </div>
              <span className="text-lg text-neutral-content">
                {user.fullname}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-neutral-content">
            <p>No contacts found</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;