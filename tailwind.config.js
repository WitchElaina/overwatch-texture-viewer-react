/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'fg': ['system-ui', 'sans-serif'],
      },
      colors: {
        'texture-removed': 'rgba(164, 63, 75, 1)',
      },
      transitionDuration: {
        '125': '125ms',
      },
      minWidth: {
        '9': '36px',
      },
      maxWidth: {
        '96': '24rem',
      },
    },
  },
  plugins: [],
} 