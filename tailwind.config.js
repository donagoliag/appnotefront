/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      colors: {
        'glass-dark': 'rgba(0, 0, 0, 0.5)',
        'glass-border': 'rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'float': 'float 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}

