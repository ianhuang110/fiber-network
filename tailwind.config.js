/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shrek: {
          50: '#f2fdf9',
          100: '#e1faf1',
          200: '#c5f3e2',
          300: '#9ae7ce',
          400: '#64d3b4',
          500: '#3fb897',
          600: '#2b9376',
          700: '#267661',
          800: '#225d4e',
          900: '#1e4d42',
          950: '#0e2b26',
        }
      }
    },
  },
  plugins: [],
}
