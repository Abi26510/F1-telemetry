/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'f1-red': '#e10600',
        'f1-dark': '#0b0c10',
        'f1-surface': '#14161f',
        'f1-card': '#1a1d29',
        'f1-border': '#282c3f',
        'f1-purple': '#9d4edd',
        'f1-cyan': '#00f0ff',
        'f1-yellow': '#ffb703',
      }
    },
  },
  plugins: [],
}
