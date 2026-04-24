import { create } from "zustand";

interface ThemeState {
  isDay: boolean;
  toggleTheme: () => void;
  setDay: (value: boolean) => void; 
}
export const useThemeStore = create<ThemeState>((set) => ({
  isDay: true,
  toggleTheme: () => set((state) => ({ isDay: !state.isDay })),
  setDay: (value) => set({ isDay: value }),
}));