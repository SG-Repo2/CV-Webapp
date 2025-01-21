/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sea-green': '#20B2AA',
        'light-red': '#FF6B6B',
        'purple': '#9B59B6',
        'white': '#FFFFFF',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};