/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',       /* Light Slate background */
        card: '#FFFFFF',     /* Pure White cards */
        ink: '#0F172A',       /* Dark Slate text */
        'ink-soft': '#475569',  /* Muted Slate text */
        'ink-muted': '#94A3B8', /* Border / Disabled text */
        brand: '#6366F1',     /* Indigo */
        'brand-hover': '#4F46E5',
        'brand-tint': '#EEF2FF',
        border: '#E2E8F0',     /* Thin gray borders */
        success: '#10B981',   /* Emerald */
        warning: '#F59E0B',   /* Amber */
        danger: '#EF4444',    /* Red */
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
