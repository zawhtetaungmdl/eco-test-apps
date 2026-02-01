import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-sage to-mint dark:from-[#1a241a] dark:to-[#121812] font-display text-[#111811] dark:text-white transition-colors duration-200 relative overflow-hidden min-h-screen pb-24">
      <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        <header className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Profile</h1>
          <button className="flex size-10 items-center justify-center rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </header>

        <section className="flex flex-col items-center justify-center px-6 pt-8 pb-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 -m-4 rounded-full border border-forest/20 ripple-effect"></div>
            <div className="absolute inset-0 -m-4 rounded-full border border-forest/20 ripple-effect-delay"></div>
            <div className="relative size-32 rounded-full overflow-hidden border-4 border-white dark:border-surface-dark shadow-xl bg-orange-100 flex items-center justify-center">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANQ-Bn7UQvAkn2j0JDSZ4Wg9kYJx1nO-L85CKiQP6IJprIPasKFQwgbn-JSlQzf5aNo9d1bXqqnRfMHOi2xPdACvsXEkTV_xpoOCIDsLIL6ydU55YS8S3u78Rx6WjOHbRKBtEafVlcxpxsDkPGfVdGOKvqP1XKy1vJD7pNLEFhs5gHp_0R95QDYvatE6Vlq9o4SLYmLZfbu3f_a93wtD3lvdINta6Dp_xTP5mQ4bk5ArgT--OJVH3lvNygJRJ8kflVJ6Inkb9asyos"
              />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-forest text-white rounded-full border-[3px] border-white dark:border-surface-dark shadow-lg hover:bg-forest-hover transition-colors">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">Econex Team</h2>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm font-semibold bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/40 dark:border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-forest">location_on</span>
            Bangkok, Thailand
          </div>
        </section>

        <section className="px-6 w-full max-w-md mx-auto space-y-4">
          <button className="w-full group flex items-center justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-white/50 dark:border-white/5 hover:border-forest/30 transition-all duration-300 active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-100">Notifications</span>
            </div>
            <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">chevron_right</span>
          </button>

          <button className="w-full group flex items-center justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-white/50 dark:border-white/5 hover:border-forest/30 transition-all duration-300 active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-danger group-hover:bg-danger group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-100">Air Quality Alerts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">ON</span>
              <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">chevron_right</span>
            </div>
          </button>

          <div className="pt-8 pb-4">
            <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white py-4 px-6 rounded-2xl font-bold tracking-wide shadow-lg shadow-terracotta/20 transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined">logout</span>
              Log Out
            </button>
            <p className="text-center text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-6 uppercase tracking-widest">Version 2.4.0 (Build 182)</p>
          </div>
        </section>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
