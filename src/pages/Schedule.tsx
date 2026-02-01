import { useNavigate } from 'react-router-dom';

export default function Schedule() {
  const navigate = useNavigate();

  return (
    <div
        className="font-display text-[#1a2e1a] transition-colors duration-200 min-h-screen relative pb-32"
        style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)' }}
    >
      <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-32">
        <header className="flex items-center justify-between px-6 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex size-10 items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-sm"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold tracking-tight">Bangkok</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-forest opacity-60">Schedule</p>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-[24px]">more_vert</span>
          </button>
        </header>

        <section className="px-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-4xl p-6 shadow-xl shadow-green-900/5 border border-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">New Event</h2>
              <div className="flex gap-2">
                <button className="size-8 rounded-full bg-green-forest text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </button>
              </div>
            </div>

            {/* Time Picker UI */}
            <div className="flex justify-center items-center gap-4 py-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-gray-300 text-sm font-medium mb-1">06</span>
                <span className="text-4xl font-extrabold text-green-forest">07</span>
                <span className="text-gray-300 text-sm font-medium mt-1">08</span>
              </div>
              <span className="text-4xl font-extrabold text-green-forest">:</span>
              <div className="flex flex-col items-center">
                <span className="text-gray-300 text-sm font-medium mb-1">29</span>
                <span className="text-4xl font-extrabold text-green-forest">30</span>
                <span className="text-gray-300 text-sm font-medium mt-1">31</span>
              </div>
              <div className="ml-4 flex flex-col gap-1">
                <button className="px-3 py-1 rounded-lg bg-green-forest text-white text-xs font-bold uppercase">AM</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-400 text-xs font-bold uppercase">PM</button>
              </div>
            </div>

            {/* Day Picker */}
            <div className="flex justify-between items-center px-1">
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-white border border-gray-100 shadow-sm text-gray-400">S</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-forest text-white shadow-md shadow-green-200">M</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-forest text-white shadow-md shadow-green-200">T</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-forest text-white shadow-md shadow-green-200">W</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-forest text-white shadow-md shadow-green-200">T</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-green-forest text-white shadow-md shadow-green-200">F</button>
              <button className="size-9 rounded-full flex items-center justify-center text-xs font-bold bg-white border border-gray-100 shadow-sm text-gray-400">S</button>
            </div>
          </div>
        </section>

        <section className="px-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-green-forest/70 uppercase tracking-widest">Active Schedules</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/50 flex items-center justify-between transition-all hover:bg-white/80">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-forest text-[24px]">wb_sunny</span>
                </div>
                <div>
                  <h4 className="font-bold text-base">Morning Refresh</h4>
                  <p className="text-xs text-green-forest/60 font-medium">07:00 AM • Weekdays</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-forest cursor-pointer">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/50 flex items-center justify-between transition-all hover:bg-white/80">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 text-[24px]">bedtime</span>
                </div>
                <div>
                  <h4 className="font-bold text-base">Sleep Mode</h4>
                  <p className="text-xs text-green-forest/60 font-medium">10:30 PM • Everyday</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-forest cursor-pointer">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/30 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-500 text-[24px]">home_work</span>
                </div>
                <div>
                  <h4 className="font-bold text-base">Work Hours</h4>
                  <p className="text-xs text-green-forest/60 font-medium">09:00 AM • Tue, Thu</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-pointer">
                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Nav: Using default styles from prompt which are gray, so active=undefined */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-white/70 backdrop-blur-xl border-t border-white/40 pb-safe pt-2">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-green-forest transition-colors">home</span>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-green-forest">Home</span>
          </button>
          <button
            onClick={() => navigate('/stats')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group text-gray-400 hover:text-green-forest transition-colors"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-[10px] font-bold">Stats</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group text-gray-400 hover:text-green-forest transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-bold">Setting</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
