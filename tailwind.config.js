/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./layout/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    fontFamily: {
      sans: ['iranSans', 'sans-serif'],
      serif: ['iranSans', 'serif'],
    },
    extend: {
      height: {
        'ft':"40vw"
      }
    },
  },
  plugins: [],
}
