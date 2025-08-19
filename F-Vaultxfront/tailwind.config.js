/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//      darkMode: 'class',
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


module.exports = {
  darkMode: 'class', // enables toggling dark mode via 'class'
  content: ['./index.html', './src/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};