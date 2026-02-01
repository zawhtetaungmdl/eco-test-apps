import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import type { TouchEvent } from 'react';

export default function Welcome() {
  const navigate = useNavigate();
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxDrag = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
        // Calculate max drag distance: container width - button width (80px)
        maxDrag.current = containerRef.current.clientWidth - 80;
    }
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left - 40; // Center offset

    // Clamp values
    const newX = Math.max(0, Math.min(offsetX, maxDrag.current));
    setDragX(newX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Threshold to unlock (e.g., 80%)
    if (dragX > maxDrag.current * 0.8) {
        // Success
        setDragX(maxDrag.current);
        setTimeout(() => {
            navigate('/find');
        }, 300);
    } else {
        // Reset
        setDragX(0);
    }
  };

  // Touch Handlers
  const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
        if (isDragging) handleDragEnd();
    };
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
        if (isDragging) handleDragMove(e.clientX);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, dragX]);

  return (
    <div className="bg-eco-surface font-display-dm antialiased overflow-hidden select-none text-eco-text h-screen w-full relative">
      <div className="relative h-full w-full flex flex-col justify-between bg-paper-pattern">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt="Natural landscape representing clean air and nature"
            className="h-[65%] w-full object-cover opacity-60 mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBScYR826JsOAkWOFDn7eonlt7YQxduElA71kBQ_KIujh7jlFBNM2XOcDRpQANTxdSXBll3tZzio8mZA7SVfYQM8qhVcxFVNLp8hE7r-ygFJN_UB0ZEGOFkIX54VQebzKHucrv-C1QJyHUCfQAWFQHBGdaaiqAF7i1QqfMDLeUOFW7RUPhgdtwqIcWPaDuLLtvgJMNFS_jh4jTRdz6GpkU4zWO1Ox4ix9uFoUkxKW1_dNWy32y3OkAsny6Bl96OjohgGIqPo3pPoxTr"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-eco-surface/40 via-eco-surface/20 to-eco-surface"></div>
        </div>

        {/* Header */}
        <header className="relative z-20 pt-16 px-6 flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-lg shadow-sage-primary/10 flex items-center justify-center rotate-3">
              <span className="material-symbols-outlined text-sage-primary text-4xl">eco</span>
            </div>
            <div className="absolute -z-10 top-2 -right-2 w-16 h-16 bg-sage-secondary/20 rounded-full blur-md"></div>
          </div>
          <h1 className="text-eco-text text-3xl md:text-4xl font-bold tracking-tight mb-2 drop-shadow-sm uppercase">
            ECONEX <span className="text-sage-primary">AIRPURIFIER</span>
          </h1>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/50 backdrop-blur-sm shadow-sm mt-2">
            <div className="w-2 h-2 rounded-full bg-sage-primary shadow-[0_0_5px_rgba(93,140,97,0.5)]"></div>
            <p className="text-eco-text/70 text-xs font-semibold tracking-wide uppercase">
              Air Quality: Excellent
            </p>
          </div>
        </header>

        {/* Center Graphic */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <div className="absolute inset-0 border border-sage-primary/10 organic-border animate-[spin_20s_linear_infinite] transition-all"></div>
            <div className="absolute inset-8 border border-sage-secondary/20 rounded-full border-dashed animate-[spin_15s_reverse_linear_infinite]"></div>
            <div className="absolute inset-16 bg-sage-primary/5 rounded-full blur-2xl"></div>
            <div className="glass-panel-light w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg relative z-10">
              <span className="material-symbols-outlined text-sage-secondary text-2xl mb-1">air</span>
              <span className="text-2xl font-bold text-eco-text">12</span>
              <span className="text-[10px] uppercase tracking-wider text-eco-gray font-medium">AQI Index</span>
            </div>
            <div className="absolute top-[10%] right-[10%] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-white">
              <div className="text-[10px] text-eco-gray uppercase tracking-wider">Humidity</div>
              <div className="text-sm font-semibold text-sage-primary">45%</div>
            </div>
            <div className="absolute bottom-[15%] left-[5%] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-white">
              <div className="text-[10px] text-eco-gray uppercase tracking-wider">Pollen</div>
              <div className="text-sm font-semibold text-sage-secondary">Low</div>
            </div>
          </div>
        </div>

        {/* Footer (Swipe Button) */}
        <footer className="relative z-20 pb-12 px-6 w-full max-w-md mx-auto">
          <div
            ref={containerRef}
            className="relative w-full group cursor-pointer select-none"
          >
            {/* Track */}
            <div className="glass-panel-light h-20 w-full rounded-[2rem] flex items-center px-2 relative overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12" style={{ opacity: 1 - (dragX / (maxDrag.current || 1)) }}>
                <p className="text-eco-text/50 text-sm font-medium tracking-widest uppercase">
                  Swipe to Start
                </p>
              </div>
              <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sage-primary/20 to-transparent pointer-events-none" style={{ width: `${dragX + 80}px` }}></div>
            </div>

            {/* Handle */}
            <div
                className="absolute top-2 left-2 h-16 w-20 rounded-[1.5rem] bg-sage-primary flex items-center justify-center shadow-[0_4px_15px_rgba(93,140,97,0.4)] z-30 cursor-grab active:cursor-grabbing transition-transform duration-75"
                style={{ transform: `translateX(${dragX}px)` }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onTouchMove={onTouchMove}
                onTouchEnd={handleDragEnd}
            >
                <span className="material-symbols-outlined text-white text-2xl">arrow_forward</span>
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-sage-primary/10 blur-xl rounded-full"></div>
          </div>

          <div className="mt-10 flex justify-center items-center gap-6 text-xs text-eco-gray font-medium">
            <span className="cursor-pointer hover:text-sage-primary transition-colors">Privacy Policy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sage-secondary/30"></span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
              Eco-Mode On
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
