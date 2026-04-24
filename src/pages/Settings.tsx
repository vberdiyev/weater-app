import { Link } from "react-router-dom";
import { ChevronLeft, Thermometer, Clock, Info } from 'lucide-react';
import { useSettingsStore } from "../store/useSettingsStore";
import { useThemeStore } from "../store/useThemeStore";

function Settings() {
  const { units, setUnits, timeFormat, toggleTimeFormat } = useSettingsStore();
  const { isDay } = useThemeStore();

  return (
    <div className={`min-h-screen transition-colors duration-1000 p-5 ${
      isDay 
        ? "bg-gradient-to-br from-slate-100 via-blue-100 to-sky-200 text-blue-900/80" 
        : "bg-[#05080a] text-slate-200"
    }`}>
      <div className="max-w-xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <Link 
            to="/" 
            className={`p-3 rounded-2xl border transition-all ${
              isDay ? 'bg-white/50 border-white/60' : 'bg-white/5 border-white/10'
            }`}
          >
            <ChevronLeft size={22} />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>

        <div className="flex flex-col gap-4">
          <div className={`p-6 rounded-[2.5rem] border ${
            isDay ? "bg-white/40 border-white/60 backdrop-blur-xl" : "bg-white/[0.03] border-white/10 backdrop-blur-2xl"
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Thermometer size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold">Temperature Units</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Celsius or Fahrenheit</p>
              </div>
            </div>
            
            <div className="flex bg-black/5 p-1 rounded-2xl">
              <button 
                onClick={() => setUnits('metric')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  units === 'metric' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'opacity-40 hover:opacity-60'
                }`}
              >
                Celsius (°C)
              </button>
              <button 
                onClick={() => setUnits('imperial')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  units === 'imperial' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'opacity-40 hover:opacity-60'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-[2.5rem] border flex items-center justify-between ${
            isDay ? "bg-white/40 border-white/60 backdrop-blur-xl" : "bg-white/[0.03] border-white/10 backdrop-blur-2xl"
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Clock size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="font-bold">Time Format</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">{timeFormat} format enabled</p>
              </div>
            </div>
            <button 
              onClick={toggleTimeFormat}
              className={`px-6 py-2 rounded-xl text-xs font-black border transition-all active:scale-95 ${
                isDay ? 'border-blue-900/10 hover:bg-blue-900/5' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              SWITCH
            </button>
          </div>

          <div className={`p-6 rounded-[2.5rem] border flex items-center gap-4 opacity-60 ${
            isDay ? "bg-white/40 border-white/60 backdrop-blur-xl" : "bg-white/[0.03] border-white/10 backdrop-blur-2xl"
          }`}>
            <Info size={20} />
            <div>
              <p className="text-xs font-bold">Weather App v1.0</p>
              <p className="text-[9px] uppercase tracking-tighter">Powered by OpenWeather API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;