// useChatStore.ts
import {create} from 'zustand';
import { axiosInstance } from '../utils/axios';
import { ChatState, User, Message } from '../types/types'

const useChatStore = create<ChatState>((set) => ({
  users: [],
  messages: [],
  loading: false,
  error: null,
  selectedUser : null,
  setSelectedUser(user) {
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
      set({ messages: response.data.data , loading: false });
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
  

  resetError: () => set({ error: null })
}));

export default useChatStore;