import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Daily AQI (Hourly)
const data = [
  { time: '12 AM', aqi: 45 },
  { time: '3 AM', aqi: 55 },
  { time: '6 AM', aqi: 120 },
  { time: '9 AM', aqi: 160 },
  { time: '12 PM', aqi: 140 },
  { time: '3 PM', aqi: 110 },
  { time: '6 PM', aqi: 85 },
  { time: '9 PM', aqi: 60 },
  { time: 'Now', aqi: 50 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-black/90 p-2 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-forest dark:text-green-400 font-semibold">
          AQI: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

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

                    <div className="h-48 w-full -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    hide
                                    domain={[0, 200]}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="aqi"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorAqi)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
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
