import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import Toast from '../components/Toast';

export default function Pairing() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [showToast, setShowToast] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleConnect = () => {
    const fullCode = code.join('');
    // For demo purposes, any 6-digit code or specific ones can work.
    // The design ref used 'A3....'.
    // Assuming '123456' is the "valid" demo code for now, or just let any 6 chars through?
    // Let's accept '123456' OR 'A3....' style if implemented, but strictly:
    if (fullCode === '123456') {
      navigate('/dashboard-real'); // Updated to go to Real Panel
    } else {
      setShowToast(true);
    }
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers (or alphanumeric if we follow design ref A3...)
    // Design Ref showed 'A', '3'. So let's allow alphanumeric.
    if (!/^[a-zA-Z0-9]*$/.test(value)) return;

    const newCode = [...code];
    // Handle single char input
    if (value.length <= 1) {
      newCode[index] = value.toUpperCase();
      setCode(newCode);
      if (value !== '' && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
    // Handle paste (if user pastes full code)
    else if (value.length > 1) {
        const pastedChars = value.split('').slice(0, 6);
        const updatedCode = [...code];
        pastedChars.forEach((char, i) => {
            if (index + i < 6) updatedCode[index + i] = char.toUpperCase();
        });
        setCode(updatedCode);
        const nextFocus = Math.min(index + pastedChars.length, 5);
        inputsRef.current[nextFocus]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="font-body text-stone-800 flex flex-col items-center px-6 min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f7ed 0%, #dcf1d6 100%)' }}>

        <Toast
            message="Wrong Setup Code (Try 123456)"
            isVisible={showToast}
            onClose={() => setShowToast(false)}
            type="error"
        />

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
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputsRef.current[index] = el }}
                        className="code-input w-full aspect-square text-center text-2xl font-bold rounded-xl border-stone-200 bg-white/60 shadow-sm transition-all focus:scale-105 uppercase"
                        maxLength={6} // Allow paste
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        placeholder="·"
                    />
                ))}
            </div>

            <button
                onClick={handleConnect}
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

        {/* Footer Link - Link back to scanning if they want */}
        <div className="pb-12 pt-4 z-10">
            <button
                onClick={() => navigate('/find')}
                className="flex items-center gap-2 text-stone-500 font-medium text-sm group"
            >
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
