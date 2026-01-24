/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purdue-gold': '#CEB888',
        'purdue-gold-dark': '#B8A169',
        'purdue-black': '#000000',
        'purdue-white': '#FFFFFF',
        'purdue-light-gray': '#F4F4F4',
        'purdue-gray': '#E2E8F0',
        'purdue-dark-text': '#2d3748',
      },
      fontFamily: {
        'sans': ['DM Sans', 'sans-serif'],
        'display': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 150ms ease-in-out',
        'slide-in': 'slide-in 200ms ease-out',
        'zoom-in': 'zoom-in 150ms ease-out',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '8px',
      },
    },
  },
  plugins: [],
}
