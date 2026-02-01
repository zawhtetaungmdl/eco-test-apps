import React from 'react';

interface LocationPermissionModalProps {
  onEnable: () => void;
  isLoading?: boolean;
}

export default function LocationPermissionModal({ onEnable, isLoading = false }: LocationPermissionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-sm transform overflow-hidden rounded-3xl bg-white dark:bg-[#2a1515] p-6 text-left shadow-2xl transition-all border border-white/20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
            <span className="material-symbols-outlined text-3xl text-danger dark:text-red-400">location_on</span>
          </div>

          <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white mb-2">
            Enable Location Access
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            To provide accurate air quality data for your area, EcoHome needs access to your device's location.
          </p>

          <button
            onClick={onEnable}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest hover:bg-forest-hover text-white py-3.5 px-4 text-sm font-bold shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
                Locating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">my_location</span>
                Use My Location
              </>
            )}
          </button>

          <p className="mt-4 text-[10px] text-gray-400">
            We prioritize your privacy. Location data is only used locally.
          </p>
        </div>
      </div>
    </div>
  );
}
