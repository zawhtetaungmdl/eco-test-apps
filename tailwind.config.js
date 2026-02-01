/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dashboard (Red Theme)
        "primary": "#ef4444",
        "forest": "#3a6b3a",
        "forest-hover": "#2d522d",
        "danger": "#dc2626",
        "danger-glow": "#ef4444",
        "leaf-brown": "#9f3e3e",
        "urgent": "#f97316",
        "background-light": "#fef2f2",
        "background-dark": "#1a0f0f",
        "surface-light": "#ffffff",
        "surface-dark": "#2a1515",

        // Welcome (Sage Theme)
        "sage-primary": "#5D8C61", // Was primary
        "sage-secondary": "#D98E73", // Was secondary
        "eco-white": "#FDFCF8",
        "eco-surface": "#F2F0E9",
        "eco-text": "#2C3E2C",
        "eco-gray": "#8C968C",

        // Pairing (Leaf Theme)
        "leaf-primary": "#78b955", // Was primary
        "leaf-primary-dark": "#5a8c3e", // Was primary-dark
        "eco-bg": "#f0f7ed",

        // Find Device (Stone/Leaf)
        "stone-warm": "#1c1917",

        // Profile / Schedule
        "terracotta": "#e07a5f",
        "terracotta-hover": "#d0694e",
        "sage": "#e2ece2", // Was sage
        "mint": "#f0f9f0",
        "mint-pale": "#f2faf2",
        "sage-light": "#e8f3e8",
        "soft-green": "#f0fdfa",

        // Schedule specific
        "green-primary": "#4ade80", // Screen 6 primary
        "green-forest": "#166534", // Screen 6 forest (different hex)
        "green-sage": "#f0fdf4",
        "green-leaf": "#22c55e",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "display-dm": ["DM Sans", "sans-serif"], // For Screen 2
        "display-grotesk": ["Space Grotesk", "sans-serif"], // For Screen 3 & 8
        "body": ["Noto Sans", "sans-serif"], // For Screen 3 & 8
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2.5rem",
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple-sharp': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bg-flash': 'flash 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'button-glow': 'glow 1.5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        flash: {
            '0%, 100%': { opacity: '0' },
            '50%': { opacity: '0.15' },
        },
        glow: {
            '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(249, 115, 22, 0.6)' },
        },
        draw: {
            '0%': { strokeDasharray: '1000', strokeDashoffset: '1000' },
            '100%': { strokeDasharray: '1000', strokeDashoffset: '0' },
        }
      },
      backgroundImage: {
          'paper-pattern': "url('data:image/svg+xml,%3Csvg width=\\'64\\' height=\\'64\\' viewBox=\\'0 0 64 64\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M32 32c17.673 0 32 14.327 32 32 0-17.673-14.327-32-32-32C14.327 32 0 46.327 0 64c0-17.673 14.327-32 32-32zM0 32C0 14.327 14.327 0 32 0c-17.673 0-32 14.327-32 32z\\' fill=\\'%23a8a29e\\' fill-opacity=\\'0.04\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [
    // We can add the 'forms' and 'container-queries' plugins if we install them,
    // but standard utilities should cover most.
    // The prompt used CDN plugins, but standard utility classes often suffice or we can install them.
    // For now, I'll stick to core.
  ],
}
