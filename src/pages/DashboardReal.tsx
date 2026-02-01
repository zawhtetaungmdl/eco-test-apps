import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useAirQuality, getStatus } from '../hooks/useAirQuality';
import LocationPermissionModal from '../components/LocationPermissionModal';

export default function DashboardReal() {
  const navigate = useNavigate();
  const [isPurifying, setIsPurifying] = useState(false);
  const { data, loading, location, handleAutoLocation } = useAirQuality();

  const aqi = data ? data.us_aqi : 0;
  const status = getStatus(aqi);

  // Cleanliness percentage estimation (inverse of AQI relative to 300)
  const cleanliness = Math.max(0, Math.min(100, Math.round(100 - (aqi / 2))));

  // Dynamic Styles based on Status Level
  const getTheme = () => {
    switch (status.colorName) {
      case 'green': // Good (0-50)
        return {
          text: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
          border: 'border-green-200 dark:border-green-800',
          fill: 'bg-green-500',
          icon: 'eco',
          alertBg: 'bg-green-50 dark:bg-green-900/20',
          alertBorder: 'border-green-100 dark:border-green-800/30',
          alertText: 'text-green-600 dark:text-green-400',
          ripple: 'bg-green-600',
          message: 'Air quality is satisfactory; poses little or no risk.',
          flashOpacity: 'opacity-0'
        };
      case 'yellow': // Moderate (51-100)
        return {
          text: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          border: 'border-yellow-200 dark:border-yellow-800',
          fill: 'bg-yellow-500',
          icon: 'warning',
          alertBg: 'bg-yellow-50 dark:bg-yellow-900/20',
          alertBorder: 'border-yellow-100 dark:border-yellow-800/30',
          alertText: 'text-yellow-600 dark:text-yellow-400',
          ripple: 'bg-yellow-500',
          message: 'Acceptable quality; sensitive people may experience symptoms.',
          flashOpacity: 'opacity-10'
        };
      case 'orange': // Unhealthy for Sensitive (101-150)
        return {
          text: 'text-orange-600 dark:text-orange-400',
          bg: 'bg-orange-100 dark:bg-orange-900/30',
          border: 'border-orange-200 dark:border-orange-800',
          fill: 'bg-orange-500',
          icon: 'masks',
          alertBg: 'bg-orange-50 dark:bg-orange-900/20',
          alertBorder: 'border-orange-100 dark:border-orange-800/30',
          alertText: 'text-orange-600 dark:text-orange-400',
          ripple: 'bg-orange-500',
          message: 'Sensitive groups may experience health effects. Wear a mask outdoors.',
          flashOpacity: 'opacity-30'
        };
      case 'red': // Unhealthy (151-200)
        return {
          text: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-800',
          fill: 'bg-red-500',
          icon: 'error',
          alertBg: 'bg-red-50 dark:bg-red-900/20',
          alertBorder: 'border-red-100 dark:border-red-800/30',
          alertText: 'text-red-600 dark:text-red-400',
          ripple: 'bg-red-600',
          message: 'Everyone may begin to experience health effects. Wear an N95 mask.',
          flashOpacity: 'opacity-60'
        };
      case 'purple': // Very Unhealthy (201-300)
        return {
          text: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          border: 'border-purple-200 dark:border-purple-800',
          fill: 'bg-purple-600',
          icon: 'dangerous',
          alertBg: 'bg-purple-50 dark:bg-purple-900/20',
          alertBorder: 'border-purple-100 dark:border-purple-800/30',
          alertText: 'text-purple-600 dark:text-purple-400',
          ripple: 'bg-purple-600',
          message: 'Health alert: Increased risk for everyone. Stay indoors.',
          flashOpacity: 'opacity-80'
        };
      case 'maroon': // Hazardous (301+)
        return {
          text: 'text-rose-900 dark:text-rose-400',
          bg: 'bg-rose-100 dark:bg-rose-900/30',
          border: 'border-rose-200 dark:border-rose-800',
          fill: 'bg-rose-900',
          icon: 'skull',
          alertBg: 'bg-rose-50 dark:bg-rose-900/20',
          alertBorder: 'border-rose-100 dark:border-rose-800/30',
          alertText: 'text-rose-900 dark:text-rose-400',
          ripple: 'bg-rose-900',
          message: 'Emergency conditions: Entire population likely affected. Stay indoors.',
          flashOpacity: 'opacity-100'
        };
      default:
        return {
          text: 'text-gray-600',
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          fill: 'bg-gray-500',
          icon: 'help',
          alertBg: 'bg-gray-50',
          alertBorder: 'border-gray-100',
          alertText: 'text-gray-600',
          ripple: 'bg-gray-500',
          message: 'No data available.',
          flashOpacity: 'opacity-0'
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111811] dark:text-white transition-colors duration-200 relative min-h-screen pb-24">

      {!location && (
        <LocationPermissionModal onEnable={handleAutoLocation} isLoading={loading} />
      )}

      {/* Background Flash Animation */}
      <div className={`fixed inset-0 z-0 pointer-events-none animate-bg-flash transition-colors duration-500 ${theme.ripple} ${theme.flashOpacity} mix-blend-multiply dark:mix-blend-overlay`}></div>

      <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        <header className="flex items-center justify-center px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${theme.fill} animate-pulse-fast`}></span>
            <p className={`text-sm font-bold tracking-wide uppercase ${theme.text}`}>EcoHome</p>
          </div>
        </header>

        {/* Toggle */}
        <div className="flex justify-center px-6 mt-2">
          <div className="inline-flex p-1 bg-gray-200/50 dark:bg-white/5 rounded-full border border-gray-300/30 dark:border-white/5 backdrop-blur-sm">
            <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-1.5 rounded-full text-xs font-bold transition-all text-gray-500 dark:text-gray-400"
            >
                DEMO
            </button>
            <button className="px-5 py-1.5 rounded-full text-xs font-bold transition-all bg-forest text-white shadow-sm">
                REAL
            </button>
          </div>
        </div>

        <section className="flex flex-col items-center justify-center px-6 pt-20 pb-12">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-40 gap-4">
               <div className={`animate-spin h-10 w-10 border-4 border-t-transparent rounded-full ${theme.text} border-current`}></div>
               <p className="text-sm font-medium text-gray-400">Fetching Air Quality...</p>
             </div>
          ) : (
            <>
              <div className="relative mb-8 flex size-28 items-center justify-center">
                {/* Ripple Effects with dynamic colors */}
                <div className={`absolute inset-0 rounded-full ${theme.ripple} opacity-50 animate-ripple-sharp`}></div>
                <div className={`absolute inset-0 rounded-full ${theme.ripple} opacity-40 animate-ripple-sharp`} style={{ animationDelay: '200ms' }}></div>
                <div className={`absolute inset-0 rounded-full ${theme.ripple} opacity-30 animate-ripple-sharp`} style={{ animationDelay: '400ms' }}></div>

                <div className={`relative z-10 flex size-28 items-center justify-center rounded-full ${theme.bg} shadow-sm border ${theme.border} animate-pulse-fast transition-colors duration-500`}>
                  <span className={`material-symbols-outlined ${theme.text} text-[54px] fill-1 rotate-12 transition-colors duration-500`}>eco</span>
                </div>
              </div>
              <div className="relative">
                 {/* Glow behind title */}
                <div className={`absolute inset-0 ${theme.fill} opacity-20 blur-xl animate-pulse-fast rounded-full`}></div>
                <h1 className="text-4xl font-extrabold tracking-tight text-center mb-1 relative z-10">
                  {location ? location.name : 'Unknown Location'}
                </h1>
              </div>
              <div className={`flex items-center gap-1.5 opacity-80 ${theme.text} transition-colors duration-500`}>
                <span className="material-symbols-outlined text-[18px]">{theme.icon}</span>
                <span className="text-sm font-medium">
                    {status.colorName === 'green' ? 'Air is Healthy' : 'Alert Active'}
                </span>
              </div>
            </>
          )}
        </section>

        <section className="px-6 w-full max-w-md mx-auto mb-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 shadow-xl border border-red-100 dark:border-red-900/30 relative overflow-hidden transition-colors duration-500">
             {/* Card Internal Glow */}
            <div className={`absolute inset-0 ${theme.fill} opacity-5 animate-pulse transition-colors duration-500`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</p>
                  <h2 className={`text-5xl font-extrabold mt-1 ${theme.text} transition-colors duration-500`}>{loading ? '--' : aqi} <span className="text-xl font-bold text-gray-400 dark:text-gray-500">AQI</span></h2>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`inline-flex items-center rounded-full ${theme.bg} px-4 py-1.5 text-xs font-bold ${theme.text} border ${theme.border} animate-pulse transition-colors duration-500 text-center`}>
                      {loading ? 'Analyzing...' : status.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar (Real Mode) */}
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-medium">Air Cleanliness</p>
                  <p className={`text-sm font-bold ${theme.text} transition-colors duration-500`}>{loading ? '--' : cleanliness}%</p>
                </div>
                <div className="h-5 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${theme.fill} transition-all duration-1000 ease-out`} style={{ width: `${cleanliness}%` }}></div>
                </div>
              </div>

              <p className={`text-sm ${theme.text} opacity-80 mt-4 text-center font-medium transition-colors duration-500`}>
                  {loading ? 'Please wait...' : theme.message}
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1 flex flex-col justify-start px-6 pb-4 max-w-md mx-auto w-full">
          <div className={`mb-6 flex items-center justify-center gap-2 rounded-xl ${theme.alertBg} py-3 px-4 text-center border ${theme.alertBorder} animate-pulse-fast transition-colors duration-500`}>
            <span className={`material-symbols-outlined ${theme.alertText} text-[22px]`}>{theme.icon}</span>
            <span className={`text-sm font-bold ${theme.alertText}`}>
              {loading ? 'Checking air quality...' : status.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
                onClick={() => setIsPurifying(!isPurifying)}
                className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl ${
                  isPurifying ? 'bg-forest hover:bg-forest-hover' : 'bg-urgent hover:bg-orange-700'
                } p-6 h-28 transition-all duration-200 animate-button-glow active:scale-95`}
            >
              <span className="material-symbols-outlined text-white text-[32px] animate-pulse">mode_fan</span>
              <span className="text-white text-base font-bold tracking-wide">
                  {isPurifying ? 'Purifying...' : 'Purify Now'}
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
                onClick={() => navigate('/schedule')}
                className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-forest dark:bg-forest/60 hover:bg-forest-hover dark:hover:bg-forest p-6 h-28 transition-all duration-200 shadow-md active:scale-95 grayscale opacity-90"
            >
              <span className="material-symbols-outlined text-white text-[32px]">schedule</span>
              <span className="text-white text-base font-bold tracking-wide">Schedule</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </section>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
