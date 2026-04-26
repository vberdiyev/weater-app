import { useState, useRef, useEffect } from 'react';
import { 
  Moon, Sun, Thermometer, Droplet, Wind, Search, MapPin, 
  Settings as SettingsIcon, Gauge, Eye, Cloud 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { useWeatherStore } from '../store/useWeatherStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useWeather } from '../hooks/useWeather';
import { useOnClickOutside } from 'usehooks-ts';

function Page() {
  const { isDay, toggleTheme, setDay } = useThemeStore();
  const { city, setCity, recentCities, addRecentCity } = useWeatherStore();
  const { units } = useSettingsStore();
  const { data, isLoading, isError } = useWeather();

  const [inputValue, setInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef as React.RefObject<HTMLElement>, () => setIsSearchFocused(false));

  useEffect(() => {
    if (data && data.sys) {
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const currentTime = data.dt;
      const isNowDay = currentTime >= sunrise && currentTime < sunset;
      if (isNowDay !== isDay) {
        setDay(isNowDay);
      }
    }
  }, [data, isDay, setDay]);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        setCity(inputValue.trim());
        addRecentCity(inputValue.trim());
        setInputValue('');
        setIsSearchFocused(false);
      }
    }
  };

  const themeWrapper = isDay 
    ? "bg-gradient-to-br from-slate-100 via-blue-100 to-sky-200 text-blue-900/80" 
    : "bg-[#05080a] text-slate-200";
    
  const themeInput = isDay 
    ? "bg-white/50 border-white/60 focus-within:bg-white/80" 
    : "bg-white/5 border-white/10 focus-within:bg-white/10";
    
  const themeCard = isDay 
    ? "bg-white/40 border-white/60 backdrop-blur-xl shadow-sm" 
    : "bg-white/[0.03] border-white/10 backdrop-blur-2xl shadow-2xl";

  const themeAccentText = isDay ? "text-blue-500" : "text-sky-400";
  const themeAccentBg = isDay ? "bg-blue-500/10" : "bg-sky-500/10";
  const themeCircle = isDay ? "bg-white/30 border-white/50" : "bg-sky-500/5 border-white/5";

  const weatherMain = data?.weather[0]?.main || '';
  let conditionLabel = 'Calm';
  let conditionStyle = 'text-current';

  if (weatherMain === 'Rain') {
    conditionLabel = 'Rain';
    conditionStyle = 'text-blue-400';
  } else if (weatherMain === 'Drizzle') {
    conditionLabel = 'Drizzle';
    conditionStyle = 'text-cyan-300';
  } else if (weatherMain === 'Thunderstorm') {
    conditionLabel = 'Storm';
    conditionStyle = 'text-purple-400';
  } else if (weatherMain === 'Snow') {
    conditionLabel = 'Snow';
    conditionStyle = 'text-white';
  } else if (weatherMain === 'Clear') {
    conditionLabel = 'Clear';
    conditionStyle = 'text-yellow-400';
  } else if (weatherMain === 'Clouds') {
    conditionLabel = 'Cloudy';
    conditionStyle = 'text-slate-300';
  } else if (weatherMain === 'Mist' || weatherMain === 'Fog') {
    conditionLabel = 'Fog';
    conditionStyle = 'text-gray-300';
  }

  const visibilityInKm = data ? (data.visibility / 1000).toFixed(1) + ' km' : '...';
  const unitSymbol = units === 'metric' ? '°C' : '°F';

