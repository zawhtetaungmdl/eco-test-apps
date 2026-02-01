import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default function FindDevice() {
  const navigate = useNavigate();
  const [isFound, setIsFound] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    let model: cocoSsd.ObjectDetection | undefined;

    // Initialize TensorFlow Model
    const initModel = async () => {
      try {
        await tf.ready();
        model = await cocoSsd.load();
        setIsModelLoading(false);
      } catch (err) {
        console.error("Model loading failed:", err);
      }
    };

    // Camera Setup
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        // Ensure video element exists before assigning
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // IMPORTANT: Wait for metadata to load to ensure size is known
          videoRef.current.onloadedmetadata = () => {
             setHasCamera(true);
             if (model && !isFound) detectFrame(model);
          };
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError("Camera access denied. Using simulation.");
        // Fallback simulation if camera fails
        setTimeout(() => setIsFound(true), 5000);
      }
    };

    // Detection Loop
    const detectFrame = (loadedModel: cocoSsd.ObjectDetection) => {
      if (!videoRef.current || !canvasRef.current || !loadedModel) return;

      // Ensure video is ready
      if (videoRef.current.readyState >= 2) {
        // Match canvas to video size
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        loadedModel.detect(videoRef.current).then(predictions => {
          // Check for 'bottle' or 'cup'
          const foundTarget = predictions.find(p => (p.class === 'bottle' || p.class === 'cup') && p.score > 0.6);

          if (foundTarget) {
            setIsFound(true);
          } else {
             if (!isFound) {
                 requestRef.current = requestAnimationFrame(() => detectFrame(loadedModel));
             }
          }
        });
      } else {
         if (!isFound) {
             requestRef.current = requestAnimationFrame(() => detectFrame(loadedModel));
         }
      }
    };

    // Main Initialization Flow
    (async () => {
      await initModel();
      // Only start camera after model is ready or if we want to show feed while loading
      // It's better to start camera ASAP for UX, but we need model for detection.
      await startCamera();
    })();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFound]); // Add isFound dependency to stop loop if found

  return (
    <div className="bg-black text-white font-display-grotesk overflow-hidden h-screen w-full relative">
        {/* Camera Feed Background */}
        <div className="absolute inset-0 z-0 bg-stone-900">
            {/*
               Logic change: Always render the video tag if we don't have an error,
               so it can initialize. Hidden if not hasCamera yet?
               No, we need it mounted to set the ref.
            */}
            {!cameraError ? (
                <>
                  <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover opacity-90 ${hasCamera ? 'opacity-90' : 'opacity-0'}`}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                  />
                  {/* Show placeholder if camera not ready yet */}
                  {!hasCamera && (
                    <img
                        alt="Camera Loading"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc1ps-oFtBqjC__YynziTinchwkORlgp63vsxlntT42OlARp8lymPWNGtq5a0utx66ulcvAEYfL0AHJEyidfg2-CJa7Z40kkx_UUb6sNBJOQTiE4SQ9RYhR-nvY6lXBGdePxZdad6FIl-6Kb0oAhWd_D3Wm5YEdqdBQofhCVnZto7HXWluNZ4_BVUGAxMJn3TX7JJhabWL917mSb8Bn2TSgt3xsDKsR3sIH5HJeVGLnzhoaCiePMBV_aSyICGuzdDRao_d-eYypEOV"
                    />
                  )}
                </>
            ) : (
                <img
                    alt="Camera Feed Placeholder"
                    className="w-full h-full object-cover opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc1ps-oFtBqjC__YynziTinchwkORlgp63vsxlntT42OlARp8lymPWNGtq5a0utx66ulcvAEYfL0AHJEyidfg2-CJa7Z40kkx_UUb6sNBJOQTiE4SQ9RYhR-nvY6lXBGdePxZdad6FIl-6Kb0oAhWd_D3Wm5YEdqdBQofhCVnZto7HXWluNZ4_BVUGAxMJn3TX7JJhabWL917mSb8Bn2TSgt3xsDKsR3sIH5HJeVGLnzhoaCiePMBV_aSyICGuzdDRao_d-eYypEOV"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[#292524]/60 via-[#292524]/10 to-[#1c1917]/80 pointer-events-none"></div>

            {/* Scanning Line Animation (Visual Feedback for Real-time) */}
            {!isFound && hasCamera && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-leaf-primary shadow-[0_0_15px_#78b955] z-10 animate-[scan_3s_linear_infinite]">
                     <style>{`
                         @keyframes scan {
                             0% { top: 0%; }
                             50% { top: 100%; }
                             100% { top: 0%; }
                         }
                     `}</style>
                 </div>
            )}
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
                    {isFound ? 'Device Found' : (cameraError ? 'Simulation Mode' : (isModelLoading ? 'Initializing AI...' : 'Eco-Scan Live'))}
                </span>
            </div>
            {/* Empty div for layout balance */}
            <div className="w-10 h-10"></div>
        </div>

        {/* Found Device Indicator (Same as before) */}
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
