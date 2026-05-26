/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      ink: '#0b1020', panel: '#11172b', accent: '#6366f1', accent2: '#22d3ee'
    }
  } },
  plugins: [],
}
