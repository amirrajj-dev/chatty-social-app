// types.ts
export interface User {
  _id: string;
  email: string;
  fullname: string;
  password : string;
  profilePic: string;
  gender?: 'male' | 'female';
  createdAt : Date
}

export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  content?: string;
  image?: string | null;
  createdAt: string;
}

export interface ChatState {
  users: User[];
  messages: Message[];
  loading: boolean;
  selectedUser : User | null;
  setSelectedUser : (user : User)=>void
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (userId: string, message: FormData) => Promise<void>;
  resetError: () => void;
  subscribeToMessages : ()=>void
  unsubscribeFromMessages : () => void
}