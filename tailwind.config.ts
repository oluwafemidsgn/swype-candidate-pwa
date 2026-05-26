import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0f65ef',
        'ai-badge': '#d0e1fd',
        dark: '#0a0a0a',
        'dark-2': '#1a1a1a',
        'dark-3': '#2a2a2a',
        'border-dark': '#333333',
      },
      fontFamily: {
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'confetti-fall': {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15,101,239,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(15,101,239,0.8)' },
        },
      },
      animation: {
        'confetti-fall': 'confetti-fall 2s ease-in forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-up': 'slide-up 0.3s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