return (
    <div className={`min-h-screen transition-colors duration-1000 ${themeWrapper}`}>
      <header 
        className={`sticky top-0 z-50 px-5 pt-5 pb-3 border-b transition-colors ${
          isDay 
            ? "bg-slate-100/80 border-blue-900/5" 
            : "bg-[#05080a]/80 border-white/5"
        }`} 
        ref={searchRef}
      >
        <div className="max-w-xl mx-auto relative">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl flex-1 border transition-all ${themeInput}`}>
              <Search size={18} className="opacity-40" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search city..."
                className="bg-transparent border-none outline-none w-full placeholder:text-current/30 text-base"
              />
            </div>
            <Link to="/settings" className={`p-3 rounded-2xl border ${themeInput}`}>
              <SettingsIcon size={22} className="opacity-70" />
            </Link>
          </div>

          {isSearchFocused && recentCities.length > 0 && (
            <div className={`absolute top-16 left-0 w-full p-6 rounded-[2rem] border ${themeCard}`}>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30 block mb-4">History</span>
              <div className="flex flex-wrap gap-2">
                {recentCities.map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      setCity(cityName);
                      setIsSearchFocused(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-transform active:scale-95 ${themeAccentBg} ${themeAccentText}`}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-xl mx-auto p-5 pt-2">
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPin size={20} className={`flex-shrink-0 ${themeAccentText}`} />
            <h2 className="text-2xl font-bold truncate">{data?.name || city}</h2>
          </div>
          <button onClick={toggleTheme} className="p-2 transition-transform active:scale-90 flex-shrink-0">
            {isDay ? (
              <Sun size={32} className="text-orange-400 fill-orange-400/10" />
            ) : (
              <Moon size={30} className="text-indigo-200" />
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-8 text-center sm:text-left">
          <div className="w-full sm:w-auto">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter leading-none">
              {isLoading ? '--' : `${Math.round(data?.main?.temp || 0)}${unitSymbol}`}
            </h1>
            <p className="opacity-60 text-lg font-medium mt-2 capitalize">
              {isLoading ? 'Loading...' : data?.weather[0]?.description}
            </p>
          </div>

          <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center border transition-all duration-700 relative flex-shrink-0 ${themeCircle}`}>
            <span className={`text-xl font-bold ${conditionStyle}`}>
              {conditionLabel}
            </span>
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-10 ${isDay ? 'bg-blue-400' : 'bg-sky-500'}`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${themeCard}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${isDay ? 'bg-blue-500/5' : 'bg-white/5'}`}>
              <Wind className="w-5 h-5 text-blue-500" />
            </div>
            <p className="opacity-40 text-[10px] uppercase font-bold tracking-widest mb-1">Wind</p>
            <p className="text-lg sm:text-xl font-bold">{isLoading ? '...' : `${data?.wind?.speed} m/s`}</p>
          </div>

          <div className={`p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${themeCard}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${isDay ? 'bg-blue-500/5' : 'bg-white/5'}`}>
              <Droplet className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="opacity-40 text-[10px] uppercase font-bold tracking-widest mb-1">Humidity</p>
            <p className="text-lg sm:text-xl font-bold">{isLoading ? '...' : `${data?.main?.humidity}%`}</p>
          </div>

          <div className={`p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${themeCard}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${isDay ? 'bg-blue-500/5' : 'bg-white/5'}`}>
              <Thermometer className="w-5 h-5 text-orange-400" />
            </div>
            <p className="opacity-40 text-[10px] uppercase font-bold tracking-widest mb-1">Feels like</p>
            <p className="text-lg sm:text-xl font-bold">{isLoading ? '...' : `${Math.round(data?.main?.feels_like || 0)}${unitSymbol}`}</p>
          </div>

          <div className={`p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border ${themeCard}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${isDay ? 'bg-blue-500/5' : 'bg-white/5'}`}>
              <Cloud className="w-5 h-5 text-slate-400" />
            </div>
            <p className="opacity-40 text-[10px] uppercase font-bold tracking-widest mb-1">Clouds</p>
            <p className="text-lg sm:text-xl font-bold">{isLoading ? '...' : `${data?.clouds?.all}%`}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className={`p-4 rounded-[1.5rem] sm:rounded-[1.8rem] border flex flex-col items-center text-center ${themeCard}`}>
            <Gauge className="w-5 h-5 text-emerald-500 opacity-70 mb-2" />
            <p className="opacity-40 text-[8px] uppercase font-bold mb-1">Pressure</p>
            <p className="text-xs sm:text-sm font-bold">{data?.main?.pressure || '...'}</p>
          </div>
          
          <div className={`p-4 rounded-[1.5rem] sm:rounded-[1.8rem] border flex flex-col items-center text-center ${themeCard}`}>
            <Eye className="w-5 h-5 text-indigo-500 opacity-70 mb-2" />
            <p className="opacity-40 text-[8px] uppercase font-bold mb-1">Visibility</p>
            <p className="text-xs sm:text-sm font-bold">{visibilityInKm}</p>
          </div>

          <div className={`p-4 rounded-[1.5rem] sm:rounded-[1.8rem] border flex flex-col items-center text-center ${themeCard}`}>
            <Sun className="w-5 h-5 text-yellow-500 opacity-70 mb-2" />
            <p className="opacity-40 text-[8px] uppercase font-bold mb-1">UV Index</p>
            <p className="text-xs sm:text-sm font-bold">Low</p>
          </div>
        </div>

        {isError && (
          <div className="mt-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-center text-sm font-medium">
            City not found. Please try again.
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;