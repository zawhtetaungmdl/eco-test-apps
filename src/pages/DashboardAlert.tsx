import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function DashboardAlert() {
  const navigate = useNavigate();
  const [cleanliness, setCleanliness] = useState(35);
  const [isPurifying, setIsPurifying] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111811] dark:text-white transition-colors duration-200 relative min-h-screen pb-24">
      <div className="fixed inset-0 z-0 bg-red-600 pointer-events-none animate-bg-flash"></div>

      <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4">
          <button className="flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-danger animate-pulse-fast"></span>
            <p className="text-sm font-bold tracking-wide uppercase text-danger dark:text-red-400">EcoHome</p>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </header>

        {/* Toggle */}
        <div className="flex justify-center px-6 mt-2">
          <div className="inline-flex p-1 bg-gray-200/50 dark:bg-white/10 rounded-full border border-gray-300/30 dark:border-white/5 backdrop-blur-sm">
            <button className="px-5 py-1.5 rounded-full text-xs font-bold transition-all bg-white dark:bg-red-900/40 text-danger dark:text-red-300 shadow-sm">
                DEMO
            </button>
            <button
                onClick={() => navigate('/dashboard-real')}
                className="px-5 py-1.5 rounded-full text-xs font-bold transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700"
            >
                REAL
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 pt-16 pb-12">
          <div className="relative mb-8 flex size-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-red-600/50 animate-ripple-sharp"></div>
            <div className="absolute inset-0 rounded-full bg-red-600/40 animate-ripple-sharp" style={{ animationDelay: '200ms' }}></div>
            <div className="absolute inset-0 rounded-full bg-red-600/30 animate-ripple-sharp" style={{ animationDelay: '400ms' }}></div>
            <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 shadow-sm border border-red-200 dark:border-red-800 animate-pulse-fast">
              <span className="material-symbols-outlined text-leaf-brown text-[54px] fill-1 rotate-12">eco</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse-fast rounded-full"></div>
            <h1 className="text-4xl font-extrabold tracking-tight text-center mb-1 relative z-10">Bangkok</h1>
          </div>
          <div className="flex items-center gap-1.5 opacity-80 text-red-700 dark:text-red-300">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            <span className="text-sm font-medium">Alert Active</span>
          </div>
        </section>

        {/* Card Section */}
        <section className="px-6 w-full max-w-md mx-auto mb-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 shadow-xl border border-red-100 dark:border-red-900/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</p>
                  <h2 className="text-5xl font-extrabold mt-1 text-danger">160 <span className="text-xl font-bold text-gray-400 dark:text-gray-500">AQI</span></h2>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/40 px-4 py-1.5 text-xs font-bold text-danger dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse">
                      Unhealthy
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex justify-between items-end mb-1">
                  <p className="text-sm font-medium">Air Cleanliness</p>
                  <p className="text-sm font-bold text-danger">{cleanliness}%</p>
                </div>
                <div className="relative w-full h-8 flex items-center">
                  <div className="absolute w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                  <div className="absolute h-1.5 bg-danger rounded-l-full pointer-events-none" style={{ width: `${cleanliness}%` }}></div>
                  <input
                    className="absolute w-full h-1.5 bg-transparent appearance-none slider-ios cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={cleanliness}
                    onChange={(e) => setCleanliness(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between items-center px-0.5 mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Min</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max</span>
                </div>
              </div>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-4 text-center font-medium">
                  Heavy pollutants detected. Air filtration recommended.
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex-1 flex flex-col justify-start px-6 pb-4 max-w-md mx-auto w-full">
          <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 py-3 px-4 text-center border border-red-100 dark:border-red-800/30 animate-pulse-fast">
            <span className="material-symbols-outlined text-danger text-[22px]">error</span>
            <span className="text-sm font-bold text-danger dark:text-red-400">Air quality is poor</span>
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
