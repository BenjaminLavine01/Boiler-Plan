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
    },
  },
  plugins: [],
}
