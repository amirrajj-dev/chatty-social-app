import { create } from "zustand";
import { IUser } from "../types/types";
import { axiosInstance } from "../utils/axios";

interface AuthI {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  checkAuth : ()=>void
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (user: Pick<IUser, "email" | "password">) => void;
  logout: () => void;
  signup: (user: Omit<IUser, "createdAt" | "updatedAt" | "profilePic">) => void;
}

export const useAuth = create<AuthI>((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isLoggingOut: false,
  login: (user) => {
   
  },
  logout: () => {
    
  },
  signup: (user) => {
    
  },
  checkAuth : async ()=>{
    set({isCheckingAuth:true})
    try {
        const res = await axiosInstance.get('/auth/check')
        set({authUser:res.data.user, isCheckingAuth:false})
    } catch (error) {
        console.error(error);
        set({authUser : null})
        set({isCheckingAuth:false})
    }finally{
        set({isCheckingAuth:false})
    }
  }
}));