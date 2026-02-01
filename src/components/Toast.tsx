import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'error' | 'success';
}

export default function Toast({ message, isVisible, onClose, type = 'error' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border animate-pulse-fast backdrop-blur-md transition-all duration-300 ${
      type === 'error'
        ? 'bg-red-50/90 border-red-200 text-red-600'
        : 'bg-green-50/90 border-green-200 text-green-600'
    }`}>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px]">
          {type === 'error' ? 'error' : 'check_circle'}
        </span>
        <span className="text-sm font-bold">{message}</span>
      </div>
    </div>
  );
}
