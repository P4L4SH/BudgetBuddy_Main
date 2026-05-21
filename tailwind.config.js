// Tailwind CSS config — adds custom fonts and true neutral grays
// Uses class-based dark mode

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Chakra Petch', 'sans-serif'],
        secondary: ['Montserrat', 'sans-serif'],
      },
      // Override gray palette to remove blue-ish tint — pure neutral grays
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#333333',
          800: '#252525',
          900: '#1c1c1c',
        }
      },
    },
  },
  plugins: [],
};
