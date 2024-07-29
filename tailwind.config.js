/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'selector',
  theme: {
    extend: {
      colors:{
        'primary':'#854497',
        'primary-hover':'#663573',
        'primary-contrast':'white',
        'primary-focus':'#dcbee9'
      }
    },
  },
  plugins: [],
}

