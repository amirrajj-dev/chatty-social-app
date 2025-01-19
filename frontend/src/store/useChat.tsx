import { create } from "zustand";
import { useAuth } from "./useAuth";
import { axiosInstance } from "../utils/axios";
import { ChatState, Message, User } from "../types/types";

// useChatStore.ts
const useChatStore = create<ChatState>((set, get) => ({
  users: [],
  messages: [],
  loading: false,
  error: null,
  selectedUser: null,

  subscribeToMessages: () => {
    const selectedUser = get().selectedUser;
    if (!selectedUser) return;
    const socket = useAuth.getState().socket;
    socket.on('newMessage', (message) => {
      if (message.sender._id !== selectedUser._id) return
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    socket.off('newMessage');
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get<{ data: User[] }>('/messages/users');
      set({ users: response.data.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchMessages: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get<{ data: Message[] }>(`/messages/${userId}/messages`);
      set({ messages: response.data.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  sendMessage: async (userId: string, formData: FormData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post<{ data: Message }>(
        `/messages/send-message/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      set((state) => ({
        messages: [...state.messages, response.data.data],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resetError: () => set({ error: null }),
}));

export default useChatStore;