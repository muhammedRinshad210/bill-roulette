/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        bg: {
          primary: '#0B0B0F',
          secondary: '#121218',
          elevated: '#181820',
        },
        surface: {
          secondary: '#121218',
          elevated: '#181820',
          hover: '#1D1D27',
          active: '#242432',
        },
        accent: {
          primary: '#8B5CF6',
          soft: '#A78BFA',
          glow: 'rgba(139, 92, 246, 0.22)',
        },
        highlight: {
          gold: '#F5C76B',
          goldSoft: '#FBE2A7',
          goldGlow: 'rgba(245, 199, 107, 0.18)',
        },
        brand: {
          textPrimary: '#FAFAFA',
          textSecondary: '#A1A1AA',
          textMuted: '#71717A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 20px -3px rgba(139, 92, 246, 0.35)',
        'glow-gold': '0 0 20px -3px rgba(245, 199, 107, 0.28)',
        'card-elevated': '0 8px 30px -8px rgba(0, 0, 0, 0.75)',
        'card-hover': '0 12px 35px -8px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'bevel-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 2px 8px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
      },
    },
  },
  plugins: [],
}
