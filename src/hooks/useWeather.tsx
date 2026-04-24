import { useQuery } from "@tanstack/react-query";
import { useWeatherStore } from "../store/useWeatherStore";
import { useSettingsStore } from "../store/useSettingsStore";

const API_KEY = '0b0c3ad8551a708aeb564023d63e06ac';

export const useWeather = () => {
  const city = useWeatherStore((state) => state.city);
  const units = useSettingsStore((state) => state.units);

  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('City not found');
      return res.json();
    },
    enabled: city.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};