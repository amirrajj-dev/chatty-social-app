import { create } from 'zustand';
import { User } from '../types/types';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client'; // Importing Socket type

const BACKEND_URL = 'http://localhost:5000';

interface ResponseI {
  message?: string;
  success?: boolean;
  response?: {
    data: {
      message: string;
    };
  };
}

interface AuthError {
  response: {
    data: {
      message: string;
    }
  }
}

interface AuthI {
  authUser: User | null;
  onlineUsers: string[];
  socket: Socket | null;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isSigningUp: boolean;
  updateProfile: (formData: FormData) => Promise<void>;
  login: (user: Pick<User, 'email' | 'password'>) => Promise<ResponseI>;
  logout: () => Promise<void>;
  signup: (user: Pick<User, 'email' | 'password' | 'fullname' | 'gender'>) => Promise<ResponseI>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuth = create<AuthI>((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  login: async (user) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', user);
      if (res.data.success) {
        set({ authUser: res.data.user });
        toast.success('Logged in successfully', {
          position: 'bottom-center',
        });
        get().connectSocket();
      }
      set({ isLoggingIn: false });
      return res.data;
    } catch (error) {
      const err = error as AuthError;
      set({ isLoggingIn: false });
      toast.error(err.response.data.message);
      return err.response.data;
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res.data.success) {
        set({ authUser: null });
        toast.success('Logged out successfully');
        get().disconnectSocket();
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      const err = error as AuthError;
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },
  signup: async (user) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', user);
      if (res.data.success) {
        set({ authUser: res.data.user });
        toast.success('Signed up successfully', {
          position: 'bottom-center',
        });
        get().connectSocket();
      }
      set({ isSigningUp: false });
      return res.data;
    } catch (error) {
      const err = error as AuthError;
      set({ isSigningUp: false });
      toast.error(err.response.data.message);
      return err.response.data;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check-auth');
      if (res.data.user) {
        set({ authUser: res.data.user });
        get().connectSocket();
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  updateProfile: async (formData) => {
    try {
      const res = await axiosInstance.post('/auth/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        set({ authUser: res.data.user });
        toast.success('Profile updated successfully', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      const err = error as AuthError;
      toast.error(err.response.data.message);
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BACKEND_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    socket.on('getOnlineUsers', (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
    set({ socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket!.disconnect();
  },
}));