import { useEffect } from "react";
import useChatStore from "../../store/useChat";
import SideBar from "../../components/SideBar";
import ChatArea from "../../components/ChatArea";
import { User } from "../../types/types";

const Home = () => {

  const {
    users,
    loading,
    fetchUsers,
    fetchMessages,
    setSelectedUser
  } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleContactClick = (user : User) => {
    fetchMessages(user._id);
    setSelectedUser(user);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 w-full max-w-6xl p-6 rounded-lg shadow-md bg-base-100 h-[90vh]">
        <SideBar users={users} loading={loading} handleContactClick={handleContactClick} />
        <ChatArea />
      </div>
    </div>
  );
};

export default Home;