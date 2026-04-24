import { create } from "zustand";
import { persist } from "zustand/middleware";
interface WeatherStore {
  city: string;
  recentCities: string[];
  setCity: (city: string) => void;
  addRecentCity: (city: string) => void;
}
export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      city: 'Ashgabat',
      recentCities: ['Ashgabat','Turkmenbashy','Mary','Dashoguz' , 'Turkmenabat','Ahal',], 
      setCity: (city) => set({ city }),
      addRecentCity: (newCity) => set((state) => ({
        recentCities: [newCity, ...state.recentCities.filter(c => c !== newCity)].slice(0, 5)
      })),
    }),
    { name: 'weather-storage' }
  )
);