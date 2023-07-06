/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'transparent': 'transparent',
      'custom-800': '#4E5788',
      'custom-700': '#22282F',
      'custom-600': '#536274',
      'custom-500': '#989DA0',
      'custom-400': '#82888D',
      'custom-bg': '#323A47',
      'white': '#FFFFFF',
      'custom-yellow': '#F0B11C',
      'custom-red': '#DA4649',
    },
  },
  plugins: [],
}
