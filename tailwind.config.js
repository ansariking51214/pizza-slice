/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: '#D62300',
            hover: '#B81D00',
            light: '#FFF1F0',
            dark: '#8C1600',
          },
          dark: {
            DEFAULT: '#121212',
            card: '#1C1C1C',
            muted: '#2A2A2A',
          },
          gold: {
            DEFAULT: '#FFB800',
            hover: '#E6A600',
            light: '#FFF8E6',
          },
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'food-sm': '0.5rem',
        'food': '1rem',
        'food-lg': '1.5rem',
        'food-xl': '2rem',
        'food-full': '9999px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(214, 35, 0, 0.18)',
        'modal': '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(214, 35, 0, 0.35)',
        'drawer': '-4px 0 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
