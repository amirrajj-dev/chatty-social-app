import { create } from "zustand";
import { IUser } from "../types/types";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

interface ResponseI {
  message? : string,
  success? : boolean
}

interface AuthI {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  checkAuth : ()=>void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isSigningUp : boolean;
  login: (user: Pick<IUser, "email" | "password">) => void;
  logout: () => void;
  signup: (user: Pick<IUser , 'email' | 'password' | 'fullname' | 'gender'>) => ResponseI;
}


export const useAuth = create<AuthI>((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  login: (user) => {
  },
  logout: async () => {
    set({isLoggingOut : true})
    try {
      const res = await axiosInstance.post('/auth/logout')
      if (res.data.success){
        toast.success('Logged out successfully')
        set({isLoggingOut : false, authUser : null})
      }else{
        toast.error('Failed to log out')
        set({isLoggingOut : false})
      }
    } catch (error) {
      toast.error(error.response.data.message)
      set({isLoggingOut : false})
    }
  },
  signup: async (user) => {
    set({isSigningUp : true});
    try {
      const res = await axiosInstance.post('/auth/signup' , user)
      set({isSigningUp : false});
      return res.data;
    } catch (error: any) {
      set({isSigningUp : false});
      return error
    }finally{
      set({isSigningUp : false});
    }
  },
  checkAuth: async () => {
    set({isCheckingAuth:true});
    try {
        const res = await axiosInstance.get('/auth/check-auth');
        set({authUser: res.data.user, isCheckingAuth:false});
    } catch (error : any) {
        set({authUser: null});
        set({isCheckingAuth:false});
    }finally{
        set({isCheckingAuth:false});
    }
  }
}));