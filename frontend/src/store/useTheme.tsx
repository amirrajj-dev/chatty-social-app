import { create } from "zustand";

interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useTheme = create<Theme>((set) => ({
  theme: localStorage.getItem('chatty-theme') || 'retro',
  setTheme: (theme) => {
    localStorage.setItem('chatty-theme', theme);
    document.documentElement.setAttribute('data-theme', theme); // Set the theme attribute
    set({ theme });
  },
}));