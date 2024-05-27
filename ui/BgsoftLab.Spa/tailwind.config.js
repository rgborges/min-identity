/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:  "IBM Plex Sans, sans-serif" ,
      animation: {
        'fadeInWidth' : 'fadeInWidth 0.2s ease-in-out',
      },
      keyframes: {
        'fadeInWidth' : {
          '0%': { width: '25%' },
          '100%': { width: '50%' },
        }
      }
    },
  },
  plugins: [],
}

