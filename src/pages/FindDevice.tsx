import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function FindDevice() {
  const navigate = useNavigate();
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
                <div className="w-1.5 h-1.5 rounded-full bg-leaf-primary animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                    {cameraError ? 'Simulation Mode' : 'Eco-Scan Live'}
                </span>
            </div>
            {/* Empty div to balance the flex layout since Help button is removed */}
            <div className="w-10 h-10"></div>
        </div>

        {/* Center Scanner UI - REMOVED */}

        {/* Found Device Indicator - REMOVED */}

        {/* Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/80 to-transparent pt-20 pb-8 px-5">
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
