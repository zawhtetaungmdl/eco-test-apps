import { useNavigate } from 'react-router-dom';

export default function Pairing() {
  const navigate = useNavigate();

  return (
    <div className="font-body text-stone-800 flex flex-col items-center px-6 min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f7ed 0%, #dcf1d6 100%)' }}>
        {/* Navigation Header */}
        <div className="w-full flex items-center justify-between pt-14 pb-12 z-10">
            <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-stone-200 active:scale-95 transition-transform"
            >
                <span className="material-symbols-outlined text-stone-600">arrow_back_ios_new</span>
            </button>
            <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full max-w-sm flex flex-col items-center z-10">
            <div className="mb-8 w-20 h-20 bg-leaf-primary/10 rounded-3xl flex items-center justify-center text-leaf-primary">
                <span className="material-symbols-outlined text-4xl">key</span>
            </div>
            <h1 className="text-3xl font-display-grotesk font-bold text-stone-800 text-center mb-4">Enter Setup Code</h1>
            <p className="text-stone-500 text-center mb-10 leading-relaxed px-4">
                Enter the 6-digit setup code found on the back of your device or in the manual.
            </p>

            {/* Code Inputs */}
            <div className="grid grid-cols-6 gap-2 w-full mb-10">
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} type="text" defaultValue="A"/>
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} type="text" defaultValue="3"/>
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} placeholder="·" type="text"/>
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} placeholder="·" type="text"/>
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} placeholder="·" type="text"/>
                <input className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all" maxLength={1} placeholder="·" type="text"/>
            </div>

            <button
                onClick={() => navigate('/find')}
                className="w-full bg-leaf-primary hover:bg-leaf-primary-dark text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-leaf-primary/20 transition-all active:scale-[0.98]"
            >
                Connect
            </button>

            <div className="mt-8">
                <button className="flex items-center gap-2 text-leaf-primary font-medium text-sm">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Where is the code?
                </button>
            </div>
        </div>

        {/* Footer Link */}
        <div className="pb-12 pt-4 z-10">
            <button className="flex items-center gap-2 text-stone-500 font-medium text-sm group">
                <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
                <span className="underline decoration-stone-300 underline-offset-4 group-hover:text-leaf-primary transition-colors">Scan QR code</span>
            </button>
        </div>

        {/* Background Graphic */}
        <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none z-0">
            <span className="material-symbols-outlined text-[200px]">spa</span>
        </div>
    </div>
  );
}
