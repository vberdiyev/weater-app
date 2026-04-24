import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  units: 'metric' | 'imperial';
  timeFormat: '12h' | '24h';
  setUnits: (units: 'metric' | 'imperial') => void;
  toggleTimeFormat: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      units: 'metric',
      timeFormat: '24h',
      setUnits: (units) => set({ units }),
      toggleTimeFormat: () => set((state) => ({ 
        timeFormat: state.timeFormat === '24h' ? '12h' : '24h' 
      })),
    }),
    { name: 'weather-settings' }
  )
);