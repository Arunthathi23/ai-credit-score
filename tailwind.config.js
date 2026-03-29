/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#04060a',
        surface: '#0c1220',
        card: '#131a2e',
        neon: '#39ff14',
        warn: '#ff4f6e'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
