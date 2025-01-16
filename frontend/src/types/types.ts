// types.ts
export interface User {
  _id: string;
  email: string;
  fullname: string;
  profilePic: string;
  gender?: 'male' | 'female';
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content?: string;
  image?: string;
  createdAt: string;
}

export interface ChatState {
  users: User[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (userId: string, message: Omit<Message, '_id' | 'sender' | 'receiver' | 'createdAt'>) => Promise<void>;
  resetError: () => void;
}