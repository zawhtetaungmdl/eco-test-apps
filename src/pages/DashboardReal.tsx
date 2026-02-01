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
  // If AQI is 0, Cleanliness is 100%. If AQI is > 200, Cleanliness drops.
  const cleanliness = Math.max(0, Math.min(100, Math.round(100 - (aqi / 2))));

  // Dynamic Styles based on Status
  const getTheme = () => {
    if (status.status === 'Good') {
      return {
        text: 'text-forest dark:text-green-400',
        bg: 'bg-green-100 dark:bg-green-900/30',
        border: 'border-green-200 dark:border-green-800',
        fill: 'bg-forest',
        icon: 'eco',
        alertBg: 'bg-green-50 dark:bg-green-900/20',
        alertBorder: 'border-green-100 dark:border-green-800/30',
        alertText: 'text-forest dark:text-green-400',
        message: 'Air is clean. Enjoy your day!'
      };
    } else if (status.status === 'Moderate') {
      return {
        text: 'text-urgent dark:text-orange-400',
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        border: 'border-orange-200 dark:border-orange-800',
        fill: 'bg-urgent',
        icon: 'warning',
        alertBg: 'bg-orange-50 dark:bg-orange-900/20',
        alertBorder: 'border-orange-100 dark:border-orange-800/30',
        alertText: 'text-urgent dark:text-orange-400',
        message: 'Air quality is acceptable for most people.'
      };
    } else {
      return {
        text: 'text-danger dark:text-red-400',
        bg: 'bg-red-100 dark:bg-red-900/30',
        border: 'border-red-200 dark:border-red-800',
        fill: 'bg-danger',
        icon: 'error',
        alertBg: 'bg-red-50 dark:bg-red-900/20',
        alertBorder: 'border-red-100 dark:border-red-800/30',
        alertText: 'text-danger dark:text-red-400',
        message: 'Heavy pollutants detected. Air filtration recommended.'
      };
    }
  };

  const theme = getTheme();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111811] dark:text-white transition-colors duration-200 relative min-h-screen pb-24">

      {!location && (
        <LocationPermissionModal onEnable={handleAutoLocation} isLoading={loading} />
      )}

      <div className={`fixed inset-0 z-0 bg-red-600 pointer-events-none animate-bg-flash ${status.status === 'Good' ? 'opacity-0' : 'opacity-100'}`}></div>

      <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        <header className="flex items-center justify-center px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${status.status === 'Good' ? 'bg-forest' : 'bg-danger'} animate-pulse-fast`}></span>
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
               <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full"></div>
               <p className="text-sm font-medium text-gray-400">Fetching Air Quality...</p>
             </div>
          ) : (
            <>
              <div className="relative mb-8 flex size-28 items-center justify-center">
                <div className={`absolute inset-0 rounded-full ${status.status === 'Good' ? 'bg-green-600/50' : 'bg-red-600/50'} animate-ripple-sharp`}></div>
                <div className={`absolute inset-0 rounded-full ${status.status === 'Good' ? 'bg-green-600/40' : 'bg-red-600/40'} animate-ripple-sharp`} style={{ animationDelay: '200ms' }}></div>
                <div className={`absolute inset-0 rounded-full ${status.status === 'Good' ? 'bg-green-600/30' : 'bg-red-600/30'} animate-ripple-sharp`} style={{ animationDelay: '400ms' }}></div>
                <div className={`relative z-10 flex size-28 items-center justify-center rounded-full ${theme.bg} shadow-sm border ${theme.border} animate-pulse-fast`}>
                  <span className={`material-symbols-outlined ${status.status === 'Good' ? 'text-forest' : 'text-leaf-brown'} text-[54px] fill-1 rotate-12`}>eco</span>
                </div>
              </div>
              <div className="relative">
                <div className={`absolute inset-0 ${status.status === 'Good' ? 'bg-green-500/20' : 'bg-red-500/20'} blur-xl animate-pulse-fast rounded-full`}></div>
                <h1 className="text-4xl font-extrabold tracking-tight text-center mb-1 relative z-10">
                  {location ? location.name : 'Unknown Location'}
                </h1>
              </div>
              <div className={`flex items-center gap-1.5 opacity-80 ${theme.text}`}>
                <span className="material-symbols-outlined text-[18px]">{theme.icon}</span>
                <span className="text-sm font-medium">{status.status === 'Good' ? 'Air is Healthy' : 'Alert Active'}</span>
              </div>
            </>
          )}
        </section>

        <section className="px-6 w-full max-w-md mx-auto mb-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 shadow-xl border border-red-100 dark:border-red-900/30 relative overflow-hidden">
            <div className={`absolute inset-0 ${status.status === 'Good' ? 'bg-green-500/5' : 'bg-red-500/5'} animate-pulse`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</p>
                  <h2 className={`text-5xl font-extrabold mt-1 ${theme.text}`}>{loading ? '--' : aqi} <span className="text-xl font-bold text-gray-400 dark:text-gray-500">AQI</span></h2>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`inline-flex items-center rounded-full ${theme.bg} px-4 py-1.5 text-xs font-bold ${theme.text} border ${theme.border} animate-pulse`}>
                      {loading ? 'Analyzing...' : status.label}
                  </span>
                </div>
              </div>

              {/* Progress Bar (Real Mode) */}
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-medium">Air Cleanliness</p>
                  <p className={`text-sm font-bold ${theme.text}`}>{loading ? '--' : cleanliness}%</p>
                </div>
                <div className="h-5 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${theme.fill} transition-all duration-1000 ease-out`} style={{ width: `${cleanliness}%` }}></div>
                </div>
              </div>

              <p className={`text-sm ${status.status === 'Good' ? 'text-green-600/80 dark:text-green-400/80' : 'text-red-600/80 dark:text-red-400/80'} mt-4 text-center font-medium`}>
                  {loading ? 'Please wait...' : theme.message}
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1 flex flex-col justify-start px-6 pb-4 max-w-md mx-auto w-full">
          <div className={`mb-6 flex items-center justify-center gap-2 rounded-xl ${theme.alertBg} py-3 px-4 text-center border ${theme.alertBorder} animate-pulse-fast`}>
            <span className={`material-symbols-outlined ${theme.alertText} text-[22px]`}>{theme.icon}</span>
            <span className={`text-sm font-bold ${theme.alertText}`}>
              {loading ? 'Checking air quality...' : (status.status === 'Good' ? 'Air quality is good' : 'Air quality is poor')}
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
