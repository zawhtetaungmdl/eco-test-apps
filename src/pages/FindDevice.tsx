import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function FindDevice() {
  const navigate = useNavigate();
  const [isFound, setIsFound] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Request Camera Access
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError("Camera access denied. Using simulation.");
      }
    }

    startCamera();

    // Cleanup stream on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Simulate finding device after 5 seconds
    const timer = setTimeout(() => {
      setIsFound(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white font-display-grotesk overflow-hidden h-screen w-full relative">
        {/* Camera Feed Background */}
        <div className="absolute inset-0 z-0 bg-stone-900">
            {hasCamera ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover opacity-90"
                />
            ) : (
                <img
                    alt="Camera Feed Placeholder"
                    className="w-full h-full object-cover opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc1ps-oFtBqjC__YynziTinchwkORlgp63vsxlntT42OlARp8lymPWNGtq5a0utx66ulcvAEYfL0AHJEyidfg2-CJa7Z40kkx_UUb6sNBJOQTiE4SQ9RYhR-nvY6lXBGdePxZdad6FIl-6Kb0oAhWd_D3Wm5YEdqdBQofhCVnZto7HXWluNZ4_BVUGAxMJn3TX7JJhabWL917mSb8Bn2TSgt3xsDKsR3sIH5HJeVGLnzhoaCiePMBV_aSyICGuzdDRao_d-eYypEOV"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[#292524]/60 via-[#292524]/10 to-[#1c1917]/80 pointer-events-none"></div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-14 pb-4">
            <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-md border border-white/10 active:bg-stone-900/60 transition-colors"
            >
                <span className="material-symbols-outlined text-white text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/40 backdrop-blur-md border border-white/10">
                <div className={`w-1.5 h-1.5 rounded-full ${isFound ? 'bg-leaf-primary' : 'bg-red-500'} animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]`}></div>
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                    {isFound ? 'Device Found' : (cameraError ? 'Simulation Mode' : 'Eco-Scan Live')}
                </span>
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-md border border-white/10 active:bg-stone-900/60 transition-colors">
                <span className="material-symbols-outlined text-white text-[20px]">help</span>
            </button>
        </div>

        {/* Center Scanner UI */}
        <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${isFound ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative flex items-center justify-center mb-12">
                <div className="w-72 h-72 rounded-full border border-leaf-primary/40 bg-leaf-primary/5 backdrop-blur-[2px] relative flex items-center justify-center shadow-[0_0_60px_rgba(120,185,85,0.25)]">
                    <div className="absolute inset-0 rounded-full border-t border-r border-leaf-primary/80 animate-spin opacity-80" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute inset-4 rounded-full border border-dashed border-leaf-primary/30"></div>
                    <div className="absolute inset-0 rounded-full bg-leaf-primary/5 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                    <div className="w-6 h-6 relative opacity-80">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-leaf-primary"></div>
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-leaf-primary"></div>
                    </div>
                </div>
                {/* Corner Markers */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border-t-[3px] border-l-[3px] border-white/70 rounded-tl-3xl drop-shadow-md"></div>
                <div className="absolute -top-8 -right-8 w-16 h-16 border-t-[3px] border-r-[3px] border-white/70 rounded-tr-3xl drop-shadow-md"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b-[3px] border-l-[3px] border-white/70 rounded-bl-3xl drop-shadow-md"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-[3px] border-r-[3px] border-white/70 rounded-br-3xl drop-shadow-md"></div>
            </div>

            <div className="text-center px-6 max-w-xs">
                <h2 className="text-2xl font-bold text-white drop-shadow-xl tracking-tight leading-tight">Find your Econex device</h2>
                <p className="text-white/80 text-sm mt-3 font-medium tracking-wide">Bring the device into the frame to connect</p>
                {cameraError && <p className="text-red-400 text-xs mt-2">{cameraError}</p>}
            </div>
        </div>

        {/* Found Device Indicator */}
        {isFound && (
             <div className="absolute z-10 top-[42%] left-[28%] pointer-events-auto cursor-pointer group animate-bounce">
                <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] z-20 border-2 border-leaf-primary"></div>
                    <div className="absolute w-20 h-20 bg-leaf-primary/30 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute top-4 left-4 w-8 h-8 border-l border-b border-white/40 -rotate-45"></div>

                    {/* Popover */}
                    <div className="absolute left-8 top-8 bg-[#fdfefc] backdrop-blur-xl border border-white/40 p-3 rounded-xl min-w-[160px] shadow-xl transform translate-y-2 opacity-100 transition-all duration-300 origin-top-left block">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-leaf-primary text-sm font-bold">eco</span>
                            <span className="text-leaf-primary text-[10px] font-bold uppercase tracking-widest">Eco Signal</span>
                        </div>
                        <p className="text-stone-800 text-base font-bold leading-tight">Econex Air Mini</p>
                        <div className="flex items-center gap-1 mt-2">
                            <div className="h-1 w-6 bg-leaf-primary rounded-full"></div>
                            <div className="h-1 w-6 bg-leaf-primary rounded-full"></div>
                            <div className="h-1 w-6 bg-stone-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/80 to-transparent pt-20 pb-8 px-5">
            <div className={`transition-all duration-700 transform ${isFound ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
                <div className="bg-[#fcfdfa] backdrop-blur-md border border-white/60 rounded-3xl p-4 flex items-center gap-4 mb-6 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-[#ecfccb] flex items-center justify-center text-leaf-primary-dark shrink-0">
                        <span className="material-symbols-outlined text-2xl">spa</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-stone-800 font-bold text-lg truncate font-display-grotesk">Econex Air Mini</p>
                        <p className="text-stone-500 text-xs font-medium flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-leaf-primary animate-pulse"></span>
                            Ready to pair
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-leaf-primary hover:bg-leaf-primary-dark text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-leaf-primary/20"
                    >
                        Connect
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => navigate('/pair')}
                    className="text-white/70 text-sm font-medium hover:text-white transition-colors flex items-center gap-2 drop-shadow-md"
                >
                    <span>Don't see your device?</span>
                    <span className="underline decoration-white/40 underline-offset-4">Pair manually</span>
                </button>
            </div>
            <div className="h-4"></div>
        </div>
    </div>
  );
}
