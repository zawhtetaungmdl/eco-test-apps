import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Stats() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-soft font-display text-[#111811] dark:text-white transition-colors duration-200 relative min-h-screen pb-24">
        {/* Background Pattern */}
        <div
            className="fixed inset-0 z-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        ></div>

        <div className="relative z-10 flex h-full min-h-screen w-full flex-col overflow-x-hidden">
            <header className="flex items-center justify-center px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-danger animate-pulse-fast"></span>
                    <p className="text-sm font-bold tracking-wide uppercase text-danger dark:text-red-400">EcoHome</p>
                </div>
            </header>

            <section className="flex flex-col px-6 pt-2 pb-6">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-1.5 opacity-60 text-gray-500 dark:text-gray-400 mb-1">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            <span className="text-xs font-bold tracking-wider uppercase">Location</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Bangkok</h1>
                    </div>
                    <div className="bg-black/5 dark:bg-white/10 p-1 rounded-lg flex items-center text-xs font-bold h-10">
                        <button className="h-full px-4 bg-white dark:bg-surface-dark shadow-sm rounded-md text-gray-900 dark:text-white transition-all">Daily</button>
                        <button
                            onClick={() => navigate('/stats-weekly')}
                            className="h-full px-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                            Weekly
                        </button>
                    </div>
                </div>

                {/* Graph Card */}
                <div className="w-full bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-red-50 dark:border-red-900/20 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average AQI</p>
                            <h2 className="text-3xl font-extrabold mt-1 text-gray-900 dark:text-white">142 <span className="text-sm font-bold text-danger ml-1">Poor</span></h2>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="material-symbols-outlined text-danger text-[28px]">trending_up</span>
                        </div>
                    </div>

                    <div className="relative h-48 w-full">
                        {/* Y-Axis Labels */}
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 font-medium">
                            <div className="border-b border-gray-100 dark:border-white/5 w-full h-0 pb-2">200</div>
                            <div className="border-b border-gray-100 dark:border-white/5 w-full h-0 pb-2">150</div>
                            <div className="border-b border-gray-100 dark:border-white/5 w-full h-0 pb-2">100</div>
                            <div className="border-b border-gray-100 dark:border-white/5 w-full h-0 pb-2">50</div>
                            <div className="border-b border-gray-100 dark:border-white/5 w-full h-0">0</div>
                        </div>

                        {/* SVG Graph */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444"></stop>
                                    <stop offset="50%" stopColor="#f97316"></stop>
                                    <stop offset="100%" stopColor="#22c55e"></stop>
                                </linearGradient>
                                <linearGradient id="fillGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0"></stop>
                                </linearGradient>
                                <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                                    <feGaussianBlur result="coloredBlur" stdDeviation="2"></feGaussianBlur>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"></feMergeNode>
                                        <feMergeNode in="SourceGraphic"></feMergeNode>
                                    </feMerge>
                                </filter>
                            </defs>
                            <path d="M0,80 C15,75 25,60 40,40 C55,20 70,30 85,25 C95,20 100,15 100,15 L100,100 L0,100 Z" fill="url(#fillGradient)"></path>
                            <path d="M0,80 C15,75 25,60 40,40 C55,20 70,30 85,25 C95,20 100,15 100,15" fill="none" filter="url(#glow)" stroke="url(#lineGradient)" strokeLinecap="round" strokeWidth="3"></path>
                            <circle cx="40" cy="40" fill="#fff" r="3" stroke="#f97316" strokeWidth="2"></circle>
                            <circle cx="85" cy="25" fill="#fff" r="3" stroke="#ef4444" strokeWidth="2"></circle>
                        </svg>
                    </div>

                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>Now</span>
                    </div>
                </div>
            </section>

            {/* Pollutant Breakdown */}
            <section className="px-6 pb-6 w-full max-w-md mx-auto flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-forest">analytics</span>
                    Pollutant Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {/* PM2.5 */}
                    <div className="flex flex-col justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-red-100 dark:border-red-900/20 group hover:border-red-200 transition-colors h-32">
                        <div className="flex justify-between items-start">
                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
                                <span className="material-symbols-outlined text-danger text-[24px]">blur_on</span>
                            </div>
                            <span className="text-[10px] font-bold bg-red-100 text-danger px-2 py-0.5 rounded-full">High</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">PM2.5</p>
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white">58 <span className="text-xs font-normal text-gray-400">µg/m³</span></p>
                        </div>
                    </div>
                    {/* PM10 */}
                    <div className="flex flex-col justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-orange-100 dark:border-orange-900/20 group hover:border-orange-200 transition-colors h-32">
                        <div className="flex justify-between items-start">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl group-hover:bg-orange-100 transition-colors">
                                <span className="material-symbols-outlined text-orange-500 text-[24px]">grain</span>
                            </div>
                            <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Mod</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">PM10</p>
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white">82 <span className="text-xs font-normal text-gray-400">µg/m³</span></p>
                        </div>
                    </div>
                    {/* CO2 */}
                    <div className="flex flex-col justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-green-100 dark:border-green-900/20 group hover:border-green-200 transition-colors h-32">
                        <div className="flex justify-between items-start">
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-xl group-hover:bg-green-100 transition-colors">
                                <span className="material-symbols-outlined text-forest text-[24px]">co2</span>
                            </div>
                            <span className="text-[10px] font-bold bg-green-100 text-forest px-2 py-0.5 rounded-full">Good</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">CO2</p>
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white">420 <span className="text-xs font-normal text-gray-400">ppm</span></p>
                        </div>
                    </div>
                    {/* NO2 */}
                    <div className="flex flex-col justify-between bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-green-100 dark:border-green-900/20 group hover:border-green-200 transition-colors h-32">
                        <div className="flex justify-between items-start">
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-xl group-hover:bg-green-100 transition-colors">
                                <span className="material-symbols-outlined text-forest text-[24px]">science</span>
                            </div>
                            <span className="text-[10px] font-bold bg-green-100 text-forest px-2 py-0.5 rounded-full">Good</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">NO2</p>
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white">12 <span className="text-xs font-normal text-gray-400">ppb</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <BottomNav active="stats" />
    </div>
  );
}
